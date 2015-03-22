var DynamicDrawable = (function() {

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

  var dynamic = function(programName, mesh) {
    Drawable.call(this, programName);
    this.mesh = mesh;
    this.drawfn = _draw.bind(this);
  };
  inherits(dynamic, Drawable);

  return dynamic;
}());

imv.Drawables = imv.Drawables || {};
imv.Drawables.Dynamic = DynamicDrawable;
