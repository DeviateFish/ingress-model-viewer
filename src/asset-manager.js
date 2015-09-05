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

/**
 * Utility function to get some info on loading states.
 * @param  {Array} queue  List of status codes, one per request
 * @return {Object}       Short summary of the state of the queue.
 */
function summarize(queue) {
  return {
    total: queue.length,
    loading: queue.reduce(areLoading, 0),
    loaded: queue.reduce(areLoaded, 0),
    error: queue.reduce(areError, 0)
  };
}

/**
 * An AssetManager manages all the various types of assets that need to be bound to
 * to a gl context.  It uses an AssetLoader to handle the loading and caching of the
 * asset sources, and also maintains a parallel cache of the bound resources.
 */
class AssetManager extends GLBound {

  /**
   * Constructs an asset loader.
   * @param  {context} gl      A 3d context from a canvas
   * @param  {Object} manifest A mapping of key:value pairs for the following types:
   *                           texture, mesh, program, rawProgram
   */
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

  /**
   * Merges in another manifest to the existing asset manifest
   *
   * Additional manifests should be merged in before loading.
   * @param {Object} manifest @see constructor
   */
  addAssets(manifest) {
    this.manifest = mergeManifests(this.manifest, manifest);
  }

  /**
   * Adds a bound texture to the texture cache, under a given internal name
   * @param {String} name     Texture internal name
   * @param {Texture} texture A bound Texture
   */
  addTexture(name, texture) {
    this.textures[name] = texture;
  }

  /**
   * Adds a bound mesh to the mesh cache, under a given internal name
   * @param {String} name Mesh internal name
   * @param {Mesh} mesh   A bound mesh
   */
  addMesh(name, mesh) {
    this.meshes[name] = mesh;
  }

  /**
   * Adds a bound program to the program cache, under a given internal name
   * @param {String} name     Program internal name
   * @param {Program} program A bound Program
   */
  addProgram(name, program) {
    this.programs[name] = program;
  }

  /**
   * Gets a bound texture directly from the cache.
   * @param  {String} name Texture internal name
   * @return {Texture}     The bound texture, or undefined if it does not
   *                       exist or is not yet loaded.
   */
  getTexture(name) {
    var texture = this.textures[name];
    if(texture) {
      this.stats.texture[name] = (this.stats.texture[name] || 0) + 1;
    }
    return texture;
  }

  /**
   * Gets a bound mesh directly from the cache.
   * @param  {String} name Mesh internal name
   * @return {Mesh}        The bound mesh, or undefined if it does not
   *                       exist or is not yet loaded.
   */
  getMesh(name) {
    var mesh = this.meshes[name];
    if(mesh) {
      this.stats.mesh[name] = (this.stats.mesh[name] || 0) + 1;
    }
    return mesh;
  }

  /**
   * Gets a bound program directly from the cache.
   * @param  {String} name Program internal name
   * @return {Program}     The bound program, or undefined if it does not
   *                       exist or is not yet loaded.
   */
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

  /**
   * Loads all remote resources found in the manifest, and creates any static programs
   * included in the manifest's rawPrograms section, if it exists.
   * @param  {Function} callback Callback invoked upon completion
   * @return {Function}          Returns a function that can be called to get information
   *                             on loading status. @see getStatus
   */
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
          this._handleTexture.bind(this, this.queues.texture.length, i, asset)
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
          this._handleMesh.bind(this, this.queues.mesh.length, i, asset)
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
          this._handleProgram.bind(this, this.queues.program.length, i, asset)
        );
        this.queues.program.push(0);
      }
    }
    for(i in manifest.rawProgram) {
      if(manifest.rawProgram.hasOwnProperty(i) && !(i in this.programs)) {
        this.stats.rawProgram[i] = 0;
        this._createProgram(i, manifest.rawProgram[i]);
      }
    }

    return this.getStatus.bind(this);
  }

  /**
   * Returns a small summary of all the loader queues for all assets.
   * @return {Object} A summary of each queue. @see summarize
   */
  getStatus() {
    return {
      texture: summarize(this.queues.texture),
      mesh: summarize(this.queues.mesh),
      program: summarize(this.queues.program)
    };
  }

  /**
   * Generates a compact manifest containing only the resources that have been
   * actually be fetched from the cache, after loading.  Useful to reduce loading
   * time for scenes that only use a few resources.
   * @return {Object} A manifest containing only the resources that were actually used
   *                  after loading.
   */
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

  _isComplete() {
    var status = this.getStatus();
    if(this.complete && status.texture.loading === 0 &&
       status.mesh.loading === 0 && status.program.loading === 0)
    {
      this.complete();
    }
  }

  _handleTexture(idx, name, info, err, value) {
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

  _handleMesh(idx, name, info, err, value) {
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

  _createProgram(name, info) {
    var Klass = Program;
    if(info.program in _programs)
    {
      Klass = _programs[info.program];
    }
    this.addProgram(name, new Klass(this._gl, info.vertex, info.fragment));
  }

  _handleProgram(idx, name, info, err, vals) {
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
    this._isComplete();
  }
}

export default AssetManager;
