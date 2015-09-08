import MeshDrawable from './mesh';
import { mat4 } from 'gl-matrix';

/**
 * A ModelDrawable is a MeshDrawable that supports local
 * and world transforms, ultimately providing a `u_modelViewProject`
 * uniform to the shader.
 */
class ModelDrawable extends MeshDrawable {

  /**
   * Given a program and mesh, construct a ModelDrawble
   * @param  {String} programName Program internal name
   * @param  {String} meshName    Mesh internal name
   */
  constructor(programName, meshName) {
    super(programName, meshName);
    this.viewProject = mat4.create();
    this.model = mat4.create();
    this.local = mat4.create();
    this.world = mat4.create();
  }

  /**
   * Update the internal u_modelViewProject uniform
   * by applying world and local transforms to the model
   * matrix
   */
  updateMatrix() {
    var mvp = mat4.create();
    mat4.multiply(this.model, this.world, this.local);
    mat4.multiply(mvp, this.viewProject, this.model);
    this.uniforms.u_modelViewProject = mvp;
  }

  /**
   * Update the internal viewProject matrix (projection * view matrices)
   * @param  {mat4} viewProject Projection matrix multiplied by view matrix
   */
  updateView(viewProject) {
    this.viewProject = viewProject;
    this.updateMatrix();
  }

  /**
   * Sets the model transform to a given matrix
   * @param {mat4} mat Matrix to use
   */
  setMatrix(mat) {
    this.model = mat;
    this.updateMatrix();
  }
}

export default ModelDrawable;
