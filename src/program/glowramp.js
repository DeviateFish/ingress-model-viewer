import Program from '../program';
import { resetGL } from '../utils';

/**
 * A GlowrampProgram is a program meant for drawing
 * transparent glowramp drawables
 *
 * @extends {Program}
 * @param  {context} gl      WebGL context
 * @param  {String} vertex   Vertex shader source
 * @param  {String} fragment Fragment shader source
 */
class GlowrampProgram extends Program {

  constructor(gl, vertex, fragment) {
    super(gl, vertex, fragment);
  }

  /**
   * Use this program to draw
   *
   * Sets up the proper blending modes, etc
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
    gl.disable(gl.CULL_FACE);
    gl.enable(gl.BLEND);
    gl.depthMask(false);
    gl.blendEquation(gl.FUNC_ADD);
    //gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    fn(this.attributes, this.uniforms);

    resetGL(gl);
    //gl.useProgram(0);
  }
}

export default GlowrampProgram;
