import Constants from '../constants';
import TexturedDrawable from './textured';
import { vec4 } from 'gl-matrix';

const PROGRAM = Constants.Program.Glowramp;

/**
 * Default base color for the glowramp drawable
 * @type {vec4}
 */
const defaultBaseColor = vec4.clone(Constants.teamColors.NEUTRAL);

/**
 * A "glowramp" refers to the usage of the red, green, and blue channels to create
 * a "glowing" texture.
 */
class GlowrampDrawable extends TexturedDrawable {

  /**
   * Creates a glowramp drawable
   * @param  {String} meshName    Internal name of the mesh
   * @param  {String} textureName Internal name of the texture
   */
  constructor(meshName, textureName) {
    super(PROGRAM, meshName, textureName);
    this.uniforms.u_baseColor = vec4.clone(defaultBaseColor);
    this.uniforms.u_rotation = 0;
    this.uniforms.u_rampTarget = 0;
    this.uniforms.u_alpha = 0.6;
  }

  /**
   * Updates default glowramp variables (rotation, ramp target, elapsed time
   * and alpha)
   * @param  {Number} tick Time delta since last tick
   * @return {Boolean}     @see src/drawable.js#updateTime
   */
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
