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

  var meshDrawable = function(program, mesh)
  {
    this.program = program;
    this.mesh = mesh;
    this.uniforms = {};
    this.elapsed = 0;
  };

  meshDrawable.prototype.draw = function()
  {
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