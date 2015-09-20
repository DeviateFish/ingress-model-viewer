import MeshDrawable from './mesh';
import { mat4, vec3, quat } from 'gl-matrix';

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
    this._position = vec3.create();
    this._rotation = quat.create();
    this._scale = vec3.fromValues(1, 1, 1);
    this._model = mat4.create();
    this.local = mat4.create();
    this.world = mat4.create();
    this.uniforms.u_modelViewProject = mat4.create();
  }

  /**
   * Update the internal u_modelViewProject uniform
   * by applying world and local transforms to the model
   * matrix
   */
  updateMatrix() {
    mat4.fromRotationTranslation(this.local, this._rotation, this._position);
    mat4.scale(this.local, this.local, this._scale);
    mat4.multiply(this._model, this.world, this.local);
    mat4.multiply(this.uniforms.u_modelViewProject, this.viewProject, this._model);
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
    this._model = mat;
    this.updateMatrix();
  }

  /**
   * Translate a model along some vector
   * @param  {vec3} vec   The vector
   */
  translate(vec) {
    vec3.add(this._position, this._position, vec);
    this.updateMatrix();
  }

  /**
   * Scale a model by some vector
   * @param  {vec3} vec   The vector
   */
  scale(vec) {
    vec3.add(this._scale, this._scale, vec);
    this.updateMatrix();
  }

  /**
   * Sets the scale of the local transform
   * @param {vec3} vec The scale to set to.
   */
  setScale(vec) {
    vec3.copy(this._scale, vec);
    this.updateMatrix();
  }

  /**
   * Rotate a model with a quaternion
   * @param  {quat} quat   The quaternion
   */
  rotateQuat(quat) {
    quat.add(this._rotation, this._rotation, quat);
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
   * @param  {Number} f The amount to _scale
   */
  scalarScale(f) {
    this.scale(vec3.fromValues(f, f, f));
  }

  /**
   * Sets the local scale to some scalar value (for x, y, and z)
   * @param {Number} f Amount to set the scale to.
   */
  setScalarScale(f) {
    this.setScale(vec3.fromValues(f, f, f));
  }
}

export default ModelDrawable;
