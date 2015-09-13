import MeshDrawable from './mesh';
import { mat4, vec3 } from 'gl-matrix';

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

  /**
   * Translate a model along some vector
   * @param  {vec3} vec   The vector
   */
  translate(vec) {
    mat4.translate(this.local, this.local, vec);
    this.updateMatrix();
  }

  /**
   * Scale a model by some vector
   * @param  {vec3} vec   The vector
   */
  scale(vec) {
    mat4.scale(this.local, this.local, vec);
    this.updateMatrix();
  }

  /**
   * Rotate a model with a quaternion
   * @param  {quat} quat   The quaternion
   */
  rotateQuat(quat) {
    var quatMatrix = mat4.create();
    mat4.fromQuat(quatMatrix, quat);
    mat4.multiply(this.local, this.local, quatMatrix);
    this.updateMatrix();
  }

  /**
   * Translate the model along the X axis
   * @param  {float} dist  Distance to translate
   */
  translateX(dist) {
    this.translate(vec3.fromValues(dist, 0, 0));
  }

  /**
   * Translate the model along the Y axis
   * @param  {float} dist  Distance to translate
   */
  translateY(dist) {
    this.translate(vec3.fromValues(0, dist, 0));
  }

  /**
   * Translate the model along the Z axis
   * @param  {float} dist  Distance to translate
   */
  translateZ(dist) {
    this.translate(vec3.fromValues(0, 0, dist));
  }

  /**
   * Scale all dimensions by the same value
   * @param  {Number} f The amount to scale
   */
  scalarScale(f) {
    this.scale(vec3.fromValues(f, f, f));
  }
}

export default ModelDrawable;
