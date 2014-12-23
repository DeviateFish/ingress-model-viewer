var ShieldItem = (function(){

  // Defaulting to VR, because everyone likes VR.
  var defaultQuality = new THREE.Vector4().copy(constants.qualityColors.VERY_RARE);

  var shield = function(loader, quality) {
    quality = quality || defaultQuality;
    LeveledXMItemEntity.call(this, loader, 'ResShieldMesh', 'ResShieldXMMesh', quality);
  };
  inherits(shield, LeveledXMItemEntity);

  return shield;
}());

imv.Entities = imv.Entities || {};
imv.Entities.ShieldItem = ShieldItem;