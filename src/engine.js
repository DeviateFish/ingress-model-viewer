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
    assetsBase: '/assets/'
  };
  this.options = setParams(params, options, true);

  var projectView = new THREE.Matrix4();
  var cameraFwd = new THREE.Vector3();
  var uniforms = {
    'u_color0': { type: "v4", value: new THREE.Vector4() },
    'u_color1': { type: "v4", value: new THREE.Vector4(0xeb / 256, 0xb3 / 256, 0xe4 / 256, 1.0) },
    'u_rotation': { type: "f", value: 0.0 },
    'u_rampTarget': { type: "f", value: 0.5 },
    'u_alpha': { type: "f", value: 0.60 },
    'u_baseColor': { type: "v4", value: new THREE.Vector4().copy(constants.teamColors.RESISTANCE) },
    'u_altColor': { type: "v4", value: new THREE.Vector4(0.6, 0.4, 0.6, 0.8) },
    'u_teamColor': { type: "v4", value: new THREE.Vector4(0xeb / 256, 0xb3 / 256, 0xe4 / 256, 1.0) },
    'u_elapsedTime': { type: "f", value: 0.0 },
    'u_color': { type: "v4", value: new THREE.Vector4().copy(constants.teamColors.RESISTANCE) },
    'u_rampTargetInvWidth': { type: "v2", value: new THREE.Vector2(0.5, 1.5) },
    'u_contributionsAndAlpha': { type: "v3", value: new THREE.Vector3(0.5, 0.5, 0.5) },
    'u_modelViewProject': { type: "m4", value: projectView },
    'u_cameraFwd': { type: "v3", value: cameraFwd },
    'u_modelToTexScale': { type: "v2", value: new THREE.Vector2(0.00666666667, 0.00666666667) },
    'u_modelToTexOrigin': { type: "v2", value: new THREE.Vector2(0, 0) },
    'u_texCoordOffset0': { type: "v2", value: new THREE.Vector2(0, 0) },
    'u_texCoordOffset1': { type: "v2", value: new THREE.Vector2(0, 0) },
    'u_texture': { type: "t", value: null }
  };

  this.getUniform = function(name)
  {
    return uniforms[name];
  };

  this.setUniform = function(name, value)
  {
    if(name in uniforms)
    {
      uniforms[name].value = value;
    }
    return this;
  };

  this.replaceGlobalUniform = function(name, uniform)
  {
    if(name in uniforms && uniforms[name].type == uniform.type)
    {
      uniforms[name] = uniform;
    }
    this.updateModels();
    return this;
  };

  var models = {};
  this.updateModels = function()
  {
    for(var i in models)
    {
      if(models.hasOwnProperty(i))
      {
        models[i].material.needsUpdate = true;
      }
    }
  };

  var id = 0;
  this.ensureDefaultUniforms = function(model)
  {
    var uniformsList = model.shaders.getUniformsList();
    for(var i = 0; i < uniformsList.length; i++)
    {
      var k = uniformsList[i];
      if(uniforms.hasOwnProperty(k))
      {
        if(!model.uniforms.hasOwnProperty(k))
        {
          model.setUniform(k, uniforms[k]);
        }
      }
      else
      {
        console.log('unknown uniform: ' + k);
      }
    }
  };

  this.addModel = function(model, soft)
  {
    if(!(model instanceof Model))
    {
      throw 'Object must be of type Model';
    }
    if(!model.id)
    {
      var n = id++;
      models[n] = model;
      model.id = n;
      model.setUniform('u_modelViewProject', { type: "m4", value: new THREE.Matrix4() });
      this.ensureDefaultUniforms(model);
    }
    else
    {
      models[model.id] = model;
    }
    if(!soft)
    {
      this.scene.add(model.mesh);
    }
  };

  this.removeModel = function(model)
  {
    var i = model.id;
    if(i in models)
    {
      this.scene.remove(models[i].mesh);
      delete models[i];
    }
    return this;
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
    for(var i in models)
    {
      if(models.hasOwnProperty(i))
      {
        this.scene.remove(models[i].mesh);
      }
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

  var tick = 0, _this = this;
  var _periodics = [];
  this.getTick = function() { return tick; };

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

  var updateViewUniforms = function(camera)
  {
    projectView.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
    cameraFwd.set(0, 0, -1).applyQuaternion(camera.quaternion);
    var i;
    for(i in models)
    {
      if(models.hasOwnProperty(i))
      {
        if('u_modelViewProject' in models[i].uniforms)
        {
          models[i].uniforms.u_modelViewProject.value.copy(projectView);
          models[i].uniforms.u_modelViewProject.value.multiply(models[i].mesh.matrixWorld);
          models[i].material.needsUpdate = true;
        }/*
        if('u_cameraFwd' in models[i].uniforms)
        {
          models[i].uniforms.u_cameraFwd.value.copy(cameraFwd);
          models[i].material.needsUpdate = true;
        }*/
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
    if(_ovr)
    {
      _effect.render(_this.scene, _this.camera);
    }
    else
    {
      updateViewUniforms(_this.camera);
      _this.renderer.render(_this.scene, _this.camera);
    }
    var l = _periodics.length;
    for(var i = 0; i < l; i++)
    {
      _periodics[i](tick);
    }
    tick++;
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