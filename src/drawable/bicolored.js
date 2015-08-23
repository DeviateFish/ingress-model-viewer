import Constants from '../constants';
import TexturedDrawable from './textured';
import { vec4 } from 'gl-matrix';

const PROGRAM = Constants.Program.Bicolored;

// default quality color: very rare
const defaultColor0 = vec4.clone(Constants.qualityColors.VERY_RARE);

// default glow color: xm color
const defaultColor1 = vec4.clone(Constants.xmColors.coreGlow);

class BicoloredDrawable extends TexturedDrawable {
  constructor(meshName, textureName) {
    super(PROGRAM, meshName, textureName);
    this.uniforms.u_color0 = vec4.clone(defaultColor0);
    this.uniforms.u_color1 = vec4.clone(defaultColor1);
  }
}

export default BicoloredDrawable;
