var BicoloredDrawable = (function(){

  // TODO: make constants for these,
  // similar to how mesh names are now handled.
  var PROGRAM = imv.Constants.Program.Bicolored;

  // default quality color: very rare
  var defaultColor0 = vec4.clone(constants.qualityColors.VERY_RARE);

  // default glow color: xm color
  var defaultColor1 = vec4.clone(constants.xmColors.coreGlow);

  var bicolorDrawable = function(meshName, textureName) {
    TexturedDrawable.call(this, PROGRAM, meshName, textureName);
    this.uniforms.u_color0 = vec4.clone(defaultColor0);
    this.uniforms.u_color1 = vec4.clone(defaultColor1);
  };
  inherits(bicolorDrawable, TexturedDrawable);

  return bicolorDrawable;
}());

imv.Drawables = imv.Drawables || {};
imv.Drawables.Bicolored = BicoloredDrawable;