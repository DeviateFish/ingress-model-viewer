import Constants from '../constants';
import GlowrampDrawable from './glowramp';
import BicoloredDrawable from './bicolored';
import ShieldEffect from './shield-effect';

/**
 * Various world drawables
 *
 * Includes Portal, ShieldEffect, waypoints, resonators, and artifact glows
 * @type {Object}
 */
var World = {};
var meshes = Constants.Mesh.World;
var textures = Constants.Texture;

function makeGlowramp(mesh, texture) {
  class glowrampbase extends GlowrampDrawable {
    constructor() {
      super(mesh, texture);
    }
  }

  return glowrampbase;
}

function makeBicolored(mesh, texture) {
  class bicoloredbase extends BicoloredDrawable {
    constructor() {
      super(mesh, texture);
    }
  }

  return bicoloredbase;
}

function makeShieldEffect(mesh, texture) {
  class shieldeffectbase extends ShieldEffect {
    constructor() {
      super(mesh, texture);
    }
  }

  return shieldeffectbase;
}

World.Portal = makeGlowramp(meshes.Portal, textures.Glowramp);
World.Waypoint = makeGlowramp(meshes.Waypoint, textures.Waypoint);
World.ArtifactsRedGlow = makeGlowramp(meshes.ArtifactsRedGlow, textures.ColorGlow);
World.ArtifactsGreenGlow = makeGlowramp(meshes.ArtifactsGreenGlow, textures.ColorGlow);
World.ArtifactsPurpleGlow = makeGlowramp(meshes.ArtifactsPurpleGlow, textures.ColorGlow);
World.ArtifactsTargetGlow = makeGlowramp(meshes.ArtifactsTargetGlow, textures.TargetGlow);

World.Shield = makeShieldEffect(meshes.Shield, textures.ShieldEffect);
World.Resonator = makeBicolored(meshes.Resonator, textures.FlipCard);

export default World;
