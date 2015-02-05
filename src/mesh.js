var Mesh = function(gl, attributeBuf, attributeSpec, faces)
{
  GLBound.call(this, gl);
  this.attributes = new AttributeBuffer(gl, attributeSpec, attributeBuf);
  this.faces = faces;
  this.indexBuf = null;
};
inherits(Mesh, GLBound);

Mesh.prototype.init = function()
{
  var gl = this._gl;
  this.attributes.init();
  this.indexBuf = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuf);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.faces), gl.STATIC_DRAW);
};

Mesh.prototype.draw = function(locations)
{
  var gl = this._gl;
  if(!this.indexBuf)
  {
    this.init();
  }
  this.attributes.draw(locations);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuf);
  gl.drawElements(gl.TRIANGLES, this.faces.length, gl.UNSIGNED_SHORT, 0);
};

imv.Mesh = Mesh;