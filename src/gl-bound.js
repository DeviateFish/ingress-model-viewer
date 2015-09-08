/**
 * Base class for all things bound to a gl context.
 */
class GLBound {

  /**
   * Binds to a gl context
   * @param  {context} gl  A webgl context
   */
  constructor(gl) {
    this._gl = gl;
  }
}

export default GLBound;
