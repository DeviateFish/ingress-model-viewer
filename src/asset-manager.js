var AssetManager = (function() {

  var areLoading = function(n, e) {
    if(e === 0) {
      n++;
    }
    return n;
  };

  var areLoaded = function(n, e) {
    if(e > 0) {
      n++;
    }
    return n;
  };

  var areError = function(n, e) {
    if(e < 0) {
      n++;
    }
    return n;
  };

  var summarize = function(queue) {
    return {
      total: queue.length,
      loading: queue.reduce(areLoading, 0),
      loaded: queue.reduce(areLoaded, 0),
      error: queue.reduce(areError, 0)
    };
  };

  var simpleMerge = function(left, right) {
    left = left || {};
    for(var i in right) {
      left[i] = right[i];
    }
    return left;
  };

  var mergeManifests = function(base, add) {
    var keys = ['texture', 'mesh', 'program', 'rawProgram'];
    keys.forEach(function(key) {
      if (key in add) {
        base[key] = simpleMerge(base[key], add[key]);
      }
    });
    return base;
  };

  var assetManager = function(gl, manifest) {
    GLBound.call(this, gl);
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
  };
  inherits(assetManager, GLBound);

  var _isComplete = function() {
    var status = this.getStatus();
    if(this.complete && status.texture.loading === 0 &&
       status.mesh.loading === 0 && status.program.loading === 0)
    {
      this.complete();
    }
  };

  assetManager.prototype.addAssets = function(manifest) {
    this.manifest = mergeManifests(this.manifest, manifest);
  };

  assetManager.prototype.addTexture = function(name, texture) {
    this.textures[name] = texture;
  };

  assetManager.prototype.addMesh = function(name, mesh) {
    this.meshes[name] = mesh;
  };

  assetManager.prototype.addProgram = function(name, program) {
    this.programs[name] = program;
  };

  assetManager.prototype.handleTexture = function(idx, name, info, err, value) {
    if(err)
    {
      this.queues.texture[idx] = -1;
      console.error(err);
      throw 'Could not load ' + name;
    }

    this.addTexture(name, new Texture(this._gl, info, value));
    this.queues.texture[idx] = 1;
    console.info('loaded texture ' + name);
    _isComplete.call(this);
  };

  assetManager.prototype.handleMesh = function(idx, name, info, err, value) {
    if(err)
    {
      this.queues.mesh[idx] = -1;
      console.error(err);
      throw 'Could not load ' + name;
    }

    this.addMesh(name, new FileMesh(this._gl, value));
    this.queues.mesh[idx] = 1;
    console.info('loaded mesh ' + name);
    _isComplete.call(this);
  };

  assetManager.prototype.createProgram = function(name, info) {
    var klass = Program;
    if(info.program in imv.Programs)
    {
      klass = imv.Programs[info.program];
    }
    this.addProgram(name, new klass(this._gl, info.vertex, info.fragment));
    console.log('created program ' + name);
  };

  assetManager.prototype.handleProgram = function(idx, name, info, err, vals) {
    if(err)
    {
      this.queues.program[idx] = -1;
      console.error(err);
      throw 'Could not load ' + name;
    }

    var klass = Program;
    if(info.program in imv.Programs)
    {
      klass = imv.Programs[info.program];
    }
    this.addProgram(name, new klass(this._gl, vals[0], vals[1]));
    this.queues.program[idx] = 1;
    console.info('loaded program ' + name);
    _isComplete.call(this);
  };

  assetManager.prototype.getTexture = function(name) {
    var texture = this.textures[name];
    if(texture) {
      this.stats.texture[name] = (this.stats.texture[name] || 0) + 1;
    }
    return texture;
  };

  assetManager.prototype.getMesh = function(name) {
    var mesh = this.meshes[name];
    if(mesh) {
      this.stats.mesh[name] = (this.stats.mesh[name] || 0) + 1;
    }
    return mesh;
  };

  assetManager.prototype.getProgram = function(name) {
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
  };

  assetManager.prototype.loadAll = function(callback) {
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
  };

  assetManager.prototype.getStatus = function() {
    return {
      texture: summarize(this.queues.texture),
      mesh: summarize(this.queues.mesh),
      program: summarize(this.queues.program)
    };
  };

  assetManager.prototype.generateManifest = function() {
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
  };

  return assetManager;
}());

imv.AssetManager = AssetManager;
