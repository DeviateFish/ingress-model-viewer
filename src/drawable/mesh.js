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
    this.programName = programName;
    this.meshName = meshName;
    this.program = null;
    this.mesh = null;
    this.uniforms = {};
    this.elapsed = 0;
    this.ready = false;
  };

  meshDrawable.prototype.init = function(manager)
  {
    this.program = manager.getProgram(this.programName);
    if(!this.program) {
      console.warn('missing program ' + this.programName);
      return false;
    }
    this.mesh = manager.getMesh(this.meshName);
    if(!this.mesh) {
      console.warn('missing mesh ' + this.meshName);
      return false;
    }
    this.ready = true;
    return true;
  };

  meshDrawable.prototype.draw = function()
  {
    if(!this.ready) {
      console.warn('drawable is not initialized');
      return false;
    }
    this.program.use(_draw.bind(this));
  };

  meshDrawable.prototype.setUniform = function(name, value)
  {
    this.uniforms[name] = value;
  };

  meshDrawable.prototype.updateTime = function(delta) {
    this.elapsed += delta;
    if(this.onUpdate)
    {
      return this.onUpdate(delta, this.elapsed);
    }
    return true;
  };

  return meshDrawable;
}());

imv.MeshDrawable = MeshDrawable;