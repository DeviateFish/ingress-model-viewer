
var presets = {};
presets.Primitives = {};

// inventory items:
presets.Primitives.Artifact = presets.Primitives.Artifact || {};
presets.Primitives.Resource = presets.Primitives.Resource || {};
presets.Primitives.Inventory = presets.Primitives.Inventory || {};
presets.Primitives.World = presets.Primitives.World || {};
presets.Entities = presets.Entities || {};
presets.Entities.Inventory = {};
presets.Entities.Resource = {};
presets.Entities.Artifact = {};
presets.Entities.World = {};

(function() {
  var defaultCoreColor = imv.Constants.xmColors.coreGlow,
    defaultQualityColor = imv.Constants.qualityColors.RARE;
  var createInventoryItem = function(name, itemMesh, coreMesh, defaultQuality, defaultCore) {
    var item = new DrawableSpec('FlipCardTexture', 'bicolor_textured', itemMesh, BicoloredDrawable);
    var core = new DrawableSpec('ObjectXMTexture', 'xm', coreMesh, XmDrawable);
    presets.Primitives.Inventory[name] = item;
    presets.Primitives.Inventory[name + 'Core'] = core;
    defaultQuality = defaultQuality || defaultQualityColor;
    defaultCore = defaultCore || defaultCoreColor;
    presets.Entities.Inventory[name] = InventoryItemEntity(item, core, defaultQuality, defaultCore);
  };

  var createResourceUnit = function(name) {
    var spec = new DrawableSpec('FlipCardTexture', 'bicolor_textured', name + 'ResourceUnitMesh', BicoloredDrawable);
    presets.Primitives.Resource[name] = spec;
    presets.Entities.Resource[name] = Entity([spec]);
  };

  var createArtifact = function(series, index, frozen) {
    var suffix = frozen ? 'Frozen' : '';
    var name = series + suffix + index;
    var spec = new DrawableSpec('Artifact' + series + 'Texture', 'textured', name, TexturedDrawable);
    presets.Primitives.Artifact[name] = spec;
    presets.Entities.Artifact[name] = Entity([spec]);
  };

  var createSimple = function(name, caps, defaultColor) {
    createInventoryItem(name, name + 'Mesh', name + 'X' + (caps ? 'M' : 'm') + 'Mesh', defaultColor);
  };

  // inventory items:
  createSimple('Xmp', true, imv.Constants.qualityColors.L8);
  createSimple('Resonator', true, imv.Constants.qualityColors.L8);
  createSimple('Ultrastrike', true, imv.Constants.qualityColors.L8);
  createSimple('ResShield', true, imv.Constants.qualityColors.VERY_RARE);
  createSimple('PowerCube', false, imv.Constants.qualityColors.L8);
  createSimple('LinkAmp', false, imv.Constants.qualityColors.EXTREMELY_RARE);
  createSimple('HeatSink', false, imv.Constants.qualityColors.VERY_RARE);
  createSimple('MultiHack', false, imv.Constants.qualityColors.VERY_RARE);
  createSimple('ForceAmp', false, imv.Constants.qualityColors.RARE);
  createSimple('Turret', false, imv.Constants.qualityColors.RARE);
  createSimple('Capsule', false);
  createSimple('ExtraShield', true, imv.Constants.qualityColors.VERY_RARE);
  createInventoryItem(
    'FlipCardAda', 'FlipCardMeshAda', 'FlipCardXmMesh',
    imv.Constants.qualityColors.VERY_RARE, imv.Constants.xmColors.coreGlowAda);
  createInventoryItem(
    'FlipCardJarvis', 'FlipCardMeshJarvis', 'FlipCardXmMesh',
    imv.Constants.qualityColors.VERY_RARE, imv.Constants.xmColors.coreGlowJarvis);

  // resource units:
  createResourceUnit('Xmp');
  createResourceUnit('Resonator');
  createResourceUnit('Ultrastrike');
  createResourceUnit('PortalShield');
  createResourceUnit('PowerCube');
  createResourceUnit('LinkAmp');
  createResourceUnit('HeatSink');
  createResourceUnit('MultiHack');
  createResourceUnit('ForceAmp');
  createResourceUnit('Turret');
  createResourceUnit('Capsule');
  createResourceUnit('ExtraShield');

  // artifacts:
  var series = {
    'Jarvis': 13,
    'Amar': 17,
    'Helios': 40
  };
  for(var i in series)
  {
    for(var j = 0; j < series[i]; j++)
    {
      createArtifact(i, j + 1, false);
      if(i !== 'Jarvis') {
        createArtifact(i, j + 1, true);
      }
    }
  }

  var shield = new DrawableSpec('PortalShieldTexture', 'shield', 'PortalShieldMesh', ShieldEffectDrawable);
  var portal = new DrawableSpec('GlowrampTexture', 'portal_scanner', 'TexturedPortalMesh', GlowrampDrawable);
  presets.Primitives.World.Portal = portal;
  presets.Primitives.World.ShieldEffect = shield;
  presets.Entities.World.Portal = PortalEntity(portal, shield);

}());

imv.Presets = presets;