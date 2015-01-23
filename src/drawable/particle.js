var ParticleDrawable = (function(){

  var particleDrawable = function(texture) {
    TexturedDrawable.call(this, texture);
    this.uniforms.u_cameraPos = {
      type: "v3",
      value: new THREE.Vector3()
    };
    this.options.transparent = true;
  };
  inherits(particleDrawable, TexturedDrawable);

  particleDrawable.prototype.updateView = function(camera) {
    this.projectView.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
    this.updateUniformV('u_cameraPos', camera.position);
    this.updateUniformM('u_modelViewProject', this.projectView);
    /*var camVec = this.mesh.position.clone().sub(camera.position);
    camVec.y = 0;
    camVec.normalize();
    var angle = Math.atan2(camVec.z, camVec.x);
    var quat = new THREE.Quaternion();
    quat.setFromAxisAngle(new THREE.Vector3(0, 1, 0), angle);
    this.mesh.quaternion.copy(quat);
    this.updateModel();*/
    //ModelDrawable.prototype.updateView.call(this, camera);
  };

  /*particleDrawable.prototype.updateModel = function() {
    // do nothing, since we don't want to use the model's internal matrix
  };*/

  return particleDrawable;
}());

imv.Drawables = imv.Drawables || {};
imv.Drawables.Particle = ParticleDrawable;