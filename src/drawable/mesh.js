import Drawable from '../drawable';

function _draw(locations, uniforms)
{
  for(var i in this.uniforms)
  {
    if(this.uniforms.hasOwnProperty(i) && (i in uniforms))
    {
      uniforms[i](this.uniforms[i]);
    }
  }
  this.mesh.draw(locations);
}

class MeshDrawable extends Drawable {

  constructor(programName, meshName) {
    super(programName);
    this.meshName = meshName;
    this.mesh = null;
    this.drawfn = _draw.bind(this);
  }

  init(manager)
  {
    if(this.meshName) {
      this.mesh = manager.getMesh(this.meshName);
      if(!this.mesh) {
        console.warn('missing mesh ' + this.meshName);
        return false;
      }
    }
    return super.init(manager);
  }
}

export default MeshDrawable;
