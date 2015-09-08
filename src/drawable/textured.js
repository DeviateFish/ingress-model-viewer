import ModelDrawable from './model';

/**
 * A TexturedDrawable is a ModelDrawable with a specific texture
 */
class TexturedDrawable extends ModelDrawable {

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
    this.texture.use(0);
    this.uniforms.u_texture = 0;
    super.draw();
  }

  /**
   * Initialize the texture, then initialize other resources
   * @param  {AssetManager} manager AssetManager containing the texture and other resources
   * @return {Boolean}              Success/failure
   */
  init(manager) {
    if(this.textureName) {
      this.texture = manager.getTexture(this.textureName);
      if(!this.texture) {
        console.warn('missing texture ' + this.textureName);
        return false;
      }
    }
    return super.init(manager);
  }
}

export default TexturedDrawable;
