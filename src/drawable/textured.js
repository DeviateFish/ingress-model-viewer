var TexturedDrawable = function(program, mesh, texture) {
  ModelDrawable.call(this, program, mesh);
  this.texture = texture;
};
inherits(TexturedDrawable, ModelDrawable);

TexturedDrawable.prototype.draw = function()
{
  this.texture.use(0);
  this.uniforms.u_texture = 0;
  ModelDrawable.prototype.draw.call(this);
};

imv.Drawables = imv.Drawables || {};
imv.Drawables.Textured = TexturedDrawable;