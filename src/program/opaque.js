import Program from '../program';
import { resetGL } from '../utils';

class OpaqueProgram extends Program {
  constructor(gl, vertex, fragment) {
    super(gl, vertex, fragment);
  }

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
