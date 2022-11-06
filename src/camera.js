import { mat4, vec3 } from 'gl-matrix';
import Animator from './animation/animator';

/**
 * A Camera is a class to manage view of the scene.
 *
 * @class
 * @chainable
 * @param {Number} width  The width of the viewport
 * @param {Number} height The height of the viewport
 * @return {this} The new Camera
 */
class Camera {

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
   * @return {this} Returns `this`
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
   * @return {this} Returns `this`
   */
  translate(vec) {
    vec3.add(this.position, this.position, vec);
    return this._updateView();
  }

  /**
   * Sets the camera's position
   *
   * @chainable
   * @param {vec3} position Camera position
   * @return {this} Returns `this`
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
   * @return {this} Returns `this`
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
   * @return {this} Returns `this`
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
   * @return {this} Returns `this`
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
   * @return {this} Returns `this`
   */
  addAnimation(animation) {
    this.animator.addAnimation(animation);
    return this;
  }

  /**
   * @param {Number} delta The time elapsed since the last draw
   * @return {this} Returns `this`
   */
  updateTime(delta) {
    this.animator.runAnimations(delta, this);
    return this;
  }

  /**
   * Updates the camera's view matrix from all parameters.
   *
   * @chainable
   * @private
   * @return {this} Returns `this`
   */
  _updateView() {
    mat4.lookAt(this.view, this.position, this.focus, this.up);
    return this;
  }

  /**
   * Update the camera's projection matrix
   *
   * @chainable
   * @private
   * @return {this} Returns `this`
   */
  _updateProjection() {
    mat4.perspective(this.project, this.hFoV, this.width / this.height, this.near, this.far);
    return this;
  }
}

export default Camera;
