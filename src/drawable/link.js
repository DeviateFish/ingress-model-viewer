import TexturedDrawable from './textured';
import { vec3, mat3, quat } from 'gl-matrix';

class LinkDrawable extends TexturedDrawable {

  constructor(programName, textureName) {
    super(programName, null, textureName);
    this.uniforms.u_cameraFwd = vec3.fromValues(0, 0, -1);
    this.uniforms.u_elapsedTime = 0;
  }

  // TODO: needs a camera class:
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

  updateTime(delta) {
    var ret = super.updateTime(delta);
    this.uniforms.u_elapsedTime = ((this.elapsed / 1000) % 300.0) * 0.1;
    return ret;
  }
}

export default LinkDrawable;
