import GLBuffer from './gl-buffer';

/**
 * A GLAttribute is a GLBuffer that represents vertex attributes
 *
 * @private
 * @extends {GLBuffer}
 * @chainable
 * @param  {context} gl             WebGLContext
 * @param  {Array} attributes       An array of VertexAttributes
 * @param  {ArrayBuffer} values     Values to fill the buffer with
 * @param  {enum} usage             Usage @see https://www.khronos.org/registry/webgl/specs/1.0/#5.14.5
 * @return {this} The new GLAttribute
 */
class GLAttribute extends GLBuffer {
  constructor(gl, attributes, values, usage) {
    usage = usage || gl.STATIC_DRAW;
    super(gl, gl.ARRAY_BUFFER, usage);
    this.attributes = attributes;
    this.values = values;
    this.size = this.count = null;
    this._validate = false;
    this.size = 0;
    this.width = 0;
    for(var i = 0, a; i < this.attributes.length; i++)
    {
      a = this.attributes[i];
      this.size += 4 * a.size; // 4 because float is 4 bytes.
      this.width += a.size;
    }
    return this;
  }

  /**
   * Confirms that the underlying buffer's length is an even multiple
   * of total size of the attributes for the buffer
   *
   * Issues a warning if not.
   *
   * @return {void}
   */
  validate() {
    if(this._validate) {
      if(this.values.length % this.width !== 0)
      {
        console.warn('values array length is not an even multiple of the total size of the attributes');  // eslint-disable-line no-console
      }
    }
  }

  /**
   * Update the values in the buffer and pushes the buffer to the gpu
   *
   * @chainable
   * @param  {ArrayBuffer} values New values to write to the buffer
   *
   * @return {this} Returns `this`
   */
  updateValues(values) {
    this.values = values;
    this.validate();
    return this.update();
  }

  /**
   * Given a set of program locations, set up the attribute pointers
   *
   * @chainable
   * @param  {Object} locations Map of attribute names to program locations
   *
   * @return {this} Returns `this`
   */
  draw(locations) {
    var gl = this._gl;
    var a, s = 0;
    if(!this.glBuf) {
      this.update();
    } else {
      this.bindBuffer();
    }
    for(var i = 0; i < this.attributes.length; i++)
    {
      a = this.attributes[i];
      if(a.name in locations)
      {
        gl.enableVertexAttribArray(locations[a.name]);
        gl.vertexAttribPointer(locations[a.name], a.size, gl.FLOAT, false, this.size, s);
      }
      // I don't know if I should suppress this, but if I
      // don't, it generates one warning per frame.
      //console.warn('Program is missing attribute ' + a.name);
      s += 4 * a.size;
    }
    return this; //.unbindBuffer();  // maybe?
  }

  /**
   * Perform some operation on each set of values for some attribute
   *
   * @chainable
   * @param  {Number}   attributeIndex Index of the attribute to select
   * @param  {Function} callback       Callback
   *
   * @return {this} Returns `this`
   */
  eachAttribute(attributeIndex, callback) {
    var offset = 0, size, i;
    if(attributeIndex >= 0 && attributeIndex < this.attributes.length) {
      for(i = 0; i < attributeIndex; i++) {
        offset += this.attributes[i].size;
      }
      size = this.attributes[attributeIndex].size;
      for(i = offset; i < this.values.length; i += this.width) {
        callback(this.values.subarray(i, i + size));
      }
    }
    return this;
  }
}

export default GLAttribute;
