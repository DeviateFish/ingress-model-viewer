var Geometry = function(options)
{
  this.geometry = new THREE.BufferGeometry();
  this.transparent = (options && options.transparent) || false;
  this.attributes = {};
};

Geometry.prototype.getAttributeNames = function()
{
  return Object.keys(this.attributes);
};

imv.Geometry = imv.Geometry || {};
imv.Geometry.Geometry = Geometry;