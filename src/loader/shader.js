var ShaderLoader = function(basepath)
{
  this.base = basepath;
  this.vertex = new AssetLoader('text');
  this.fragment = new AssetLoader('text');
};

ShaderLoader.prototype.loadAsset = function(name, asset, callback)
{
  var loaded = {}, loading = false;
  var onload = function() {
    if(!loading && loaded.fragment && loaded.vertex)
    {
      loading = true;
      callback(null, new ShaderSet(loaded.vertex, loaded.fragment));
    }
  };
  this.vertex.loadAsset(name, this.base+asset.vertex, function(err, v){
    if(err)
    {
      callback(err, null);
      return;
    }
    loaded.vertex = v;
    onload();
  });
  this.fragment.loadAsset(name, this.base+asset.fragment, function(err, v){
    if(err)
    {
      callback(err, null);
      return;
    }
    loaded.fragment = v;
    onload();
  });
};

ShaderLoader.prototype.getAsset = function(name)
{
  var vertex = this.vertex.getAsset(name),
    fragment = this.fragment.getAsset(name);
  if(vertex && fragment)
  {
    return new ShaderSet(vertex, fragment);
  }
  return null;
};

imv.Loaders = imv.Loaders || {};
imv.Loaders.ShaderLoader = ShaderLoader;