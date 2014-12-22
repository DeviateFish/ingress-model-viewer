var ObjectDrawable = (function() {

  var objectDrawable = function() {
    Drawable.call(this);
    this.uniforms.u_modelViewProject = {
      type: "m4",
      value: new THREE.Matrix4()
    };
    this.projectView = new THREE.Matrix4();
  };
  inherits(objectDrawable, Drawable);

  objectDrawable.prototype.updateView = function(camera) {
    // this most basic is usually a u_modelViewProject update:
    this.projectView.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
    this.uniforms.u_modelViewProject.multiplyMatrices(projectView, this.mesh.matrixWorld);
    this.material.needsUpdate = true;
  };

  objectDrawable.prototype.updateTime = function(time) {
    this.tick = time;
  };

  return objectDrawable;
}());

imv.ObjectDrawable = ObjectDrawable;