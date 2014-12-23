var ShieldEffectDrawable = (function(){

  // these defaults are whack.  Need to find the real
  // functions used to update these, too
  // As of 1.62.0, that was in ...ingress.common.scanner.b.a.d
  // The baksmali is a little jacked up, though.
  var defaultColor = new THREE.Vector4().copy(imv.Constants.teamColors.NEUTRAL),
    defaultRampTargetInv = new THREE.Vector2(0.5, 1.3),
    defaultContributions = new THREE.Vector3(0.5, 0.5, 0.5);

  var shieldEffectDrawable = function(texture, color, rampTargetInvWidth, contributions) {
    TexturedDrawable.call(this, texture);
    this.uniforms.u_color = {
      type: "v4",
      value: color || defaultColor
    };
    this.uniforms.u_rampTargetInvWidth = {
      type: "v2",
      value: rampTargetInvWidth || defaultRampTargetInv.clone()
    };
    this.uniforms.u_contributionsAndAlpha = {
      type: "v3",
      value: contributions || defaultContributions.clone()
    };
    this.options.transparent = true;
  };
  inherits(shieldEffectDrawable, TexturedDrawable);

  shieldEffectDrawable.prototype.setColor = function(color) {
    this.updateUniformV('u_color', color);
  };

  shieldEffectDrawable.prototype.updateTime = function(tick) {
    Drawable.prototype.updateTime.call(this, tick);
    var inc = this.elapsed / 10000;
    var v = this.uniforms.u_rampTargetInvWidth.value.clone();
    v.x = (inc - Math.floor(inc)) * 2.0 - 0.5;
    this.updateUniformV('u_rampTargetInvWidth', v);
  };

  return shieldEffectDrawable;
}());

imv.Drawables = imv.Drawables || {};
imv.Drawables.ShieldEffect = ShieldEffectDrawable;