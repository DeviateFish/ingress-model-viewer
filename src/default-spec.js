imv.Primitives = imv.Primitives || {};

// inventory items:
imv.Primitives.Inventory = imv.Primitives.Inventory || {};
imv.Primitives.Artifact = imv.Primitives.Artifact || {};
imv.Primitives.Resource = imv.Primitives.Resource || {};
imv.Entities = imv.Entities || {};

(function() {
  var createInventoryItem = function(name, itemMesh, coreMesh) {
    var item = new DrawableSpec('FlipCardTexture', 'bicolor_textured', itemMesh, BicoloredDrawable);
    var core = new DrawableSpec('ObjectXMTexture', 'xm', coreMesh, XmDrawable);
    imv.Primitives.Inventory[name] = item;
    imv.Primitives.Inventory[name + 'Core'] = core;
    imv.Entities[name] = Entity([item, core]);
  };

  var createResourceUnit = function(name) {
    imv.Primitives.Resource[name] =
      new DrawableSpec('FlipCardTexture', 'bicolor_textured', name + 'ResourceUnitMesh', BicoloredDrawable);
  };

  var createArtifact = function(series, index, frozen) {
    var suffix = frozen ? 'Frozen' : '';
    var name = series + suffix + index;
    imv.Primitives.Artifact[name] =
      new DrawableSpec('Artifact' + series + 'Texture', 'textured', name, TexturedDrawable);
  };

  var createSimple = function(name, caps) {
    createInventoryItem(name, name + 'Mesh', name + 'X' + (caps ? 'M' : 'm') + 'Mesh');
  };

  // inventory items:
  createSimple('Xmp', true);
  createSimple('Resonator', true);
  createSimple('Ultrastrike', true);
  createSimple('ResShield', true);
  createSimple('PowerCube', false);
  createSimple('LinkAmp', false);
  createSimple('HeatSink', false);
  createSimple('MultiHack', false);
  createSimple('ForceAmp', false);
  createSimple('Turret', false);
  createSimple('Capsule', false);
  createSimple('ExtraShield', true);
  createInventoryItem('FlipCardAda', 'FlipCardMeshAda', 'FlipCardXmMesh');
  createInventoryItem('FlipCardJarvis', 'FlipCardMeshJarvis', 'FlipCardXmMesh');

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



}());