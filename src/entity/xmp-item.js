var XmpItem = (function(){

  // Defaulting to a random level, because hey why not.
  var r = Math.floor(Math.random() * 8) + 1;
  var defaultQuality = new THREE.Vector4().copy(constants.qualityColors['L' + r]);

  var xmp = function(loader, quality) {
    quality = quality || defaultQuality;
    LeveledXMItemEntity.call(this, loader, 'XmpMesh', 'XmpXMMesh', quality);
  };
  inherits(xmp, LeveledXMItemEntity);

  return xmp;
}());

imv.Entities = imv.Entities || {};
imv.Entities.XmpItem = XmpItem;