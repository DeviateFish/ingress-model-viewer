import ModelDrawable from './model';

class TexturedDrawable extends ModelDrawable {
  constructor(programName, meshName, textureName) {
    super(programName, meshName);
    this.textureName = textureName;
    this.texture = null;
  }

  draw() {
    this.texture.use(0);
    this.uniforms.u_texture = 0;
    super.draw();
  }

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
