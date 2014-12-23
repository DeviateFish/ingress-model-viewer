var HeatSinkItemEntity = (function(){

  // Defaulting to VR, because everyone likes VR.
  var defaultQuality = new THREE.Vector4().copy(constants.qualityColors.VERY_RARE);

  var heatsink = function(loader, quality) {
    quality = quality || defaultQuality;
    LeveledXMItemEntity.call(this, loader, 'HeatSinkMesh', 'HeatSinkXmMesh', quality);
  };
  inherits(heatsink, LeveledXMItemEntity);

  return heatsink;
}());

imv.Entities = imv.Entities || {};
imv.Entities.HeatSinkItem = HeatSinkItemEntity;