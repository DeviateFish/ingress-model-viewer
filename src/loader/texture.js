var TextureLoader = (function(){

  var typeMap = {
    'MipMapLinearLinear': THREE.LinearMipMapLinearFilter,
    'Linear': THREE.LinearFilter,
    'MipMapLinearNearest': THREE.LinearMipMapNearestFilter,
    'MipMapNearestLinear': THREE.NearestMipMapLinearFilter,
    'Nearest': THREE.NearestFilter,
    'Repeat': THREE.RepeatWrapping,
    'ClampToEdge': THREE.ClampToEdgeWrapping
  };

  var typeChange = function(type)
  {
    if(typeMap.hasOwnProperty(type))
    {
      type = typeMap[type];
    }
    else
    {
      console.warn('unknown type ' + type);
    }
    return type;
  };

  var textureloader = function(basepath)
  {
    this.base = basepath;
    this.metadata = {};
    this.textures = new AssetLoader('image', function(i, asset) {
      var magFilter = typeChange(asset.magFilter);
      var minFilter = typeChange(asset.minFilter);
      var wrapS = typeChange(asset.wrapS);
      var wrapT = typeChange(asset.wrapT);
      var t = new THREE.Texture(i, undefined, wrapS, wrapT, magFilter, minFilter);
      t.flipY = false;
      t.needsUpdate = true;
      return t;
    });
  };

  textureloader.prototype.loadAsset = function(name, asset, callback)
  {
    this.textures.loadAsset(name, this.base+asset.path, callback, asset);
  };

  textureloader.prototype.getAsset = function(name)
  {
    return this.textures.getAsset(name);
  };

  return textureloader;
}());

imv.Loaders = imv.Loaders || {};
imv.Loaders.TextureLoader = TextureLoader;