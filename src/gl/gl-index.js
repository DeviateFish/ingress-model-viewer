import GLBuffer from './gl-buffer';

class GLIndex extends GLBuffer {
  constructor(gl, values, drawMode, usage) {
    usage = usage || gl.STATIC_DRAW;
    super(gl, gl.ELEMENT_ARRAY_BUFFER, usage);
    this.mode = drawMode;
    this.values = values;
    this.count = null;
    return this;
  }

  draw() {
    var gl = this._gl;
    if(!this.glBuf) {
      this.update();
    } else {
      this.bindBuffer();
    }
    gl.drawElements(this.mode, this.values.length, gl.UNSIGNED_SHORT, 0);
    return this;
  }
}

export default GLIndex;
