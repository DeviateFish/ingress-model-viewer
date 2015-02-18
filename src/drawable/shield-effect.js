var ShieldEffectDrawable = (function(){

  var PROGRAM = imv.Constants.Program.ShieldEffect;

  // these defaults are whack.  Need to find the real
  // functions used to update these, too
  // As of 1.62.0, that was in ...ingress.common.scanner.b.a.d
  // The baksmali is a little jacked up, though.
  var defaultColor = vec4.clone(imv.Constants.teamColors.NEUTRAL),
    defaultRampTargetInv = vec2.fromValues(0.5, 1.3),
    defaultContributions = vec3.fromValues(0.5, 0.5, 0.5);

  var shieldEffectDrawable = function(meshName, textureName) {
    TexturedDrawable.call(this, PROGRAM, meshName, textureName);
    this.uniforms.u_color = vec4.clone(defaultColor);
    this.uniforms.u_rampTargetInvWidth = vec2.clone(defaultRampTargetInv);
    this.uniforms.u_contributionsAndAlpha = vec3.clone(defaultContributions);
  };
  inherits(shieldEffectDrawable, TexturedDrawable);

  shieldEffectDrawable.prototype.updateTime = function(delta) {
    var ret = ModelDrawable.prototype.updateTime.call(this, delta);
    var inc = this.elapsed / 10000;
    this.uniforms.u_rampTargetInvWidth[0] = (inc - Math.floor(inc)) * -2.0 + 1.0;
    this.uniforms.u_rampTargetInvWidth[1] = (inc - Math.floor(inc)) * 2.0;
    return ret;
  };

  return shieldEffectDrawable;
}());

imv.Drawables = imv.Drawables || {};
imv.Drawables.ShieldEffect = ShieldEffectDrawable;