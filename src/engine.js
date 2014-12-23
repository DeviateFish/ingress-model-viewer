var Engine = function(canvas, options)
{
  options = options || {};
  var params = {
    cameraOptions: {
      fov: 75,
      aspect: 1.0,
      near: 0.01,
      far: 50
    },
    shaderPrecision: 'mediump',
    premultipliedAlpha: true,
    alpha: false,
    preserveDrawingBuffer: false,
  };
  this.options = setParams(params, options, true);

  var created = Date.now();
  var models = {};
  var id = 0;
  this.addDrawable = function(model, soft)
  {
    if(!(model instanceof Drawable))
    {
      throw 'Object must be of type Drawable';
    }
    if(!model.id)
    {
      var n = id++;
      models[n] = model;
      model.id = n;
    }
    else
    {
      models[model.id] = model;
    }
    model.updateView(this.camera);
    if(!soft)
    {
      this.scene.add(model.mesh);
    }
  };

  this.removeDrawable = function(model)
  {
    if(!(model instanceof Drawable))
    {
      return false;
    }
    var i = model.id;
    if(i in models)
    {
      this.scene.remove(models[i].mesh);
      delete models[i];
    }
    return true;
  };

  this.addEntity = function(entity, soft)
  {
    if(!(entity instanceof Entity))
    {
      throw 'Must pass an instance of IMV.Entity';
    }
    for(var i = 0; i < entity.models.length; i++)
    {
      this.addDrawable(entity.models[i], soft);
    }
  };

  this.removeEntity = function(entity)
  {
    if(!(entity instanceof Entity))
    {
      return false;
    }
    var t = true;
    for(var i = 0; i < entity.models.length; i++)
    {
      t = this.removeDrawable(entity.models[i]) && t;
    }
    return t;
  };

  this.hideModel = function(model)
  {
    var i = model.id;
    if(i in models)
    {
      this.scene.remove(models[i].mesh);
    }
    return this;
  };

  this.showModel = function(model)
  {
    var i = model.id;
    if(i in models)
    {
      this.scene.add(models[i].mesh);
    }
    return this;
  };

  this.clearScene = function()
  {
    var keys = Object.keys(models);
    for(var i = 0; i < keys.length; i++)
    {
      this.scene.remove(models[keys[i]].mesh);
      delete models[keys[i]];
    }
    return this;
  };

  this.scene = new THREE.Scene();
  this.camera = new THREE.PerspectiveCamera(
    this.options.cameraOptions.fov,
    this.options.cameraOptions.aspect,
    this.options.cameraOptions.near,
    this.options.cameraOptions.far
  );
  this.renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    precision: this.options.shaderPrecision,
    premultipliedAlpha: this.options.premultipliedAlpha,
    alpha: this.options.alpha,
    preserveDrawingBuffer: this.options.preserveDrawingBuffer,
    antialias: true
  });
  //this.renderer.sortObjects = false;

  var _this = this;
  var _periodics = [];
  this.getElapsed = function() { return Date.now() - created; };

  this.registerPeriodic = function(fn)
  {
    _periodics.push(fn);
    return this;
  };

  this.unregisterPeriodic = function(fn)
  {
    for(var i = 0; i < _periodics.length; i++)
    {
      if(_periodics[i] === fn)
      {
        _periodics.splice(i, 1);
      }
    }
    return this;
  };

  var lastTick = created;
  var updatePeriodics = function()
  {
    var i;
    var n = Date.now(), d = n - lastTick;
    lastTick = n;
    for(i in models)
    {
      if(models.hasOwnProperty(i) && models[i] instanceof Drawable)
      {
        models[i].updateTime(d);
      }
    }
    var l = _periodics.length;
    for(i = 0; i < l; i++)
    {
      _periodics[i](d);
    }
  };

  var updateViewUniforms = function(camera)
  {
    var i;
    for(i in models)
    {
      if(models.hasOwnProperty(i))
      {
        if(models[i] instanceof Drawable)
        {
          models[i].updateView(camera);
        }
      }
    }
  };

  var _ovr = false;
  var _effect = null;
  this.enableOVR = function() {
    if(!_effect)
    {
      _effect = new THREE.OculusRiftEffect(this.renderer);
      _effect.preLeftRender = updateViewUniforms;
      _effect.preRightRender = updateViewUniforms;
    }
    _ovr = true;
  };

  var width, height;
  var updateViewport = function()
  {
    _this.camera.aspect = width / height;
    _this.camera.updateProjectionMatrix();
    updateViewUniforms(_this.camera);
    _this.renderer.setSize(width, height);
    if(_effect)
    {
      _effect.setSize(width, height);
    }
  };

  this.updateViewport = function(w, h)
  {
    width = w;
    height = h;
    updateViewport();
  };

  this.disableOVR = function() {
    _ovr = false;
    updateViewport();
  };

  var suspended = false;
  var cleared = false;
  var render = function() {
    if(suspended)
    {
        cleared = true;
        return;
    }
    // update the default worldview.
    window.requestAnimationFrame(render);
    updatePeriodics();
    if(_ovr)
    {
      _effect.render(_this.scene, _this.camera);
    }
    else
    {
      if(_this.camera.matrixWorldNeedsUpdate)
      {
        updateViewUniforms(_this.camera);
      }
      _this.renderer.render(_this.scene, _this.camera);
    }
  };

  this.suspend = function()
  {
    if(!suspended)
    {
      suspended = true;
      cleared = false;
    }
  };

  this.resume = function()
  {
    suspended = false;
    if(cleared)
    {
      cleared = false;
      render();
    }
  };

  render();

  return this;
};

imv.Engine = Engine;