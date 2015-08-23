import Constants from '../constants';
import ModelDrawable from './model';
import SphereMesh from '../mesh/sphere';
import { mat3, mat4 } from 'gl-matrix';

const PROGRAM = Constants.Program.Atmosphere;

// this program (atmosphere.glsl.vert and atmosphere.glsl.frag)
// is a modified version of the atmosphere program in
// https://github.com/dataarts/webgl-globe/blob/master/globe/globe.js
class AtmosphereDrawable extends ModelDrawable {
  constructor(radius, vSlices, hSlices, scaleFactor) {
    super(PROGRAM, null);
    this.radius = radius;
    this.vSlices = vSlices;
    this.hSlices = hSlices;
    this.uniforms.u_normalMatrix = mat3.create();
    this.scaleFactor = scaleFactor || 1.1;
    mat4.scale(this.local, this.local, [this.scaleFactor, this.scaleFactor, this.scaleFactor]);
  }

  updateView(viewProject) {
    super.updateView(viewProject);
     var invert = mat4.invert(mat4.create(), viewProject),
         transpose = mat4.transpose(mat4.create(), invert);
    this.uniforms.u_normalMatrix = mat3.fromMat4(mat3.create(), transpose);
  }

  init(manager) {
    this.mesh = new SphereMesh(
      manager._gl,
      this.radius,
      this.vSlices,
      this.hSlices
    );
    return super.init(manager);
  }
}

export default AtmosphereDrawable;
