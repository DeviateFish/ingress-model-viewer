import Constants from '../constants';
import BicoloredDrawable from './bicolored';
import XmDrawable from './xm';
import TexturedDrawable from './textured';


/**
 * This file constructs the drawable primitives for many of the inventory items.
 */

var Inventory = {};
var meshes = Constants.Mesh.Inventory;
var textures = Constants.Texture;

function createShell(name) {
  class itembase extends BicoloredDrawable {
    constructor() {
      super(meshes[name], textures.FlipCard);
    }
  }

  return itembase;
}

function createCore(name) {
  class xmbase extends XmDrawable {
    constructor() {
      super(meshes[name], textures.Xm);
    }
  }

  return xmbase;
}

function createMedia(name) {
  class media extends TexturedDrawable {
    constructor() {
      super(
        Constants.Program.Textured,
        meshes[name],
        Constants.Texture.FlipCard
      );
    }
  }

  return media;
}

for(var i in meshes) {
  if(/^Media/.test(i)) {
    if(i === 'MediaPlane') {
      continue;
    }
    Inventory[i] = createMedia(i);
  }
  else {
    if(/Xm$/.test(i)) {
      Inventory[i] = createCore(i);
    }
    else {
      Inventory[i] = createShell(i);
    }
  }
}

export default Inventory;
