import GLBound from './gl-bound';
import { mat4 } from 'gl-matrix';

class Renderer extends GLBound {
  constructor(gl, manager) {
    super(gl);
    this.manager = manager;
    this.viewProject = mat4.create();
    this.view = mat4.create();
    this.project = mat4.create();
    this.elapsed = 0;
  }

  updateView(view, project) {
    this.view = view;
    this.project = project;
    mat4.multiply(this.viewProject, project, view);
  }

  render() {
    console.warn("base class renders nothing.");
  }

  updateTime(delta) {
    this.elapsed += delta;
  }
}

export default Renderer;
