var AssetManager = function(basepath, map) {

  var assetMap = map || {};
  var cache = {
    geometry: new GeometryLoader(basepath, IngressGeometry),
    texture: new TextureLoader(basepath),
    shaders: new ShaderLoader(basepath)
  };
  var keys = Object.keys(cache);

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

  this.getRawShader = function(name)
  {
    if(assetMap && ('rawShaders' in assetMap) && (name in assetMap.rawShaders))
    {
      return new ShaderSet(assetMap.rawShaders[name].vertex, assetMap.rawShaders[name].fragment);
    }
  };

  this.preloadEntity = function(entity, onComplete)
  {
    if (!('_assets' in entity))
    {
      throw 'entity must be an instance of Entity';
    }
    var done = 0, count = 0, i, key;
    var a = entity._assets;
    for(i = 0; i < keys.length; i++)
    {
      count += a[keys[i]].length;
    }
    var getList = function(type, names) {
      var complete = function(err) {
        done++;
        if(err)
        {
          console.warn('Unable to load asset: ' + err);
        }
        if(done === count)
        {
          onComplete();
        }
      };
      for(var j = 0; j < names.length; j++)
      {
        key = names[j];
        if(!(key in assetMap[type]))
        {
          console.warn('Unknown ' + type + ' asset: ' + key);
          done++;
        }
        else
        {
          cache[type].loadAsset(key, assetMap[type][key], complete);
        }
      }
    };
    for(i = 0; i < keys.length; i++)
    {
      getList(keys[i], a[keys[i]]);
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