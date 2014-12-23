var UltraStrikeItem = (function(){

  // Defaulting to a random level, because hey why not.
  var r = Math.floor(Math.random() * 8) + 1;
  var defaultQuality = new THREE.Vector4().copy(constants.qualityColors['L' + r]);

  var ultrastrike = function(loader, quality) {
    quality = quality || defaultQuality;
    LeveledXMItemEntity.call(this, loader, 'UltrastrikeMesh', 'UltrastrikeXMMesh', quality);
  };
  inherits(ultrastrike, LeveledXMItemEntity);

  return ultrastrike;
}());

imv.Entities = imv.Entities || {};
imv.Entities.UltraStrikeItem = UltraStrikeItem;