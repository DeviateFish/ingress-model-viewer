var BicoloredDrawable = (function(){

  // default quality color: very rare
  var defaultColor0 = new THREE.Vector4().copy(constants.qualityColors.VERY_RARE);

  // default glow color: xm color
  var defaultColor1 = new THREE.Vector4().copy(constants.xmColors.coreGlow);

  var bicolorDrawable = function(texture, u_color0, u_color1) {
    TexturedDrawable.call(this, texture);
    this.uniforms.u_color0 = {
      type: "v4",
      value: u_color0 || (defaultColor0.clone())
    };
    this.uniforms.u_color1 = {
      type: "v4",
      value: u_color1 || (defaultColor1.clone())
    };
  };
  inherits(bicolorDrawable, TexturedDrawable);

  bicolorDrawable.prototype.setPrimaryColor = function(color)
  {
    this.updateUniformV('u_color0', color);
  };

  bicolorDrawable.prototype.setSecondaryColor = function(color)
  {
    this.updateUniformV('u_color1', color);
  };

  return bicolorDrawable;
}());

imv.Drawables = imv.Drawables || {};
imv.Drawables.Bicolored = BicoloredDrawable;