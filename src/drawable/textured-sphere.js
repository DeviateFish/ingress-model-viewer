import Constants from '../constants';
import TexturedDrawable from './textured';
import SphereMesh from '../mesh/sphere';

const PROGRAM = Constants.Program.Textured;

class TexturedSphereDrawable extends TexturedDrawable {
  constructor(textureName, radius, vSlices, hSlices) {
    super(PROGRAM, null, textureName);
    this.radius = radius;
    this.vSlices = vSlices;
    this.hSlices = hSlices;
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

export default TexturedSphereDrawable;
