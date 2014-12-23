var ResonatorItemEntity = (function(){

  // Defaulting to a random level, because hey why not.
  var r = Math.floor(Math.random() * 8) + 1;
  var defaultQuality = new THREE.Vector4().copy(constants.qualityColors['L' + r]);

  var resonator = function(loader, quality) {
    quality = quality || defaultQuality;
    LeveledXMItemEntity.call(this, loader, 'ResonatorMesh', 'ResonatorXMMesh', quality);
  };
  inherits(resonator, LeveledXMItemEntity);

  return resonator;
}());

imv.Entities = imv.Entities || {};
imv.Entities.ResonatorItem = ResonatorItemEntity;