var ExtraShieldItemEntity = (function(){

  // Default quality to very rare
  // They only seem to drop in VR rarieties, anyway.
  var defaultQuality = new THREE.Vector4().copy(constants.qualityColors.VERY_RARE);

  var extrashield = function(loader, quality) {
    quality = quality || defaultQuality;
    LeveledXMItemEntity.call(this, loader, 'ExtraShieldMesh', 'ResShieldXMMesh', quality);
  };
  inherits(extrashield, LeveledXMItemEntity);

  return extrashield;
}());

imv.Entities = imv.Entities || {};
imv.Entities.ExtraShieldItem = ExtraShieldItemEntity;