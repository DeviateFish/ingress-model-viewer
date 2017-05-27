import Drawable from '../drawable';

/**
 * A TexturedDrawable is a Drawable with a specific texture
 *
 * @param  {String} programName Program internal name
 * @param  {String} meshName    Mesh internal name
 * @param  {String} textureName Texture internal name
 */
class TexturedDrawable extends Drawable {
  constructor(programName, meshName, textureName) {
    super(programName, meshName);
    this.textureName = textureName;
    this.texture = null;
  }

  /**
   * Draw the textured object
   *
   * @return {void}
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
        console.warn('missing texture ' + this.textureName); // eslint-disable-line no-console
        return Promise.reject(err);
      })
    );
    return promises;
  }
}

export default TexturedDrawable;
