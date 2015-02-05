var GlowrampDrawable = (function(){

  // default base color: neutral portal color
  var defaultBaseColor = vec4.clone(imv.Constants.teamColors.NEUTRAL);

  var glowrampDrawable = function(program, mesh, texture, baseColor, rotation, rampTarget, alpha) {
    TexturedDrawable.call(this, program, mesh, texture);
    this.uniforms.u_baseColor = vec4.clone(defaultBaseColor);
    this.uniforms.u_rotation = rotation || 0;
    this.uniforms.u_rampTarget = rampTarget || 0;
    this.uniforms.u_alpha = alpha || 0.6;
  };
  inherits(glowrampDrawable, TexturedDrawable);

  glowrampDrawable.prototype.setBaseColor = function(color) {
    this.uniforms.u_baseColor = color;
  };

  glowrampDrawable.prototype.setAlpha = function(alpha) {
    this.uniforms.u_alpha = alpha;
  };

  glowrampDrawable.prototype.updateTime = function(tick) {
    var ret = ModelDrawable.prototype.updateTime.call(this, tick);
    var inc = this.elapsed / 5000;
    this.uniforms.u_rotation = inc;
    this.uniforms.u_rampTarget = Math.sin(Math.PI / 2 * (inc - Math.floor(inc)));
    this.uniforms.u_alpha = Math.sin(inc) * 0.05 + 0.75;
    return ret;
  };

  return glowrampDrawable;
}());

imv.Drawables = imv.Drawables || {};
imv.Drawables.Glowramp = GlowrampDrawable;