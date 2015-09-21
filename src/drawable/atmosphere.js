import Constants from '../constants';
import ModelDrawable from './model';
import SphereMesh from '../mesh/sphere';
import { mat3, mat4 } from 'gl-matrix';

const PROGRAM = Constants.Program.Atmosphere;

/**
 * This is a modified version of the atmosphere program from:
 * https://github.com/dataarts/webgl-globe/blob/master/globe/globe.js
 */
class AtmosphereDrawable extends ModelDrawable {

  /**
   * Initializer
   * @param  {Number} radius      Radius of the world.
   *                              This should match the radius of the world mesh the
   *                              atmosphere is being rendered over.
   * @param  {Number} vSlices     Number of vertical slices for the sphere mesh
   * @param  {Number} hSlices     Number of horizontal slices for the sphere mesh
   * @param  {Number} scaleFactor The percent to scale the mesh
   * @return {void}
   */
  constructor(radius, vSlices, hSlices, scaleFactor) {
    super(PROGRAM, null);
    this.radius = radius;
    this.vSlices = vSlices;
    this.hSlices = hSlices;
    this.uniforms.u_normalMatrix = mat3.create();
    this.scaleFactor = scaleFactor || 1.1;
    mat4.scale(this.local, this.local, [this.scaleFactor, this.scaleFactor, this.scaleFactor]);
  }

  /**
   * Updates the view matrices of the model
   *
   * @chainable
   * @see    src/drawable/model.js#updateView
   * @param  {mat4} viewProject   combined projection matrix multiplied by view matrix.
   * @return {this}
   */
  updateView(viewProject) {
    super.updateView(viewProject);
    var invert = mat4.invert(mat4.create(), viewProject),
        transpose = mat4.transpose(mat4.create(), invert);
    this.uniforms.u_normalMatrix = mat3.fromMat4(mat3.create(), transpose);
    return this;
  }

  /**
   * Initializes the drawable
   *
   * @see    src/drawable.js
   * @param  {AssetManager} manager The AssetManager containing the required assets.
   * @return {boolean}
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

export default AtmosphereDrawable;
