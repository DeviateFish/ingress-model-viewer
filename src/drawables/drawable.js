var Drawable = (function(){

  var drawable = function()
  {
    this.geometry = null;
    this.material = null;
    this.mesh = null;
    this.shaders = null;
    this.uniforms = {};
    this.options = {};
  };

  drawable.prototype.init = function(geometry, shaders, options)
  {
    if(!(geometry instanceof imv.Geometry))
    {
      throw 'Geometry must inherit from base';
    }
    if(!(shaders instanceof imv.ShaderSet))
    {
      throw 'Shaders must inherit from base';
    }
    var params = {
      transparent: true
    };
    options = options || {};
    this.options = setParams(params, options);
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
    this.material = new THREE.RawShaderMaterial(params);

    this.mesh = new THREE.Mesh(geometry.geometry, this.material);
    this.mesh.frustumCulled = false;
    this.mesh.updateMatrix();
    this.mesh.matrixAutoUpdate = false;
    this.id = null;

    return this;
  };

  return drawable;
}());

imv.Drawable = Drawable;