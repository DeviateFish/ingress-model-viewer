var TexturedSphereDrawable = (function() {

  var PROGRAM = imv.Constants.Program.Textured;

  var texturedSphere = function(textureName, radius, vSlices, hSlices) {
    this.radius = radius;
    this.vSlices = vSlices;
    this.hSlices = hSlices;
    TexturedDrawable.call(this, PROGRAM, null, textureName);
  };
  inherits(texturedSphere, TexturedDrawable);

  texturedSphere.prototype.init = function(manager) {
    this.mesh = new SphereMesh(
      manager._gl,
      this.radius,
      this.vSlices,
      this.hSlices
    );
    return TexturedDrawable.prototype.init.call(this, manager);
  };

  return texturedSphere;
}());

imv.Drawables = imv.Drawables || {};
imv.Drawables.TexturedSphere = TexturedSphereDrawable;
