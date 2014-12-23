var Drawable = (function(){

  var drawable = function()
  {
    this.geometry = null;
    this.material = null;
    this.mesh = null;
    this.shaders = null;
    this.elapsed = 0;
    this.uniforms = {};
    this.options = {};
  };

  drawable.prototype.init = function(geometry, shaders)
  {
    if(!(geometry instanceof imv.Geometry.Geometry))
    {
      throw 'Geometry must inherit from base';
    }
    if(!(shaders instanceof imv.ShaderSet))
    {
      throw 'Shaders must inherit from base';
    }
    var params = {
      transparent: false
    };
    this.options = setParams(params, this.options);
    this.geometry = geometry;
    this.shaders = shaders;

    var materialParams = {
      uniforms: this.uniforms,
      attributes: geometry.attributes,
      vertexShader: shaders.vertex,
      fragmentShader: shaders.fragment,
      transparent: this.options.transparent,
      side: THREE.DoubleSide,
      depthWrite: !this.options.transparent
    };
    this.material = new THREE.RawShaderMaterial(materialParams);

    this.mesh = new THREE.Mesh(geometry.geometry, this.material);
    this.mesh.frustumCulled = false;
    this.mesh.updateMatrix();
    this.mesh.matrixAutoUpdate = false;
    this.id = null;

    return this;
  };

  drawable.prototype.updateView = function() {
    // this most basic is usually a u_modelViewProject update:
    console.warn('Nothing to udpate');
  };

  drawable.prototype.updateTime = function(time) {
    this.elapsed += time;
  };

  drawable.prototype.updateUniformF = function(name, value) {
    this.uniforms[name].value = value;
  };

  drawable.prototype.updateUniformV = function(name, value) {
    this.uniforms[name].value.copy(value);
  };

  drawable.prototype.updateUniformM = function(name, value) {
    this.uniforms[name].value.copy(value);
  };

  return drawable;
}());

imv.Drawable = Drawable;