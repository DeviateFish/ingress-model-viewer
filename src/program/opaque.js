import Program from '../program';
import { resetGL } from '../utils';

/**
 * And OpaqueProgram is a Program used to draw opaque drawables
 *
 * @extends {Program}
 * @param  {context} gl      WebGL context
 * @param  {String} vertex   Vertex shader source
 * @param  {String} fragment Fragment shader source
 */
class OpaqueProgram extends Program {

  constructor(gl, vertex, fragment) {
    super(gl, vertex, fragment);
  }

  /**
   * Use this program to draw.
   *
   * Sets up the proper culling for drawing opaque objects
   *
   * @param  {Function} fn The draw function
   * @return {void}
   */
  use(fn) {
    if(!this.program)
    {
      this.init();
    }
    var gl = this._gl;
    gl.useProgram(this.program);
    // init stuffs.
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    gl.frontFace(gl.CCW);
    gl.cullFace(gl.BACK);
    gl.depthMask(true);

    fn(this.attributes, this.uniforms);

    resetGL(gl);
    //gl.useProgram(0);
  }
}

export default OpaqueProgram;
