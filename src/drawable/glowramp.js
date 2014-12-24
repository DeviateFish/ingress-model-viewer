var GlowrampDrawable = (function(){

  // default base color: neutral portal color
  var defaultBaseColor = new THREE.Vector4().copy(imv.Constants.teamColors.NEUTRAL);

  var glowrampDrawable = function(texture, baseColor, rotation, rampTarget, alpha) {
    TexturedDrawable.call(this, texture);
    this.uniforms.u_baseColor = {
      type: "v4",
      value: baseColor || defaultBaseColor.clone()
    };
    this.uniforms.u_rotation = {
      type: "f",
      value: rotation || 0
    };
    this.uniforms.u_rampTarget = {
      type: "f",
      value: rampTarget || 0
    };
    this.uniforms.u_alpha = {
      type: "f",
      value: alpha || 0.6
    };
    this.options.transparent = true;
  };
  inherits(glowrampDrawable, TexturedDrawable);

  glowrampDrawable.prototype.setBaseColor = function(color) {
    this.updateUniformV('u_baseColor', color);
  };

  glowrampDrawable.prototype.setAlpha = function(alpha) {
    this.updateuniformF('u_alpha', alpha);
  };

  glowrampDrawable.prototype.updateTime = function(tick) {
    Drawable.prototype.updateTime.call(this, tick);
    var inc = this.elapsed / 5000;
    this.updateUniformF('u_rotation', inc);
    this.updateUniformF('u_rampTarget', Math.sin(Math.PI / 2 * (inc - Math.floor(inc))));
    this.updateUniformF('u_alpha', Math.sin(inc) * 0.05 + 0.75);
  };

  return glowrampDrawable;
}());

imv.Drawables = imv.Drawables || {};
imv.Drawables.Glowramp = GlowrampDrawable;