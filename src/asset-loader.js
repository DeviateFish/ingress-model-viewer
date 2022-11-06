import libtga from 'libtga';

/**
 * An AssetLoader manages loading one or more assets.  It handles debouncing of
 * of multiple requests for the same asset, etc.
 *
 * @class
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
   * @param {String} url  The url of the asset to load.
   * @param {String} type The type of asset being requested
   *
   * @returns { Promise }  Returns a promise.  Resolves immediately
   *                       if the asset it already loaded.
   * @see AssetLoader.loadResource
   */
  loadAsset(url, type) {
    var name = '_' + encodeURIComponent(url);
    if(this._assets[name])
    {
      return Promise.resolve(this._assets[name]);
    }
    else
    {
      return new Promise((resolve, reject) => {
        this._callbacks[name] = this._callbacks[name] || [];
        this._callbacks[name].push({resolve, reject});
        if(!this._assets.hasOwnProperty(name))
        {
          this._assets[name] = false;
          AssetLoader.loadResource(url, type).then((value) => {
            this._assets[name] = value;
            var cb;
            while((cb = this._callbacks[name].shift()))
            {
              cb.resolve(value);
            }
          }).catch((err) => {
            var cb;
            while((cb = this._callbacks[name].shift()))
            {
              cb.reject(err);
            }
          });
        }
      });
    }
  }

  /**
   * Load a set of assets in parallel
   * @param  {Array} urls   Array of urls of resources
   * @param  {Array} types  Array of types of resources
   * @return {Promise}      A Promise that resolves when all assets are loaded,
   *                        or rejects when any fail.
   * @see  AssetLoader.loadResource
   */
  loadAssetGroup(urls, types) {
    if(urls.length !== types.length)
    {
      throw 'Incompatible types: types.length = ' + types.length + '; urls.length = ' + urls.length;
    }
    return Promise.all(
      urls.map((url, i) => {
        return this.loadAsset(url, types[i]);
      })
    );
  }

  /**
   * Directly retrieve an asset from the cache
   * @param  {String} name The cache key
   * @return {mixed}       The cached asset, if it exists.
   */
  getAsset(name) {
    return this._assets[name];
  }

  /**
   * Loads a resource via xhr or Image
   *
   * @static
   * @param  {String}   url      href of the resource to fetch
   * @param  {String}   type     One of XHMLHttpRequest's supported responseType
   *                             values (arraybuffer, blob, document, json, text)
   *                             or 'image' or 'image.co' (for a cross-origin image)
   * @return {Promise}           Returns a promise that resolves on success, or rejects
   *                             on failure.
   */
  static loadResource(url, type) {
    return new Promise(function(resolve, reject) {
      if(type === 'image' || type === 'image.co')
      {
        if(/\.tga$/.test(url))
        {
          libtga.loadFile(url, function(err, tga) {
            if(err)
            {
              reject(err);
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
              resolve(this);
            };
            image.onerror = function(e) {
              reject(e);
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
            resolve(this);
          };
          i.onerror = function(e)
          {
            reject(e);
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
          resolve(this.response);
        };
        xhr.onerror = function(e) {
          reject(e);
        };

        xhr.send();
      }
    });
  }
}

export default AssetLoader;
