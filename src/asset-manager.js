var AssetManager = function(basepath, map) {

  var assetMap = map || {};
  var cache = {
    model: new GeometryLoader(basepath, IngressGeometry),
    texture: new TextureLoader(basepath),
    shaders: new ShaderLoader(basepath)
  };
  var keys = Object.keys(cache);

  this.loadModel = function(asset, callback)
  {
    var loaded = {}, loading = false, i;
    var onload = function(){
      if(!loading && loaded.model && loaded.texture && loaded.shaders)
      {
        loading = true;
        callback(null, new Model(loaded.model, loaded.texture, loaded.shaders));
      }
    };
    for(i = 0; i < keys.length; i++)
    {
      var k = keys[i];
      if(!(asset[k] in assetMap[k]))
      {
        console.warn('unknown ' + k + ': ' + asset[k]);
        return false;
      }
    }
    var fetch = function(k) {
      cache[k].loadAsset(asset[k], assetMap[k][asset[k]], function(err, value) {
        if(err)
        {
          callback(err, null);
          return;
        }
        loaded[k] = value;
        onload();
      });
    };
    for(i = 0; i < keys.length; i++)
    {
      fetch(keys[i]);
    }
    return this;
  };

  this.setAssets = function(list)
  {
    assetMap = list;
    return this;
  };

  this.addAssets = function(list)
  {
    assetMap = copyInto(assetMap, list);
  };

  this.getAsset = function(type, key)
  {
    if(type in cache)
    {
      return cache[type].getAsset(key);
    }
    return null;
  };

  this.getModel = function(model, texture, shaders)
  {
    var m = cache.model.getAsset(model),
      t = cache.texture.getAsset(texture),
      s = cache.shaders.getAsset(shaders);
    if(m && t && s)
    {
      return new Model(m, t, s);
    }
    return null;
  };

  this.getRawShader = function(name)
  {
    if(assetMap && ('rawShaders' in assetMap) && (name in assetMap.rawShaders))
    {
      return new ShaderSet(assetMap.rawShaders[name].vertex, assetMap.rawShaders[name].fragment);
    }
  };

  this.preloadAssets = function(onComplete)
  {
    var queues = {};
    var end = function()
    {
      var e = true;
      for(var i = 0; i < keys.length; i++)
      {
        e = e && (queues[keys[i]].i >= queues[keys[i]].n);
      }
      if(e)
      {
        setTimeout(onComplete, 0);
      }
    };
    var fetch = function(k) {
      var _keys = Object.keys(assetMap[k]);
      queues[k] = {
        i: 0,
        n: _keys.length
      };
      var next = function()
      {
        if(queues[k].i >= queues[k].n)
        {
          end();
          return;
        }
        var j = queues[k].i++;
        cache[k].loadAsset(_keys[j], assetMap[k][_keys[j]], function(err){
          if(err)
          {
            console.warn('Unable to load asset: ' + err);
          }
          setTimeout(next, 0);
        });
      };
      next();
    };
    for(var i = 0; i < keys.length; i++)
    {
      fetch(keys[i]);
    }

    return function () {
      var k = Object.keys(queues);
      var l = k.length;
      var s = 0;
      for(var i = 0; i < l; i++)
      {
        s += (queues[k[i]].i / queues[k[i]].n) / l;
      }
      return s;
    };
  };

  return this;
};

imv.AssetManager = AssetManager;