import Constants from './constants';
import TexturedDrawable from './drawable/textured';

// base state.
export function resetGL(gl) {
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
}

export function setParams(base, opts, deep) {
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
}

export function disco(delta, elapsed) {
  var inc = elapsed / 1000;
  this.uniforms.u_baseColor[0] = Math.sin(inc);
  this.uniforms.u_baseColor[1] = Math.sin(inc + (2 * Math.PI / 3));
  this.uniforms.u_baseColor[2] = Math.sin(inc + (4 * Math.PI / 3));
  return true;
}

function makeArtifact(meshName, textureName) {

  class artifact extends TexturedDrawable {
    constructor() {
      super(Constants.Program.Textured, meshName, textureName);
    }
  }

  return artifact;
}

export function generateArtifacts(series, num, hasFrozen) {
  var i, meshName, textureName = 'Artifact' + series + 'Texture';

  var artifacts = {};

  for(i = 1; i <= num; i++) {
    meshName = series + i;
    artifacts['' + i] = makeArtifact(meshName, textureName);
  }
  if(hasFrozen) {
    for(i = 1; i <= num; i++) {
      meshName = series + 'Frozen' + i;
      artifacts['Frozen' + i] = makeArtifact(meshName, textureName);
    }
  }

  return artifacts;
}
