import GLBound from './gl-bound';
import AssetLoader from './asset-loader';
import FileMesh from './mesh/file';
import Texture from './texture';
import Program from './program';
import GlowrampProgram from './program/glowramp';
import OpaqueProgram from './program/opaque';

var _programs = {
  'Glowramp': GlowrampProgram,
  'Opaque': OpaqueProgram
};

function areLoading(n, e) {
  if(e === 0) {
    n++;
  }
  return n;
}

function areLoaded(n, e) {
  if(e > 0) {
    n++;
  }
  return n;
}

function areError(n, e) {
  if(e < 0) {
    n++;
  }
  return n;
}

function summarize(queue) {
  return {
    total: queue.length,
    loading: queue.reduce(areLoading, 0),
    loaded: queue.reduce(areLoaded, 0),
    error: queue.reduce(areError, 0)
  };
}

function simpleMerge(left, right) {
  left = left || {};
  for(var i in right) {
    left[i] = right[i];
  }
  return left;
}

function mergeManifests(base, add) {
  var keys = ['texture', 'mesh', 'program', 'rawProgram'];
  keys.forEach(function(key) {
    if (key in add) {
      base[key] = simpleMerge(base[key], add[key]);
    }
  });
  return base;
}

class AssetManager extends GLBound {
  constructor(gl, manifest) {
    super(gl);
    this.manifest = manifest;
    this.loader = new AssetLoader();
    this.textures = {};
    this.meshes = {};
    this.programs = {};
    this.queues = {
      texture: [],
      mesh: [],
      program: []
    };
    this.stats = {
      texture: {},
      mesh: {},
      program: {},
      rawProgram: {}
    };
    this.complete = null;
    this.path = '/assets/';
  }

  _isComplete() {
    var status = this.getStatus();
    if(this.complete && status.texture.loading === 0 &&
       status.mesh.loading === 0 && status.program.loading === 0)
    {
      this.complete();
    }
  }

  addAssets(manifest) {
    this.manifest = mergeManifests(this.manifest, manifest);
  }

  addTexture(name, texture) {
    this.textures[name] = texture;
  }

  addMesh(name, mesh) {
    this.meshes[name] = mesh;
  }

  addProgram(name, program) {
    this.programs[name] = program;
  }

  handleTexture(idx, name, info, err, value) {
    if(err)
    {
      this.queues.texture[idx] = -1;
      console.error(err);
      throw 'Could not load ' + name;
    }

    this.addTexture(name, new Texture(this._gl, info, value));
    this.queues.texture[idx] = 1;
    this._isComplete();
  }

  handleMesh(idx, name, info, err, value) {
    if(err)
    {
      this.queues.mesh[idx] = -1;
      console.error(err);
      throw 'Could not load ' + name;
    }

    this.addMesh(name, new FileMesh(this._gl, value));
    this.queues.mesh[idx] = 1;
    this._isComplete();
  }

  createProgram(name, info) {
    var Klass = Program;
    if(info.program in _programs)
    {
      Klass = _programs[info.program];
    }
    this.addProgram(name, new Klass(this._gl, info.vertex, info.fragment));
  }

  handleProgram(idx, name, info, err, vals) {
    if(err)
    {
      this.queues.program[idx] = -1;
      console.error(err);
      throw 'Could not load ' + name;
    }

    var Klass = Program;
    if(info.program in _programs)
    {
      Klass = _programs[info.program];
    }
    this.addProgram(name, new Klass(this._gl, vals[0], vals[1]));
    this.queues.program[idx] = 1;
    console.info('loaded program ' + name);
    this._isComplete();
  }

  getTexture(name) {
    var texture = this.textures[name];
    if(texture) {
      this.stats.texture[name] = (this.stats.texture[name] || 0) + 1;
    }
    return texture;
  }

  getMesh(name) {
    var mesh = this.meshes[name];
    if(mesh) {
      this.stats.mesh[name] = (this.stats.mesh[name] || 0) + 1;
    }
    return mesh;
  }

  getProgram(name) {
    var prog = this.programs[name];
    if(prog) {
      if(this.stats.rawProgram.hasOwnProperty(name)) {
        this.stats.rawProgram[name]++;
      }
      else {
        this.stats.program[name] = (this.stats.program[name] || 0) + 1;
      }
    }
    return prog;
  }

  loadAll(callback) {
    var i, asset, manifest = this.manifest;
    this.complete = callback;
    for(i in manifest.texture) {
      if(manifest.texture.hasOwnProperty(i) && !(i in this.textures))
      {
        this.textures[i] = null;
        asset = manifest.texture[i];
        this.loader.loadAsset(
          (!asset.static ? this.path : '') + asset.path,
          'image',
          this.handleTexture.bind(this, this.queues.texture.length, i, asset)
        );
        this.queues.texture.push(0);
      }
    }
    for(i in manifest.mesh) {
      if(manifest.mesh.hasOwnProperty(i) && !(i in this.meshes))
      {
        this.meshes[i] = null;
        asset = manifest.mesh[i];
        this.loader.loadAsset(
          (!asset.static ? this.path : '') + asset.path,
          'arraybuffer',
          this.handleMesh.bind(this, this.queues.mesh.length, i, asset)
        );
        this.queues.mesh.push(0);
      }
    }
    for(i in manifest.program) {
      if(manifest.program.hasOwnProperty(i) && !(i in this.programs))
      {
        this.programs[i] = null;
        asset = manifest.program[i];
        this.loader.loadAssetGroup(
          [(!asset.static ? this.path : '') + asset.vertex, (!asset.static ? this.path : '') + asset.fragment],
          ['text', 'text'],
          this.handleProgram.bind(this, this.queues.program.length, i, asset)
        );
        this.queues.program.push(0);
      }
    }
    for(i in manifest.rawProgram) {
      if(manifest.rawProgram.hasOwnProperty(i) && !(i in this.programs)) {
        this.stats.rawProgram[i] = 0;
        this.createProgram(i, manifest.rawProgram[i]);
      }
    }

    return this.getStatus.bind(this);
  }

  getStatus() {
    return {
      texture: summarize(this.queues.texture),
      mesh: summarize(this.queues.mesh),
      program: summarize(this.queues.program)
    };
  }

  generateManifest() {
    var manifest = {}, keys = ['texture', 'mesh', 'rawProgram', 'program'];
    keys.forEach(function(section) {
      manifest[section] = {};
      for(var i in this.stats[section]) {
        if(this.stats[section].hasOwnProperty(i) && this.stats[section][i] > 0) {
          manifest[section][i] = this.manifest[section][i];
        }
      }
    }.bind(this));
    return manifest;
  }
}

export default AssetManager;
