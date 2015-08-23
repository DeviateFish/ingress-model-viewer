import Constants from '../constants';
import GlowrampDrawable from './glowramp';
import BicoloredDrawable from './bicolored';

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

World.Portal = makeGlowramp(meshes.Portal, textures.Glowramp);
World.Waypoint = makeGlowramp(meshes.Waypoint, textures.Waypoint);
World.ArtifactsRedGlow = makeGlowramp(meshes.ArtifactsRedGlow, textures.ColorGlow);
World.ArtifactsGreenGlow = makeGlowramp(meshes.ArtifactsGreenGlow, textures.ColorGlow);
World.ArtifactsPurpleGlow = makeGlowramp(meshes.ArtifactsPurpleGlow, textures.ColorGlow);
World.ArtifactsTargetGlow = makeGlowramp(meshes.ArtifactsTargetGlow, textures.TargetGlow);

World.Shield = makeBicolored(meshes.Shield, textures.ShieldEffect);
World.Resonator = makeBicolored(meshes.Resonator, textures.FlipCard);

export default World;
