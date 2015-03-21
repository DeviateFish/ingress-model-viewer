var DynamicTexturedDrawable = function(programName, mesh, textureName) {
  DynamicModelDrawable.call(this, programName, mesh);
  this.textureName = textureName;
  this.texture = null;
};
inherits(DynamicTexturedDrawable, DynamicModelDrawable);

DynamicTexturedDrawable.prototype.draw = function()
{
  this.texture.use(0);
  this.uniforms.u_texture = 0;
  DynamicModelDrawable.prototype.draw.call(this);
};

DynamicTexturedDrawable.prototype.init = function(manager)
{
  this.texture = manager.getTexture(this.textureName);
  if(!this.texture) {
    console.warn('missing texture ' + this.textureName);
    return false;
  }
  return DynamicModelDrawable.prototype.init.call(this, manager);
};

imv.Drawables = imv.Drawables || {};
imv.Drawables.DynamicTextured = DynamicTexturedDrawable;