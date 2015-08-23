import Constants from '../constants';
import TexturedDrawable from './textured';
import { vec4 } from 'gl-matrix';


const PROGRAM = Constants.Program.Xm;
const defaultTeamColor = vec4.clone(Constants.xmColors.coreGlow);
const defaultAltColor = vec4.clone(Constants.xmColors.coreGlowAlt);

class XmDrawable extends TexturedDrawable {
  constructor(meshName, textureName, teamColor) {
    super(PROGRAM, meshName, textureName);
    this.uniforms.u_elapsedTime = 0;
    this.uniforms.u_teamColor = vec4.clone(teamColor || defaultTeamColor);
    this.uniforms.u_altColor = vec4.clone(defaultAltColor);
  }

  updateTime(delta) {
    var ret = super.updateTime(delta);
    this.uniforms.u_elapsedTime = ((this.elapsed / 1000) % 300.0) * 0.1;
    return ret;
  }
}

export default XmDrawable;
