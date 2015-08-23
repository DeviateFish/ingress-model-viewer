import libtga from 'libtga';

export function loadResource(url, type, callback) {
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
        var image = new Image();
        image.onload = function() {
          callback(null, this);
        };
        image.onerror = function(e) {
          callback(e, null);
        };
        image.src = canvas.toDataURL();
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
}

class AssetLoader {

  constructor() {
    this._callbacks = {};
    this._assets = {};
  }

  loadAsset(url, type, callback) {
    var name = '_' + encodeURIComponent(url);
    if(this._assets[name])
    {
      callback(null, this._assets[name]);
      return;
    }
    this._callbacks[name] = this._callbacks[name] || [];
    this._callbacks[name].push(callback);
    if(!this._assets.hasOwnProperty(name))
    {
      this._assets[name] = false;
      loadResource(url, type, (err, value) => {
        if(!err)
        {
          this._assets[name] = value;
        }
        var cb;
        while((cb = this._callbacks[name].shift()))
        {
          cb(err, value);
        }
      });
    }
  }

  loadAssetGroup(urls, types, callback) {
    if(urls.length !== types.length)
    {
      throw 'Incompatible types: types.length = ' + types.length + '; urls.length = ' + urls.length;
    }
    var len = urls.length, results = new Array(len);
    var onEach = function(idx, err, value) {
      if(err) {
        callback(err, null);
        return;
      }
      results[idx] = value;
      var i, r = true;
      for(i = 0; i < len; i++)
      {
        r = r && results[i];
      }
      if(r)
      {
        callback(null, results);
      }
    };
    for(var i = 0; i < urls.length; i++)
    {
      this.loadAsset(urls[i], types[i], onEach.bind(undefined, i));
    }
  }

  getAsset(name) {
    return this._assets[name];
  }
}

export default AssetLoader;
