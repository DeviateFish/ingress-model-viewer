var GlowrampDrawable = (function(){

  // is this correct?  Might want to doublecheck
  // what program the waypoint uses.
  var PROGRAM = imv.Constants.Program.Glowramp;

  // default base color: neutral portal color
  var defaultBaseColor = vec4.clone(imv.Constants.teamColors.NEUTRAL);

  var glowrampDrawable = function(meshName, textureName) {
    TexturedDrawable.call(this, PROGRAM, meshName, textureName);
    this.uniforms.u_baseColor = vec4.clone(defaultBaseColor);
    this.uniforms.u_rotation = 0;
    this.uniforms.u_rampTarget = 0;
    this.uniforms.u_alpha = 0.6;
  };
  inherits(glowrampDrawable, TexturedDrawable);

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