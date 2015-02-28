var OpaqueProgram = (function(){

  var opaque = function(gl, vertex, fragment) {
    Program.call(this, gl, vertex, fragment);
  };
  inherits(opaque, Program);

  opaque.prototype.use = function(fn)
  {
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
  };

  return opaque;
}());

imv.Programs = imv.Programs || {};
imv.Programs.Opaque = OpaqueProgram;