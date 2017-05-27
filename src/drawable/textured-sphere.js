import Constants from '../constants';
import TexturedDrawable from './textured';
import SphereMesh from '../mesh/sphere';

const PROGRAM = Constants.Program.Textured;

/**
 * A sphere with a texture mapped to it
 *
 * @param  {String} textureName Internal name of the texture to use
 * @param  {Number} radius      Radius of the sphere
 * @param  {Number} vSlices     Number of vertical slices
 * @param  {Number} hSlices     Number of horizontal slices
 */
class TexturedSphereDrawable extends TexturedDrawable {
  constructor(textureName, radius, vSlices, hSlices) {
    super(PROGRAM, null, textureName);
    this.radius = radius;
    this.vSlices = vSlices;
    this.hSlices = hSlices;
  }

  /**
   * Create a sphere mesh and initialize the other resources
   * @param  {AssetManager} manager AssetManager containing the texture/program
   * @return {Boolean}              Success/failure
   */
  init(manager) {
    this.mesh = new SphereMesh(
      manager._gl,
      this.radius,
      this.vSlices,
      this.hSlices
    );
    return super.init(manager);
  }
}

export default TexturedSphereDrawable;
