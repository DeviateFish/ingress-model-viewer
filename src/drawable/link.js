var LinkDrawable = (function(){

  // no defaults here.

  var linkDrawable = function(programName, meshName, textureName) {
    TexturedDrawable.call(this, programName, meshName, textureName);
    this.uniforms.u_cameraFwd = vec3.fromValues([0, 0, -1]);
    this.uniforms.u_elapsedTime = 0;
  };
  inherits(linkDrawable, TexturedDrawable);

  // TODO: needs a camera class:
  linkDrawable.prototype.updateView = function(camera) {
    var fwd = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
    this.uniforms.u_cameraFwd = camera;
    ModelDrawable.prototype.updateView.call(this, camera);
  };

  linkDrawable.prototype.updateTime = function(tick) {
    var ret = ModelDrawable.prototype.updateTime.call(this, tick);
    this.uniforms.u_elapsedTime = ((this.elapsed / 1000) % 300.0) * 0.1;
    return ret;
  };

  return linkDrawable;
}());

imv.Drawables = imv.Drawables || {};
imv.Drawables.Link = LinkDrawable;