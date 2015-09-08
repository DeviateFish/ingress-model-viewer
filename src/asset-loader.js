import libtga from 'libtga';

/**
 * Loads a resource via xhr or Image
 * @param  {String}   url      href of the resource to fetch
 * @param  {String}   type     One of XHMLHttpRequest's supported responseType
 *                             values (arraybuffer, blob, document, json, text)
 *                             or 'image' or 'image.co' (for a cross-origin image)
 * @param  {Function} callback Callback to execute on success or failure.  Takes
 *                             err, value as parameters.  Value will be null if err
 *                             is not null
 * @return {void}
 */
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


/**
 * An AssetLoader manages loading one or more assets.  It handles debouncing of
 * of multiple requests for the same asset, etc.
 */
class AssetLoader {

  /**
   * Noop.
   */
  constructor() {
    this._callbacks = {};
    this._assets = {};
  }

  /**
   * Loads a single asset.
   *
   * If the asset is already loaded, the callback is immediately invoked.
   * @see loadResource
   */
  loadAsset(url, type, callback) {
    var name = '_' + encodeURIComponent(url);
    if(this._assets[name])
    {
      // TODO: bounce this out of the current execution
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

  /**
   * Load a set of assets in parallel
   * @param  {Array}   urls      Array of urls of resources
   * @param  {Array}   types     Array of types of resources
   * @param  {Function} callback Callback to invoke for each resource
   * @return {void}
   * @see  loadResource
   */
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

  /**
   * Directly retrieve an asset from the cache
   * @param  {String} name The cache key
   * @return {mixed}       The cached asset, if it exists.
   */
  getAsset(name) {
    return this._assets[name];
  }
}

export default AssetLoader;
