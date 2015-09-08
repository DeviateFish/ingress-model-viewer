import Drawable from '../drawable';

/**
 * A mesh drawable is a drawble that supports a mesh
 * (consisting of vertex attributes and faces/lines)
 * @extends {Drawable}
 */
class MeshDrawable extends Drawable {

  /**
   * Given a mesh internal name and a program internal name, construct
   * a MeshDrawable
   * @param  {String} programName Program internal name
   * @param  {String} meshName    Mesh internal Name
   */
  constructor(programName, meshName) {
    super(programName);
    this.meshName = meshName;
    this.mesh = null;
    this.drawfn = this._draw.bind(this);
  }

  /**
   * Initializes the drawable with bound resources from the given
   * manager
   * @param  {AssetManager} manager AssetManager containing bound resources
   *                                corresponding to the internal names given
   */
  init(manager) {
    if(this.meshName) {
      this.mesh = manager.getMesh(this.meshName);
      if(!this.mesh) {
        console.warn('missing mesh ' + this.meshName);
        return false;
      }
    }
    return super.init(manager);
  }

  _draw(locations, uniforms) {
    for(var i in this.uniforms)
    {
      if(this.uniforms.hasOwnProperty(i) && (i in uniforms))
      {
        uniforms[i](this.uniforms[i]);
      }
    }
    this.mesh.draw(locations);
  }
}

export default MeshDrawable;
