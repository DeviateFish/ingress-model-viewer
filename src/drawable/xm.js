import Constants from '../constants';
import TexturedDrawable from './textured';
import { vec4 } from 'gl-matrix';


const PROGRAM = Constants.Program.Xm;
const defaultTeamColor = vec4.clone(Constants.xmColors.coreGlow);
const defaultAltColor = vec4.clone(Constants.xmColors.coreGlowAlt);

/**
 * An XmDrawable is a drawable representing the animate "xm core" of inventory items
 */
class XmDrawable extends TexturedDrawable {

  /**
   * Construct an xm core
   * @param  {String} meshName    Mesh internal name
   * @param  {String} textureName Texture internal name
   * @param  {vec4} teamColor     Color of the xm glow.
   * @return {[type]}             [description]
   */
  constructor(meshName, textureName, teamColor) {
    super(PROGRAM, meshName, textureName);
    this.uniforms.u_elapsedTime = 0;
    this.uniforms.u_teamColor = vec4.clone(teamColor || defaultTeamColor);
    this.uniforms.u_altColor = vec4.clone(defaultAltColor);
  }

  /**
   * Animates the xm core
   * @param  {Number} delta Time since last frame
   * @return {Boolean}      Returns true to continue the animation.
   */
  updateTime(delta) {
    var ret = super.updateTime(delta);
    this.uniforms.u_elapsedTime = ((this.elapsed / 1000) % 300.0) * 0.1;
    return ret;
  }
}

export default XmDrawable;
