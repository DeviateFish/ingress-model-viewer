var inherits = function(a, b) {
  function C(){}
  C.prototype = b.prototype;
  a.superClass_ = b.prototype;
  a.prototype = new C();
  a.prototype.constructor = a;
};

// base state.
var resetGL = function(gl) {
  gl.lineWidth(1.0);
  gl.enable(gl.CULL_FACE);
  gl.frontFace(gl.CCW);
  gl.cullFace(gl.BACK);
  gl.enable(gl.DEPTH_TEST);
  gl.blendEquation(gl.FUNC_ADD);
  //gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  gl.disable(gl.BLEND);
  gl.depthMask(true);
};

var setParams = function(base, opts, deep)
{
  for(var i in base)
  {
    if(base.hasOwnProperty(i) && opts.hasOwnProperty(i))
    {
      if(deep && typeof(base[i]) == 'object' && typeof(opts[i]) == 'object')
      {
        base[i] = setParams(base[i], opts[i], deep);
      }
      else
      {
        base[i] = opts[i];
      }
    }
  }
  return base;
};

imv.Utilities = imv.Utilities || {};
imv.Utilities.inherits = inherits;
imv.Utilities.resetGL = resetGL;
imv.Utilities.setParams = setParams;
