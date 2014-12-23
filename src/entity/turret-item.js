var TurretItem = (function(){

  // Defaulting to Rare because that's the only quality they come.
  var defaultQuality = new THREE.Vector4().copy(constants.qualityColors.RARE);

  var turret = function(loader, quality) {
    quality = quality || defaultQuality;
    LeveledXMItemEntity.call(this, loader, 'TurretMesh', 'TurretXmMesh', quality);
  };
  inherits(turret, LeveledXMItemEntity);

  return turret;
}());

imv.Entities = imv.Entities || {};
imv.Entities.TurretItem = TurretItem;