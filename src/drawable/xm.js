var XmDrawable = (function(){

  var defaultTeamColor = vec4.clone(constants.xmColors.coreGlow);
  var defaultAltColor = vec4.clone(constants.xmColors.coreGlowAlt);

  var xmDrawable = function(program, mesh, texture, teamColor, altColor, elapsed) {
    TexturedDrawable.call(this, program, mesh, texture);
    this.uniforms.u_elapsedTime = elapsed || 0;
    this.uniforms.u_teamColor = teamColor || vec4.clone(defaultTeamColor);
    this.uniforms.u_altColor = altColor || vec4.clone(defaultAltColor);
  };
  inherits(xmDrawable, TexturedDrawable);

  xmDrawable.prototype.setTeamColor = function(color) {
    this.uniforms.u_teamColor = color;
  };

  xmDrawable.prototype.setAltColor = function(color) {
    this.uniforms.u_altColor = color;
  };

  xmDrawable.prototype.updateTime = function(delta) {
    var ret = MeshDrawable.prototype.updateTime.call(this, delta);
    this.uniforms.u_elapsedTime = ((this.elapsed / 1000) % 300.0) * 0.1;
    return ret;
  };

  return xmDrawable;
}());

imv.Drawables = imv.Drawables || {};
imv.Drawables.Xm = XmDrawable;