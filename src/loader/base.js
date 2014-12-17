var loadResource = function(url, type, callback)
{
  if(type === 'image' || type === 'image.co')
  {
    if(/\.tga$/.test(url))
    {
      libtga.loadFile(url, function(err, tga) {
        if(err)
        {
          callback(err, null);
          return;
        }
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        var imageData = context.createImageData(tga.width, tga.height);
        imageData.data.set(tga.imageData);
        canvas.height = tga.height;
        canvas.width = tga.width;
        context.putImageData(imageData, 0, 0);
        callback(null, canvas);
      });
    }
    else
    {
      var i = new Image();
      // cross-origin image:
      if(type === 'image.co')
      {
        i.crossOrigin = 'anoymous';
      }
      i.onload = function()
      {
        callback(null, this);
      };
      i.onerror = function(e)
      {
        callback(e, null);
      };
      i.src = url;
    }
  }
  else
  {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = type;
    xhr.onload = function() {
      callback(null, this.response);
    };
    xhr.onerror = function(e) {
      callback(e, null);
    };

    xhr.send();
  }
};

var AssetLoader = function(type, transform)
{
  type = type || 'text';
  transform = transform || function(v) { return v; };
  var _callbacks = {};
  var _assets = {};

  this.loadAsset = function(name, url, callback, options)
  {
    if(_assets[name])
    {
      callback(null, _assets[name]);
      return;
    }
    _callbacks[name] = _callbacks[name] || [];
    _callbacks[name].push(callback);
    if(!_assets.hasOwnProperty(name))
    {
      _assets[name] = false;
      loadResource(url, type, function(err, value) {
        if(!err)
        {
          value = transform(value, options);
          _assets[name] = value;
        }
        var cb;
        while((cb = _callbacks[name].shift()))
        {
          cb(err, value);
        }
      });
    }
  };

  this.getAsset = function(name)
  {
    return _assets[name];
  };
};

imv.AssetLoader = AssetLoader;
imv.Utilities = imv.Utilities || {};
imv.Utilities.loadResource = loadResource;