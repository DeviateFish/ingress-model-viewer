import Constants from '../constants';
import BicoloredDrawable from './bicolored';
import XmDrawable from './xm';
import TexturedDrawable from './textured';

/**
 * Contains drawable primitives for many of the inventory items.
 */
var Inventory = {};


var meshes = Constants.Mesh.Inventory;
var textures = Constants.Texture;

/**
 * Creates the outer "shell" for an xm item.
 *
 * @private
 * @param  {String} name Internal name of the mesh
 * @return {itembase}    A BicoloredDrawable with the specified mesh name
 *                       and the flipcard texture
 */
function createShell(name) {
  class itembase extends BicoloredDrawable {
    constructor() {
      super(meshes[name], textures.FlipCard);
    }
  }

  return itembase;
}

/**
 * Creates the xm "core" of an item
 *
 * @private
 * @param  {String} name Internal name of the xm mesh
 * @return {xmbase}      An XmDrawable with the specified mesh name
 *                       and the Xm texture.
 */
function createCore(name) {
  class xmbase extends XmDrawable {
    constructor() {
      super(meshes[name], textures.Xm);
    }
  }

  return xmbase;
}

/**
 * Creates a media item
 *
 * @private
 * @param  {String} name Media mesh internal name
 * @return {media}       A TexturedDrawable with the Textured program,
 *                       the specified mesh, and the flipcard texture.
 */
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
