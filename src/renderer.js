import GLBound from './gl-bound';
import { mat4 } from 'gl-matrix';

/**
 * ... In retrospect, I'm not sure exactly the purpose this class serves
 * It seems that ObjectRenderer inherits from this class, but it's also
 * the only renderer that's currently used.
 * TODO: Revisit this
 *
 * @class
 * @extends {GLBound}
 * @param  {context} gl           A WebGL context
 * @param  {AssetManager} manager An AssetManager to manage GL-bound
 */
class Renderer extends GLBound {

  constructor(gl, manager) {
    super(gl);
    this.manager = manager;
    this.viewProject = mat4.create();
    this.view = mat4.create();
    this.project = mat4.create();
    this.elapsed = 0;
  }

  /**
   * Update the internal view and projection matrices
   *
   * @param  {Camera} camera    The camera
   * @return {void}
   */
  updateView(camera) {
    this.view = camera.view;
    this.project = camera.project;
    mat4.multiply(this.viewProject, this.project, this.view);
  }

  /**
   * Actually controls the render loop?
   *
   * @abstract
   * @return {void}
   */
  render() {
    throw new Error('render() must be implemented');
  }

  /**
   * Updates the internal counter of elapsed time.
   *
   * @param  {Number} delta Time elapsed since last render call
   * @return {void}
   */
  updateTime(delta) {
    this.elapsed += delta;
  }
}

export default Renderer;
