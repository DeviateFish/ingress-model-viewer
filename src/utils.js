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

var disco = function(delta, elapsed) {
  var inc = elapsed / 1000;
  this.uniforms.u_baseColor[0] = Math.sin(inc);
  this.uniforms.u_baseColor[1] = Math.sin(inc + (2 * Math.PI / 3));
  this.uniforms.u_baseColor[2] = Math.sin(inc + (4 * Math.PI / 3));
  return true;
};

var generateArtifacts = (function() {
  var makeArtifact = function(meshName, textureName) {
    var artifact = function() {
      TexturedDrawable.call(this, imv.Constants.Program.Textured, meshName, textureName);
    };
    inherits(artifact, TexturedDrawable);

    return artifact;
  };

  return function(series, num, hasFrozen) {
    var i, meshName, textureName = 'Artifact' + series + 'Texture';

    imv.Drawables = imv.Drawables || {};
    imv.Drawables.Artifact = imv.Drawables.Artifact || {};
    imv.Drawables.Artifact[series] = imv.Drawables.Artifact[series] || {};

    for(i = 1; i <= num; i++) {
      meshName = series + i;
      imv.Drawables.Artifact[series]['' + i] = makeArtifact(meshName, textureName);
    }
    if(hasFrozen) {
      for(i = 1; i <= num; i++) {
        meshName = series + 'Frozen' + i;
        imv.Drawables.Artifact[series]['Frozen' + i] = makeArtifact(meshName, textureName);
      }
    }
  };
}());

imv.Utilities = imv.Utilities || {};
imv.Utilities.inherits = inherits;
imv.Utilities.resetGL = resetGL;
imv.Utilities.setParams = setParams;
imv.Utilities.disco = disco;
imv.Utilities.generateArtifacts = generateArtifacts;
