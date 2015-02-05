var DrawableSpec = function(texture, program, mesh, baseClass) {
  this.texture = texture;
  this.program = program;
  this.mesh = mesh;
  this.baseClass = baseClass;
};

DrawableSpec.prototype.createInstance = function(renderer) {
  return renderer.createDrawable(this.texture, this.program, this.mesh, this.baseClass);
};

imv.DrawableSpec = DrawableSpec;