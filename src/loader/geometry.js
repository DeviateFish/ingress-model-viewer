var GeometryLoader = function(basepath, type)
{
  this.base = basepath;
  type = type || Geometry;
  this.geometries = new AssetLoader('arraybuffer', function(v, opt) { return new (type)(v, opt);});
};

GeometryLoader.prototype.loadAsset = function(name, asset, callback)
{
  this.geometries.loadAsset(name, this.base+asset.path, callback, asset);
};

GeometryLoader.prototype.getAsset = function(name)
{
  return this.geometries.getAsset(name);
};

imv.Loaders = imv.Loaders || {};
imv.Loaders.GeometryLoader = GeometryLoader;