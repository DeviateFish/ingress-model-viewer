var Mesh = (function() {
  var MODE_TRIANGLES = 'triangles',
      MODE_LINES = 'lines';

  var Mesh = function(gl, attributes, faces, lines) {
    GLBound.call(this, gl);
    this.attributes = attributes;
    this.faces = faces;
    this.lines = lines;
    this.mode = MODE_TRIANGLES;
  };
  inherits(Mesh, GLBound);

  Mesh.MODE_LINES = MODE_LINES;
  Mesh.MODE_TRIANGLES = MODE_TRIANGLES;

  Mesh.prototype.draw = function(locations) {
    this.attributes.draw(locations);
    if(this.mode === MODE_TRIANGLES) {
      this.faces.draw();
    } else if (this.mode === MODE_LINES) {
      this.lines.draw();
    }
  };

  return Mesh;
}());

imv.Mesh = Mesh;
