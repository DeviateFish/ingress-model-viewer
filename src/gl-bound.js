/**
 * Base class for all things bound to a gl context.
 *
 * @param  {context} gl  A webgl context
 */
class GLBound {
  constructor(gl) {
    this._gl = gl;
  }
}

export default GLBound;
