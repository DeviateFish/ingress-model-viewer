var ModelDrawable = (function() {

  var modelDrawable = function() {
    Drawable.call(this);
    this.uniforms.u_modelViewProject = {
      type: "m4",
      value: new THREE.Matrix4()
    };
    this.projectView = new THREE.Matrix4();
  };
  inherits(modelDrawable, Drawable);

  modelDrawable.prototype.updateView = function(camera) {
    // this most basic is usually a u_modelViewProject update:
    this.projectView.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
    this.updateModel();
  };

  // signals that the model's mesh has been updated in some way...
  // means we need to recalculate the u_modelViewProject uniform
  modelDrawable.prototype.updateModel = function() {
    this.mesh.updateMatrix();
    this.mesh.updateMatrixWorld();
    var modelViewProject = this.projectView.clone().multiply(this.mesh.matrixWorld);
    this.updateUniformM('u_modelViewProject', modelViewProject);
  };

  return modelDrawable;
}());

imv.Drawables = imv.Drawables || {};
imv.Drawables.Model = ModelDrawable;