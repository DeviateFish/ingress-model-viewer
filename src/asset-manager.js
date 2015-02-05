var AssetManager = (function() {

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
    this.path = '/assets/';
  };
  inherits(assetManager, GLBound);

  assetManager.prototype.handleTexture = function(idx, name, info, err, value) {
    if(err)
    {
      this.queues.texture[idx] = -1;
      console.error(err);
      throw 'Could not load ' + name;
    }

    this.textures[name] = new Texture(this._gl, info, value);
    this.queues.texture[idx] = 1;
    console.info('loaded texture ' + name);
  };

  assetManager.prototype.handleMesh = function(idx, name, info, err, value) {
    if(err)
    {
      this.queues.mesh[idx] = -1;
      console.error(err);
      throw 'Could not load ' + name;
    }

    this.meshes[name] = new FileMesh(this._gl, value);
    this.queues.mesh[idx] = 1;
    console.info('loaded mesh ' + name);
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
    this.programs[name] = new klass(this._gl, vals[0], vals[1]);
    this.queues.program[idx] = 1;
    console.info('loaded program ' + name);
  };

  assetManager.prototype.getTexture = function(name) {
    return this.textures[name];
  };

  assetManager.prototype.getMesh = function(name) {
    return this.meshes[name];
  };

  assetManager.prototype.getProgram = function(name) {
    return this.programs[name];
  };

  assetManager.prototype.loadAll = function() {
    var i, asset, manifest = this.manifest;
    for(i in manifest.texture)
    {
      if(manifest.texture.hasOwnProperty(i) && !(i in this.textures))
      {
        this.textures[i] = null;
        asset = manifest.texture[i];
        this.loader.loadAsset(
          this.path + asset.path,
          'image',
          this.handleTexture.bind(this, this.queues.texture.length, i, asset)
        );
        this.queues.texture.push(0);
      }
    }
    for(i in manifest.mesh)
    {
      if(manifest.mesh.hasOwnProperty(i) && !(i in this.meshes))
      {
        this.meshes[i] = null;
        asset = manifest.mesh[i];
        this.loader.loadAsset(
          this.path + asset.path,
          'arraybuffer',
          this.handleMesh.bind(this, this.queues.mesh.length, i, asset)
        );
        this.queues.mesh.push(0);
      }
    }
    for(i in manifest.program)
    {
      if(manifest.program.hasOwnProperty(i) && !(i in this.programs))
      {
        this.programs[i] = null;
        asset = manifest.program[i];
        this.loader.loadAssetGroup(
          [this.path + asset.vertex, this.path + asset.fragment],
          ['text', 'text'],
          this.handleProgram.bind(this, this.queues.program.length, i, asset)
        );
        this.queues.program.push(0);
      }
    }

    return this.getStatus.bind(this);
  };

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

  assetManager.prototype.getStatus = function() {
    return {
      textures: summarize(this.queues.texture),
      meshes: summarize(this.queues.meshes),
      programs: summarize(this.queues.programs)
    };
  };

  return assetManager;
}());

imv.AssetManager = AssetManager;