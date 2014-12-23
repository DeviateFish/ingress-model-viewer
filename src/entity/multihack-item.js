var MultiHackItemEntity = (function(){

  // Defaulting to VR, because everyone likes VR.
  var defaultQuality = new THREE.Vector4().copy(constants.qualityColors.VERY_RARE);

  var multihack = function(loader, quality) {
    quality = quality || defaultQuality;
    LeveledXMItemEntity.call(this, loader, 'MultiHackMesh', 'MultiHackXmMesh', quality);
  };
  inherits(multihack, LeveledXMItemEntity);

  return multihack;
}());

imv.Entities = imv.Entities || {};
imv.Entities.MultiHackItem = MultiHackItemEntity;