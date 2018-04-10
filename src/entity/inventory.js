import Constants from '../constants';
import Entity from '../entity';
import Inventory from '../drawable/inventory';
import { vec4 } from 'gl-matrix';

// TODO: Deprecate in favor of a proper scene graph
var InventoryItems = {};

var simple = {
  Xmp: 'L8',
  Ultrastrike: 'L8',
  ResShield: 'VERY_RARE',
  PowerCube: 'L8',
  LinkAmp: 'EXTREMELY_RARE',
  HeatSink: 'VERY_RARE',
  MultiHack: 'VERY_RARE',
  ForceAmp: 'RARE',
  Turret: 'RARE',
  Resonator: 'L8',
  Capsule: 'RARE'
};

export function createItemEntity(name, color) {

  class entitybase extends Entity {
    constructor(engine) {
      super(engine);
      this.addDrawable(name, new Inventory[name]());
      this.addDrawable(name + 'Xm', new Inventory[name + 'Xm']());
      this.drawables[name].uniforms.u_color0 = vec4.clone(color);
    }
  }

  return entitybase;
}

for(var i in simple) {
  InventoryItems[i] = createItemEntity(i, Constants.qualityColors[simple[i]]);
}

class FlipCardAda extends Entity {
  constructor(engine) {
    super(engine);
    this.addDrawable('FlipCardAda', new Inventory.FlipCardAda());
    this.addDrawable('FlipCardXm', new Inventory.FlipCardXm());
    this.drawables.FlipCardXm.uniforms.u_teamColor = vec4.clone(Constants.teamColors.RESISTANCE);
    this.drawables.FlipCardAda.uniforms.u_color1 = vec4.clone(Constants.teamColors.RESISTANCE);
    this.drawables.FlipCardAda.uniforms.u_color0 = vec4.clone(Constants.qualityColors.VERY_RARE);
  }
}

InventoryItems.FlipCardAda = FlipCardAda;

class FlipCardJarvis extends Entity {
  constructor(engine) {
    super(engine);
    this.addDrawable('FlipCardJarvis', new Inventory.FlipCardJarvis());
    this.addDrawable('FlipCardXm', new Inventory.FlipCardXm());
    this.drawables.FlipCardXm.uniforms.u_teamColor = vec4.clone(Constants.teamColors.ENLIGHTENED);
    this.drawables.FlipCardJarvis.uniforms.u_color1 = vec4.clone(Constants.teamColors.ENLIGHTENED);
    this.drawables.FlipCardJarvis.uniforms.u_color0 = vec4.clone(Constants.qualityColors.VERY_RARE);
  }
}

InventoryItems.FlipCardJarvis = FlipCardJarvis;

class ExtraShield extends Entity {
  constructor(engine) {
    super(engine);
    this.addDrawable('ExtraShield', new Inventory.ExtraShield());
    this.addDrawable('ResShieldXm', new Inventory.ResShieldXm());
    this.drawables.ExtraShield.uniforms.u_color0 = vec4.clone(Constants.qualityColors.VERY_RARE);
  }
}

InventoryItems.ExtraShield = ExtraShield;

class InterestCapsule extends Entity {
  constructor(engine) {
    super(engine);
    this.addDrawable('InterestCapsule', new Inventory.InterestCapsule());
    this.addDrawable('CapsuleXm', new Inventory.CapsuleXm());
    this.drawables.InterestCapsule.uniforms.u_color0 = vec4.clone(Constants.qualityColors.VERY_RARE);
  }
}

InventoryItems.InterestCapsule = InterestCapsule;

class PortalKeyResourceUnit extends Entity {
  constructor(engine){
    super(engine);
    this.addDrawable('PortalKey', new Inventory.PortalKeyResourceUnit());
  }
}

InventoryItems.PortalKeyResourceUnit = PortalKeyResourceUnit;

class KeyCapsule extends Entity {
  constructor(engine) {
    super(engine);
    this.addDrawable('KeyCapsule', new Inventory.KeyCapsule());
    this.addDrawable('KeyCapsuleXm', new Inventory.KeyCapsuleXm());
    this.drawables.KeyCapsule.uniforms.u_color0 = vec4.clone(Constants.keyCapsuleColors.blue[0]);
    this.drawables.KeyCapsule.uniforms.u_color1 = vec4.clone(Constants.keyCapsuleColors.blue[1]);
    this.drawables.KeyCapsuleXm.uniforms.u_teamColor = vec4.clone(Constants.xmColors.coreGlowChaotic);
    this.drawables.KeyCapsuleXm.uniforms.u_altColor = vec4.clone(Constants.xmColors.coreGlowChaoticAlt);
  }
}

InventoryItems.KeyCapsule = KeyCapsule;

export default InventoryItems;
