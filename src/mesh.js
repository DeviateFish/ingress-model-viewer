var Mesh = (function() {
  var MODE_TRIANGLES = 'triangles',
      MODE_LINES = 'lines';

  var Mesh = function(gl, attributeSpec, attributeBuf) {
    GLBound.call(this, gl);
    this.attributes = new AttributeBuffer(gl, attributeSpec, attributeBuf);
    this.faces = null;
    this.nFaces = 0;
    this.lines = null;
    this.nLines = null;
    this.faceBuf = null;
    this.lineBuf = null;
    this.mode = MODE_TRIANGLES;
  };
  inherits(Mesh, GLBound);

  Mesh.prototype.initFaces = function() {
    if(!this.faces) {
      throw 'Mesh has no faces!';
    }
    var gl = this._gl;
    this.attributes.init();
    this.faceBuf = gl.createBuffer();
    this.bindFaces();
  };

  Mesh.prototype.bindFaces = function() {
    var gl = this._gl;
    if(this.faceBuf) {
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.faceBuf);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.faces), gl.STATIC_DRAW);
    }
  };

  Mesh.prototype.initLines = function() {
    if(!this.lines) {
      throw 'Mesh has no lines!';
    }
    var gl = this._gl;
    this.attributes.init();
    this.lineBuf = gl.createBuffer();
    this.bindLines();
  };

  Mesh.prototype.bindLines = function() {
    var gl = this._gl;
    if(this.lineBuf) {
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.lineBuf);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.lines), gl.STATIC_DRAW);
    }
  };

  Mesh.prototype.init = function() {
    if(this.mode === MODE_TRIANGLES) {
      this.initFaces();
    } else if(this.mode === MODE_LINES) {
      this.initLines();
    }
  };

  Mesh.prototype.drawFaces = function(locations) {
    var gl = this._gl;
    if(!this.faceBuf)
    {
      this.initFaces();
    }
    this.attributes.draw(locations);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.faceBuf);
    gl.drawElements(gl.TRIANGLES, this.nFaces, gl.UNSIGNED_SHORT, 0);
  };

  Mesh.prototype.drawLines = function(locations) {
    var gl = this._gl;
    if(!this.lineBuf)
    {
      this.initLines();
    }
    this.attributes.draw(locations);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.lineBuf);
    gl.drawElements(gl.TRIANGLES, this.nLines, gl.UNSIGNED_SHORT, 0);
  };

  Mesh.prototype.draw = function(locations) {
    if(this.mode === MODE_TRIANGLES) {
      this.drawFaces(locations);
    } else if(this.mode === MODE_LINES) {
      this.drawLines(locations);
    }
  };

  return Mesh;
}());

imv.Mesh = Mesh;