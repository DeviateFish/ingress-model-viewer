import Constants from '../constants';
import TexturedDrawable from './textured';
import { vec4 } from 'gl-matrix';

const PROGRAM = Constants.Program.Glowramp;

// default base color: neutral portal color
const defaultBaseColor = vec4.clone(Constants.teamColors.NEUTRAL);

class GlowrampDrawable extends TexturedDrawable {

  constructor(meshName, textureName) {
    super(PROGRAM, meshName, textureName);
    this.uniforms.u_baseColor = vec4.clone(defaultBaseColor);
    this.uniforms.u_rotation = 0;
    this.uniforms.u_rampTarget = 0;
    this.uniforms.u_alpha = 0.6;
  }

  updateTime(tick) {
    var ret = super.updateTime(tick);
    var inc = this.elapsed / 5000;
    this.uniforms.u_rotation = inc;
    this.uniforms.u_rampTarget = Math.sin(Math.PI / 2 * (inc - Math.floor(inc)));
    this.uniforms.u_alpha = Math.sin(inc) * 0.05 + 0.75;
    return ret;
  }
}

export default GlowrampDrawable;
