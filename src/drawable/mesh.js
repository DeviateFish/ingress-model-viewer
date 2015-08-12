var MeshDrawable = (function() {

  // private function ;)
  var _draw = function(locations, uniforms)
  {
    for(var i in this.uniforms)
    {
      if(this.uniforms.hasOwnProperty(i) && (i in uniforms))
      {
        uniforms[i](this.uniforms[i]);
      }
    }
    this.mesh.draw(locations);
  };

  var meshDrawable = function(programName, meshName)
  {
    Drawable.call(this, programName);
    this.meshName = meshName;
    this.mesh = null;
    this.drawfn = _draw.bind(this);
  };
  inherits(meshDrawable, Drawable);

  meshDrawable.prototype.init = function(manager)
  {
    if(this.meshName) {
      this.mesh = manager.getMesh(this.meshName);
      if(!this.mesh) {
        console.warn('missing mesh ' + this.meshName);
        return false;
      }
    }
    return Drawable.prototype.init.call(this, manager);
  };

  return meshDrawable;
}());

imv.Drawables = imv.Drawables || {};
imv.Drawables.Mesh = MeshDrawable;
