import GLBound from '../gl-bound';

/**
 * A GLBuffer is a buffer of some sort that will be passed to the gpu
 *
 * @extends {GLBound}
 * @chainable
 * @param  {context} gl    WebGL context
 * @param  {enum} target   gl target  @see https://www.khronos.org/registry/webgl/specs/1.0/#5.14.5
 * @param  {enum} usage    gl usage @see https://www.khronos.org/registry/webgl/specs/1.0/#5.14.5
 * @return {this}          the GLBuffer
 */
class GLBuffer extends GLBound {

  constructor(gl, target, usage) {
    super(gl);
    this.target = target || gl.ARRAY_BUFFER; // probably shouldn't default this.
    this.usage = usage || gl.STATIC_DRAW;
    this.glBuf = null;
    this.values = null;
    return this;
  }

  /**
   * Binds the buffer to the gpu
   *
   * @chainable
   * @return {this}
   */
  bindBuffer() {
    if(!this.values) {
      throw new Error('trying to update a buffer with no values.');
    }
    if(!this.glBuf) {
      this.glBuf = this._gl.createBuffer();
    }
    this._gl.bindBuffer(this.target, this.glBuf);
    return this;
  }

  /**
   * Unbinds the buffer (NPI)
   *
   * @chainable
   * @return {this}
   */
  unbindBuffer() {
    // this._gl.bindBuffer(this.target, 0);  // apparently this makes webgl cranky
    return this;
  }

  /**
   * Update the buffer data on the gpu
   *
   * @chainable
   * @return {this}
   */
  update() {
    this.bindBuffer();
    // if I do it this way, does it break?
    // if it works, will updating the underlying buffer
    // update the buffer without needing to call gl.bufferData again??
    this._gl.bufferData(this.target, this.values, this.usage);
    return this; // .unbindBuffer(); // apparently this makes webgl angry.
  }

  /**
   * Sets the buffer contents
   *
   * @chainable
   * @param {ArrayBuffer} values Values to store in the buffer
   * @param {Number} offset      Offset to write the values
   * @return {this}
   */
  setValues(values, offset) {
    if(!this.values) {
      this.values = values;
    } else {
      this.values.set(values, offset);
    }
    this.update();
    return this;
  }

  /**
   * Deletes a chunk of a buffer
   *
   * @chainable
   * @param  {Number} start Start of deletion
   * @param  {Number} end   End of deletion
   * @return {this}
   */
  deleteWithin(start, end) {
    if(!this.values) {
      throw new Error('Trying to splice a buffer that has no values.');
    }
    var nValues = end - start;
    var empty = new this.values.constructor(nValues);
    this.values.set(this.values.subarray(end), start);
    this.values.set(empty, this.values.length - nValues);
    this.update();
    return this;
  }

  /**
   * Do something with each elemnt of the buffer
   *
   * @chainable
   * @param  {Function} callback The callback (values returned will overwrite
   *                             the contents of the buffer at that offset)
   * @param  {Number}   start    Offset to start
   * @param  {Number}   end      Offset to end
   * @return {this}
   */
  map(callback, start, end) {
    start = start === undefined ? 0 : start;
    end = end === undefined ? this.values.length : end;
    for(var i = start; i < end; i++) {
      this.values[i] = callback(this.values[i], i);
    }
    return this;
  }

  /**
   * Update a buffer's values, and also update the buffer on the gpu
   *
   * @chainable
   * @param  {ArrayBuffer} values New values to fill the buffer with
   * @return {this}
   */
  updateBuffer(values) {
    this.values = values;
    return this.update();
  }
}

export default GLBuffer;
