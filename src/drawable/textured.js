import Drawable from '../drawable';

/**
 * A TexturedDrawable is a Drawable with a specific texture
 *
 * @param  {Program} program   Bound WebGL Program
 * @param  {Mesh}    mesh      Bound mesh
 */
class TexturedDrawable extends Drawable {
  constructor(program, mesh, texture) {
    super(program, mesh);
  }

  /**
   * Draw the textured object
   *
   * @return {void}
   */
  draw() {
    super.draw();
  }
}

export default TexturedDrawable;
