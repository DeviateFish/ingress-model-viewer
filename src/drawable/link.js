import TexturedDrawable from './textured';
import { vec3, mat3, quat } from 'gl-matrix';

/**
 * The LinkDrawable represents the base class for link-type drawables.
 */
class LinkDrawable extends TexturedDrawable {

  /**
   * Constructs a link drawable witth the given program and texture.
   * @param  {String} programName Internal name of the program to use
   * @param  {String} textureName Internal name of the texture to use
   */
  constructor(programName, textureName) {
    super(programName, null, textureName);
    this.uniforms.u_cameraFwd = vec3.fromValues(0, 0, -1);
    this.uniforms.u_elapsedTime = 0;
  }

  /**
   * Updates the camera transforms for the link drawables
   * @param  {mat4} viewProject Combined view and project matrix
   * @param  {mat4} view        View Matrix
   * @param  {mat4} project     Projection matrix
   * @return {void}
   */
  updateView(viewProject, view, project) {
    super.updateView(viewProject, view, project);
    if(view) {
      var rot = mat3.fromMat4(mat3.create(), view);
      var q = quat.fromMat3(quat.create(), rot);
      var fwd = vec3.transformQuat(vec3.create(), vec3.fromValues(0, 0, -1), q);
      vec3.normalize(fwd, fwd);
      this.uniforms.u_cameraFwd = fwd;
    }
  }

  /**
   * Updates default periodic uniforms for links
   * @param  {Number} delta Time delta since last draw
   * @return {Boolean}      @see src/drawable.js#updateTime
   */
  updateTime(delta) {
    var ret = super.updateTime(delta);
    this.uniforms.u_elapsedTime = ((this.elapsed / 1000) % 300.0) * 0.1;
    return ret;
  }
}

export default LinkDrawable;
