import GLBuffer from './gl-buffer';

/**
 * A GLIndex is a GLBuffer representing an index buffer of some kind
 *
 * @extends {GLBuffer}
 * @chainable
 * @param  {context} gl           WebGL context
 * @param  {ArrayBuffer} values   Values to initialize the buffer with
 * @param  {enum} drawMode        Draw mode @see https://www.khronos.org/registry/webgl/specs/1.0/#5.14.11
 * @param  {enum} usage           Usage @see https://www.khronos.org/registry/webgl/specs/1.0/#5.14.5
 * @return {this}
 */
class GLIndex extends GLBuffer {

  constructor(gl, values, drawMode, usage) {
    usage = usage || gl.STATIC_DRAW;
    super(gl, gl.ELEMENT_ARRAY_BUFFER, usage);
    this.mode = drawMode;
    this.values = values;
    this.count = null;
    return this;
  }

  /**
   * Perform a draw call using this index buffer.
   *
   * @chainable
   * @return {this}
   */
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
