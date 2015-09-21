import Constants from '../constants';
import TexturedDrawable from './textured';
import { vec3 } from 'gl-matrix';

const TEXTURE = Constants.Texture.Particle;

/**
 * A ParticleDrawable represents the base class for particles
 *
 * @extends {TexturedDrawable}
 */
class ParticleDrawable extends TexturedDrawable {

  constructor(programName) {
    super(programName, null, TEXTURE);
    this.uniforms.u_cameraPos = vec3.fromValues(0, 0, 0);
  }

  updateView(viewProject, camera) {
    super.updateView(viewProject, camera);
    if(camera) {
      vec3.copy(this.uniforms.u_cameraPos, camera.position);
    }
  }
}

export default ParticleDrawable;
