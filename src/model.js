var Model = (function(){

  var model = function(geometry, texture, shaders)
  {
    this.geometry = geometry;
    this.texture = texture;
    this.texture.needsUpdate = true;
    this.shaders = shaders;
    this.uniforms = {};
    this.uniforms.u_texture = { type: "t", value: this.texture };

    var params = {
      uniforms: this.uniforms,
      attributes: this.geometry.attributes,
      vertexShader: this.shaders.vertex,
      fragmentShader: this.shaders.fragment,
      transparent: this.geometry.transparent,
      side: THREE.DoubleSide,
      depthWrite: !this.geometry.transparent
    };
    this.material = new THREE.RawShaderMaterial(params);

    this.mesh = new THREE.Mesh(this.geometry.geometry, this.material);
    this.mesh.frustumCulled = false;
    this.mesh.updateMatrix();
    this.mesh.matrixAutoUpdate = false;
    this.id = null;
  };

  model.prototype.setUniform = function(name, newUniform)
  {
    if((name in this.material.uniforms) && newUniform.type != this.material.uniforms[name].type)
    {
      console.warn('uniform type mismatch');
      return false;
    }
    this.uniforms[name] = newUniform;
    this.material.needsUpdate = true;
    return this;
  };

  model.prototype.clone = function()
  {
    var uniforms = copyUniforms(this.uniforms, {u_texture: 1, u_modelViewProject: 1});
    return new model(this.geometry, this.texture, this.shaders, uniforms, this.options);
  };

  return model;
}());

imv.Model = Model;