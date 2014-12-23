var ForceAmpItemEntity = (function(){

  // Defaulting to rare, since they only drop in the one quality
  var defaultQuality = new THREE.Vector4().copy(constants.qualityColors.RARE);

  var forceamp = function(loader, quality) {
    quality = quality || defaultQuality;
    LeveledXMItemEntity.call(this, loader, 'ForceAmpMesh', 'ForceAmpXmMesh', quality);
  };
  inherits(forceamp, LeveledXMItemEntity);

  return forceamp;
}());

imv.Entities = imv.Entities || {};
imv.Entities.ForceAmpItem = ForceAmpItemEntity;