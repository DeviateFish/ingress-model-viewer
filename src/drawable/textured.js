var TexturedDrawable = function(programName, meshName, textureName) {
  ModelDrawable.call(this, programName, meshName);
  this.textureName = textureName;
  this.texture = null;
};
inherits(TexturedDrawable, ModelDrawable);

TexturedDrawable.prototype.draw = function()
{
  this.texture.use(0);
  this.uniforms.u_texture = 0;
  ModelDrawable.prototype.draw.call(this);
};

TexturedDrawable.prototype.init = function(manager)
{
  if(this.textureName) {
    this.texture = manager.getTexture(this.textureName);
    if(!this.texture) {
      console.warn('missing texture ' + this.textureName);
      return false;
    }
  }
  return ModelDrawable.prototype.init.call(this, manager);
};

imv.Drawables = imv.Drawables || {};
imv.Drawables.Textured = TexturedDrawable;
