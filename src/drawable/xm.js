var XmDrawable = (function(){

  var defaultTeamColor = new THREE.Vector4().copy(constants.xmColors.coreGlow);
  var defaultAltColor = new THREE.Vector4().copy(constants.xmColors.coreGlowAlt);

  var xmDrawable = function(texture, teamColor, altColor, elapsed) {
    TexturedDrawable.call(this, texture);
    this.uniforms.u_elapsedTime = {
      type: "f",
      value: elapsed || 0
    };
    this.uniforms.u_teamColor = {
      type: "v4",
      value: teamColor || defaultTeamColor.clone()
    };
    this.uniforms.u_altColor = {
      type: "v4",
      value: altColor || defaultAltColor.clone()
    };
  };
  inherits(xmDrawable, TexturedDrawable);

  xmDrawable.prototype.setTeamColor = function(color) {
    this.updateUniformV('u_teamColor', color);
  };

  xmDrawable.prototype.setAltColor = function(color) {
    this.updateUniformV('u_altColor', color);
  };

  xmDrawable.prototype.updateTime = function(tick) {
    Drawable.prototype.updateTime.call(this, tick);
    this.updateUniformF('u_elapsedTime', ((this.elapsed / 1000) % 300.0) * 0.1);
  };

  return xmDrawable;
}());

imv.Drawables = imv.Drawables || {};
imv.Drawables.Xm = XmDrawable;