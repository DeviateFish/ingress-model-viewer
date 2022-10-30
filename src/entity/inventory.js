import Constants from '../constants';
import Inventory from '../drawable/inventory';
import { vec4 } from 'gl-matrix';
import Drawable from '../drawable';

const InventoryItems = {};

const simple = {
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
  Capsule: 'RARE',
  TransmuterAttack: 'RARE',
  TransmuterDefense: 'RARE',
  Mysterious: 'VERY_RARE',
  UltraLinkAmp: 'EXTREMELY_RARE',
  BoostedPowerCube: 'RARE',
  BoostedPowerCubeK: 'RARE',
  Fracker: 'VERY_RARE',
};

const inventoryItem = (shellClass, coreClass, init) => {
  class itemEntity extends Drawable {
    constructor() {
      super(null, null);
      const shell = new shellClass();
      const core = new coreClass();
      init(shell, core);
      this.addChild(shell);
      this.addChild(core);
    }
  }

  return itemEntity;
};

const simpleInventoryItem = (name, color) => {
  return inventoryItem(
    Inventory[name],
    Inventory[name + 'Xm'],
    (shell, _) => {
      shell.uniforms.u_color0 = vec4.clone(color);
    }
  );
}

for(let i in simple) {
  InventoryItems[i] = simpleInventoryItem(i, Constants.qualityColors[simple[i]]);
}

const flipCard = (shellClass, teamColor) => {
  return inventoryItem(
    shellClass,
    Inventory.FlipCardXm,
    (shell, core) => {
      shell.uniforms.u_color1 = vec4.clone(teamColor);
      shell.uniforms.u_color0 = vec4.clone(Constants.qualityColors.VERY_RARE);
      core.uniforms.u_teamColor = vec4.clone(teamColor);
    }
  );
};

InventoryItems.FlipCardAda = flipCard(Inventory.FlipCardAda, Constants.teamColors.RESISTANCE);
InventoryItems.FlipCardJarvis = flipCard(Inventory.FlipCardJarvis, Constants.teamColors.ENLIGHTENED);

const splitItem = (shellClass, coreClass) => {
  return inventoryItem(
    shellClass,
    coreClass,
    (shell, _) => {
      shell.uniforms.u_color0 = vec4.clone(Constants.qualityColors.VERY_RARE);
    }
  );
}

InventoryItems.ExtraShield = splitItem(Inventory.ExtraShield, Inventory.ResShieldXm);
InventoryItems.InterestCapsule = splitItem(Inventory.InterestCapsule, Inventory.CapsuleXm);

InventoryItems.PortalKeyResourceUnit = Inventory.PortalKeyResourceUnit;

InventoryItems.KeyCapsule = inventoryItem(
  Inventory.KeyCapsule,
  Inventory.KeyCapsuleXm,
  (shell, core) => {
    shell.uniforms.u_color0 = vec4.clone(Constants.keyCapsuleColors.blue[0]);
    shell.uniforms.u_color1 = vec4.clone(Constants.keyCapsuleColors.blue[1]);

    core.uniforms.u_teamColor = vec4.clone(Constants.xmColors.coreGlowChaotic);
    core.uniforms.u_altColor = vec4.clone(Constants.xmColors.coreGlowChaoticAlt);
  }
);

InventoryItems.MediaCube = Inventory.MediaCube;

export default InventoryItems;
