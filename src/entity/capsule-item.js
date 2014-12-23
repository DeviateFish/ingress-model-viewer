var CapsuleItemEntity = (function(){

  // default quality to Rare, even though
  // no colors need to be rendered
  // Could be replaced with texturedDrawable, too
  var defaultQuality = new THREE.Vector4().copy(constants.qualityColors.RARE);

  var capsule = function(loader, quality) {
    quality = quality || defaultQuality;
    LeveledXMItemEntity.call(this, loader, 'CapsuleMesh', 'CapsuleXmMesh', quality);
  };
  inherits(capsule, LeveledXMItemEntity);

  return capsule;
}());

imv.Entities = imv.Entities || {};
imv.Entities.CapsuleItem = CapsuleItemEntity;