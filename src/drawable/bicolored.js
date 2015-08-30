import Constants from '../constants';
import TexturedDrawable from './textured';
import { vec4 } from 'gl-matrix';

const PROGRAM = Constants.Program.Bicolored;

/**
 * Default quality color.
 * @type {vec4}
 */
const defaultColor0 = vec4.clone(Constants.qualityColors.VERY_RARE);

/**
 * Default glow color
 * @type {vec4}
 */
const defaultColor1 = vec4.clone(Constants.xmColors.coreGlow);

/**
 * This is used for items and other renderables that have two visible colors
 *
 * The specifics of it are basically: if the texture has an opacity less than 0.5,
 * the texture color is blended with u_color0
 * Otherwise, it's the texture color blended with u_color1
 *
 * Or something like that.
 */
class BicoloredDrawable extends TexturedDrawable {

  /**
   * Initialized a bi-colored drawable
   * @param  {String} meshName    Internal name of the mesh for this drawable
   * @param  {String} textureName Internal name of the texture for this drawble
   */
  constructor(meshName, textureName) {
    super(PROGRAM, meshName, textureName);
    this.uniforms.u_color0 = vec4.clone(defaultColor0);
    this.uniforms.u_color1 = vec4.clone(defaultColor1);
  }
}

export default BicoloredDrawable;
