import Constants from '../constants';
import BicoloredDrawable from './bicolored';

var Resource = {};
var meshes = Constants.Mesh.Resource;

/**
 * Creates a resource drawable
 * @param  {String} name InternalName
 * @return {itembase}    A BicoloredDrawable representing this resource item
 */
function createResource(name) {
  class itembase extends BicoloredDrawable {
    constructor() {
      super(meshes[name], Constants.Texture.FlipCard);
    }
  }

  return itembase;
}

for(var i in meshes) {
  Resource[name] = createResource(i);
}

export default Resource;
