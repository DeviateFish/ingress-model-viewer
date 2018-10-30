import Drawable from './drawable';
import Constants from './constants';


export const INVENTORY = {
  xmp: 'INVENTORY_XMP_SHELL',
  xmpCore: 'INVENTORY_XMP_CORE',
}


export const OBJECTS = {
  [INVENTORY.xmp]: {
    constructor: Drawable,
    program: Constants.Program.Bicolored,
    mesh: Constants.Mesh.Inventory.Xmp,
    texture: Constants.Texture.FlipCard
  },
  [INVENTORY.xmpCore]: {
    constructor: Drawable,
    program: Constants.Program.Xm,
    mesh: Constants.Mesh.Inventory.XmpXm,
    texture: Constants.Texture.Xm
  }
}


class Factory {
  constructor(gl, assetManager) {
    this.gl = gl;
    this.loader = loader;
  }

  create(internalName) {
    if (!OBJECTS.hasOwnProperty(internalName)) {
      throw new Error('Unknown internal name ' + internalName);
    }
    return this.loader.
  }
}
