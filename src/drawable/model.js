import MeshDrawable from './mesh';
import { mat4 } from 'gl-matrix';

class ModelDrawable extends MeshDrawable {

  constructor(programName, meshName) {
    super(programName, meshName);
    this.viewProject = mat4.create();
    this.model = mat4.create();
    this.local = mat4.create();
    this.world = mat4.create();
  }

  updateMatrix() {
    var mvp = mat4.create();
    mat4.multiply(this.model, this.world, this.local);
    mat4.multiply(mvp, this.viewProject, this.model);
    this.uniforms.u_modelViewProject = mvp;
  }

  updateView(viewProject) {
    this.viewProject = viewProject;
    this.updateMatrix();
  }

  setMatrix(mat) {
    this.model = mat;
    this.updateMatrix();
  }
}

export default ModelDrawable;
