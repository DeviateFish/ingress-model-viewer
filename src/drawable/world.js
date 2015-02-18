(function() {
  var meshes = imv.Constants.Mesh.World;
  var textures = imv.Constants.Texture;

  imv.Drawables = imv.Drawables || {};
  imv.Drawables.World = imv.Drawables.World || {};

  var portal = function() {
    GlowrampDrawable.call(this, meshes.Portal, textures.Glowramp);
  };
  inherits(portal, GlowrampDrawable);

  imv.Drawables.World.Portal = portal;

  var shieldEffect = function() {
    ShieldEffectDrawable.call(this, meshes.Shield, textures.ShieldEffect);
  };
  inherits(shieldEffect, ShieldEffectDrawable);

  imv.Drawables.World.Shield = shieldEffect;

  var waypoint = function() {
    GlowrampDrawable.call(this, meshes.Waypoint, textures.Waypoint);
  };
  inherits(waypoint, GlowrampDrawable);

  imv.Drawables.World.Waypoint = waypoint;

  var resonator = function() {
    BicoloredDrawable.call(this, meshes.Resonator, textures.FlipCard);
  };
  inherits(resonator, BicoloredDrawable);

  imv.Drawables.World.Resonator = resonator;

  var artifactsRedGlow = function() {
    GlowrampDrawable.call(this, meshes.ArtifactsRedGlow, textures.ColorGlow);
  };
  inherits(artifactsRedGlow, GlowrampDrawable);

  imv.Drawables.World.ArtifactsRedGlow = artifactsRedGlow;

  var artifactsGreenGlow = function() {
    GlowrampDrawable.call(this, meshes.ArtifactsGreenGlow, textures.ColorGlow);
  };
  inherits(artifactsGreenGlow, GlowrampDrawable);

  imv.Drawables.World.ArtifactsGreenGlow = artifactsGreenGlow;

  var artifactsPurpleGlow = function() {
    GlowrampDrawable.call(this, meshes.ArtifactsPurpleGlow, textures.ColorGlow);
  };
  inherits(artifactsPurpleGlow, GlowrampDrawable);

  imv.Drawables.World.ArtifactsPurpleGlow = artifactsPurpleGlow;

  var artifactsTargetGlow = function() {
    GlowrampDrawable.call(this, meshes.ArtifactsTargetGlow, textures.TargetGlow);
  };
  inherits(artifactsTargetGlow, GlowrampDrawable);

  imv.Drawables.World.ArtifactsTargetGlow = artifactsTargetGlow;
}());