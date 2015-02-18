var XmDrawable = (function(){

  var PROGRAM = imv.Constants.Program.Xm;

  var defaultTeamColor = vec4.clone(constants.xmColors.coreGlow);
  var defaultAltColor = vec4.clone(constants.xmColors.coreGlowAlt);

  var xmDrawable = function(meshName, textureName, teamColor) {
    TexturedDrawable.call(this, PROGRAM, meshName, textureName);
    this.uniforms.u_elapsedTime = 0;
    this.uniforms.u_teamColor = vec4.clone(teamColor || defaultTeamColor);
    this.uniforms.u_altColor = vec4.clone(defaultAltColor);
  };
  inherits(xmDrawable, TexturedDrawable);

  xmDrawable.prototype.updateTime = function(delta) {
    var ret = MeshDrawable.prototype.updateTime.call(this, delta);
    this.uniforms.u_elapsedTime = ((this.elapsed / 1000) % 300.0) * 0.1;
    return ret;
  };

  return xmDrawable;
}());

imv.Drawables = imv.Drawables || {};
imv.Drawables.Xm = XmDrawable;