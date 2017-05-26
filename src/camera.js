import { mat4, vec3 } from 'gl-matrix';
import Animator from './animation/animator';

/**
 * A Camera is a class to manage view of the scene.
 */
class Camera {

  /**
   * Creates a camera
   *
   * @chainable
   * @return {this}
   */
  constructor(width, height) {
    this.position = vec3.create();
    this.view = mat4.create();
    this.project = mat4.create();
    this.viewProject = mat4.create();
    this.hFoV = Math.PI / 4;
    this.near = 0.1;
    this.far = 100;
    this.width = width;
    this.height = height;
    this.focus = vec3.create();
    this.up = vec3.fromValues(0, 1, 0);
    this.animator = new Animator();
    return this._updateProjection()._updateView();
  }

  /**
   * Generates a view matrix, as if the camera is looking at the specified point.
   *
   * @chainable
   * @param  {vec3} point   The point to look at
   * @return {this}
   */
  lookAt(point) {
    vec3.copy(this.focus, point);
    return this._updateView();
  }

  /**
   * Moves the camera's position in some direction
   *
   * Maintains the camera's current focus.
   *
   * @chainable
   * @param  {vec3} vec   The vector to translate by
   * @return {this}
   */
  translate(vec) {
    vec3.translate(this.position, this.position, vec);
    return this._updateView();
  }

  /**
   * Sets the camera's position
   *
   * @chainable
   * @param {vec3} position Camera position
   */
  setPosition(position) {
    vec3.copy(this.position, position);
    return this._updateView();
  }

  /**
   * Set the viewport dimensions and update the projection matrix
   *
   * @chainable
   * @param {Number} width  Viewport width
   * @param {Number} height Viewport height
   * @return {this}
   */
  setDimensions(width, height) {
    this.width = width;
    this.height = height;
    return this._updateProjection();
  }

  /**
   * Set the horizontal field of view
   *
   * @chainable
   * @param {Number} fov Field of view, in radians
   * @return {this}
   */
  setFieldOfView(fov) {
    this.hFoV = fov;
    return this._updateProjection();
  }

  /**
   * Sets the far clip distance
   *
   * @chainable
   * @param {Number} far Max viewable distance
   */
  setFar(far) {
    this.far = far;
    return this._updateProjection();
  }

  /**
   * Adds an animation
   *
   * @chainable
   * @param {Animation} animation The animation to be run.
   *                              This will need to be started independently, or prior to being added.
   * @return {this}
   */
  addAnimation(animation) {
    this.animator.addAnimation(animation);
    return this;
  }

  /**
   * @param  {Number}
   * @return {this}
   */
  updateTime(delta) {
    this.animator.runAnimations(delta, this);
    return this;
  }

  /**
   * Updates the camera's view matrix from all parameters.
   *
   * @chainable
   * @return {this}
   */
  _updateView() {
    mat4.lookAt(this.view, this.position, this.focus, this.up);
    return this;
  }

  /**
   * Update the camera's projection matrix
   *
   * @chainable
   * @return {this}
   */
  _updateProjection() {
    mat4.perspective(this.project, this.hFoV, this.width / this.height, this.near, this.far);
    return this;
  }
}

export default Camera;
