var LinkAmpItemEntity = (function(){

  // Defaulting to rare, because wouldn't VR be nice?
  var defaultQuality = new THREE.Vector4().copy(constants.qualityColors.RARE);

  var linkamp = function(loader, quality) {
    quality = quality || defaultQuality;
    LeveledXMItemEntity.call(this, loader, 'LinkAmpMesh', 'LinkAmpXmMesh', quality);
  };
  inherits(linkamp, LeveledXMItemEntity);

  return linkamp;
}());

imv.Entities = imv.Entities || {};
imv.Entities.LinkAmpItem = LinkAmpItemEntity;