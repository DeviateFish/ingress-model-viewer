var GLBuffer = function(gl, target, usage) {
  GLBound.call(this, gl);
  this.target = target || gl.ARRAY_BUFFER; // probably shouldn't default this.
  this.usage = usage || gl.STATIC_DRAW;
  this.glBuf = null;
  this.values = null;
  return this;
};
inherits(GLBuffer, GLBound);

GLBuffer.prototype.bindBuffer = function() {
  var gl = this._gl;
  if(!this.values) {
    console.warn('trying to update a buffer with no values.');
    return false;
  }
  if(!this.glBuf) {
    this.glBuf = gl.createBuffer();
  }
  gl.bindBuffer(this.target, this.glBuf);
  return this;
};

GLBuffer.prototype.unbindBuffer = function() {
  gl.bindBuffer(this.target, 0);
  return this;
};

GLBuffer.prototype.update = function() {
  this.bindBuffer();
  // if I do it this way, does it break?
  // if it works, will updating the underlying buffer
  // update the buffer without needing to call gl.bufferData again??
  gl.bufferData(this.target, this.values, this.usage);
  return this.unbindBuffer();
};

GLBuffer.prototype.setValues = function(values, offset) {
  if(!this.values) {
    this.values = values;
    this.update();
  } else {
    this.values.set(values, offset);
  }
  return this;
};

GLBuffer.prototype.updateBuffer = function(values) {
  this.values = values;
  return this.update();
};

IMV.GL = IMV.GL || {};
IMV.GL.Buffer = GLBuffer;