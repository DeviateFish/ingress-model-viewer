var BicoloredDrawable = (function(){

  // default quality color: very rare
  var defaultColor0 = vec4.clone(constants.qualityColors.VERY_RARE);

  // default glow color: xm color
  var defaultColor1 = vec4.clone(constants.xmColors.coreGlow);

  var bicolorDrawable = function(program, mesh, texture, u_color0, u_color1) {
    TexturedDrawable.call(this, program, mesh, texture);
    this.uniforms.u_color0 = u_color0 || (vec4.clone(defaultColor0));
    this.uniforms.u_color1 = u_color1 || (vec4.clone(defaultColor1));
  };
  inherits(bicolorDrawable, TexturedDrawable);

  bicolorDrawable.prototype.setPrimaryColor = function(color)
  {
    this.uniforms.u_color0 = color;
  };

  bicolorDrawable.prototype.setSecondaryColor = function(color)
  {
    this.uniforms.u_color1 = color;
  };

  return bicolorDrawable;
}());

imv.Drawables = imv.Drawables || {};
imv.Drawables.Bicolored = BicoloredDrawable;