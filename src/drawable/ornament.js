import TexturedDrawable from './textured';
import Constants from '../constants';
import { vec2, vec4 } from 'gl-matrix';

const PROGRAM = Constants.Program.RegionTextured;

/**
 * An OrnamentDrawable is a TextuedDrawable that draws an ornament on
 * a unit plane.
 */
class OrnamentDrawable extends TexturedDrawable {

  /**
   * Constructs an ornament
   * @param  {String} meshName    Internal name of the ornament mesh
   * @param  {String} textureName Internal name of the texture
   */
  constructor(meshName, textureName) {
    super(PROGRAM, meshName, textureName);
    this.uniforms.u_texCoordBase = vec2.fromValues(0, 0);
    this.uniforms.u_texCoordExtent = vec2.fromValues(1, 1);
    this.uniforms.u_color = vec4.clone(Constants.teamColors.LOKI);
  }
}

export default OrnamentDrawable;
