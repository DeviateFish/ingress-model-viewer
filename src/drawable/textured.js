import Drawable from '../drawable';

/**
 * A TexturedDrawable is a Drawable with a specific texture
 */
class TexturedDrawable extends Drawable {

  /**
   * Construct a textured drawable, given a program, mesh, and texture
   * @param  {String} programName Program internal name
   * @param  {String} meshName    Mesh internal name
   * @param  {String} textureName Texture internal name
   */
  constructor(programName, meshName, textureName) {
    super(programName, meshName);
    this.textureName = textureName;
    this.texture = null;
  }

  /**
   * Draw the textured object
   */
  draw() {
    if(this.ready) {
      this.texture.use(0);
      this.uniforms.u_texture = 0;
      super.draw();
    }
  }

  _loadAssets(manager) {
    let promises = super._loadAssets(manager);
    promises.push(
      manager.loadTexture(this.textureName).then((texture) => {
        this.texture = texture;
      }).catch((err) => {
        console.warn('missing texture ' + this.textureName);
        throw err;
      })
    );
    return promises;
  }
}

export default TexturedDrawable;
