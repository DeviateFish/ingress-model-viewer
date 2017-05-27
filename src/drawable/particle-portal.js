import Constants from '../constants';
import ParticleDrawable from './particle';
import ParticlePortalMesh from '../mesh/particle-portal';
import { vec3, vec4 } from 'gl-matrix';

const PROGRAM = Constants.Program.ParticlePortal;
const MAX_SYSTEMS = 40;

/**
 * A drawable representing a system of particles emanating from a portal
 *
 * @class
 * @extends {ParticleDrawable}
 * @param  {vec4}   color    The particle color
 * @param  {Number} height   The height to propagate
 * @param  {Number} count    The number of particles
 * @param  {Number} spread   The spread between particles
 * @param  {Number} distance The distance
 */
class ParticlePortalDrawable extends ParticleDrawable {

  constructor(color, height, count, spread, distance) {
    super(PROGRAM);
    let modColor = vec4.clone(color);
    modColor[3] = count;
    // uniforms should be flattened arrays.
    // Since they're expected to contain up to 40 systems, we'll need to create
    // arrays of 40 * 4 elements each.
    this.uniforms.u_color = new Float32Array(MAX_SYSTEMS * 4);
    this.uniforms.u_position = new Float32Array(MAX_SYSTEMS * 4);
    this.uniforms.u_params = new Float32Array(MAX_SYSTEMS * 4);
    // fill in the first 4 slots.
    vec4.copy(this.uniforms.u_color, modColor);
    vec4.copy(this.uniforms.u_position, vec4.fromValues(0, 0, 0, height));
    vec4.copy(this.uniforms.u_params, vec4.fromValues(0, distance, spread, 1));
  }

  /**
   * Update the view, and uniforms pertaining to the view
   * @param  {mat4} viewProject   Camera's combine view and projection matrix
   * @param  {Camera} camera      The camera
   * @return {void}
   */
  updateView(viewProject, camera) {
    super.updateView(viewProject, camera);
    if(camera) {
      let dist = vec3.length(camera.position);
      let scale = Math.pow(dist, 0.2);
      this.uniforms.u_params[3] = scale;
    }
  }

  /**
   * Update the time for the system
   * @param  {Number} delta Time since last tick
   * @return {Boolean}      Results of onUpdate
   */
  updateTime(delta) {
    let ret = super.updateTime(delta);
    this.uniforms.u_params[0] = (this.elapsed / 100000) * this.uniforms.u_params[1];
    return ret;
  }

  /**
   * Initialize the portal particle mesh
   * @param  {AssetManager} manager AssetManager containing the remaining assets
   * @return {Boolean}              Success/failure
   */
  init(manager) {
    this.mesh = new ParticlePortalMesh(manager._gl);
    return super.init(manager);
  }
}

export default ParticlePortalDrawable;
