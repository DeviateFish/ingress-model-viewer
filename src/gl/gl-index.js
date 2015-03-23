var GLIndex = (function() {

  var glIndex = function(gl, values, drawMode, usage)
  {
    usage = usage || gl.STATIC_DRAW;
    GLBuffer.call(this, gl, gl.ELEMENT_ARRAY_BUFFER, usage);
    this.mode = drawMode;
    this.values = values;
    this.count = null;
    return this;
  };
  inherits(glIndex, GLBuffer);

  glIndex.prototype.draw = function()
  {
    var gl = this._gl;
    if(!this.glBuf) {
      this.update();
    } else {
      this.bindBuffer();
    }
    gl.drawElements(this.mode, this.values.length, gl.UNSIGNED_SHORT, 0);
    return this;
  };

  return glIndex;
}());

imv.GL = imv.GL || {};
imv.GL.Index = GLIndex;
