var LinkDrawable = (function(){

  // no defaults here.

  var linkDrawable = function(texture) {
    TexturedDrawable.call(this, texture);
    this.uniforms.u_cameraFwd = {
      type: "v3",
      value: new THREE.Vector3(0, 0, -1)
    };
    this.uniforms.u_elapsedTime = {
      type: "f",
      value: 0
    };
    this.options.transparent = true;
  };
  inherits(linkDrawable, TexturedDrawable);

  linkDrawable.prototype.updateView = function(camera) {
    var fwd = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
    this.updateUniformV('u_cameraFwd', fwd);
    ModelDrawable.prototype.updateView.call(this, camera);
  };

  linkDrawable.prototype.updateTime = function(tick) {
    Drawable.prototype.updateTime.call(this, tick);
    this.updateUniformF('u_elapsedTime', ((this.elapsed / 1000) % 300.0) * 0.1);
  };

  return linkDrawable;
}());

imv.Drawables = imv.Drawables || {};
imv.Drawables.Link = LinkDrawable;