import AssetManager from './asset-manager';
import ObjectRenderer from './renderer/object';
import { resetGL } from './utils';
import World from './drawable/world';
import Resource from './drawable/resource';
import Inventory from './drawable/inventory';
import InventoryItems from './entity/inventory';
import PortalEntity from './entity/portal';
import Camera from './camera';
import { vec3, mat4 } from 'gl-matrix';

/**
 * The Engine provides nearly all the mechanics for actually drawing things to a canvas.
 *
 * Also includes a few simple functions for demoing various entities/drawables.  This
 * will probably go away in a future release.
 *
 * @param  {HTMLCanvas} canvas       A Canvas element
 * @param  {Object} assets           A manifest to pass to the internal AssetManager
 *                                   @see  AssetManager
 * @param  {Boolean} enableSnapshots If set to true, the canvas will preserve its drawing
 *                                   buffer, to allow for accurate .toDataURL calls.
 *                                   This will have a performance impact.
 */
class Engine {

  constructor(canvas, assets, enableSnapshots) {
    this.canvas = canvas;
    var opt = {};
    if(enableSnapshots) {
      opt.preserveDrawingBuffer = true;
    }
    this.canScreenshot = enableSnapshots && !!canvas.toBlob;
    var gl = canvas.getContext('webgl', opt) || canvas.getContext('experimental-webgl', opt);
    if(!gl)
    {
      throw 'Could not initialize webgl';
    }
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    this.gl = gl;
    this.camera = new Camera(canvas.width, canvas.height);
    this.camera.setPosition(
      vec3.fromValues(0.0, 20.0, 25.0)
    ).lookAt(
      vec3.fromValues(0.0, 10.0, 0.0)
    );

    this.assetManager = new AssetManager(this.gl, assets);
    this.objectRenderer = new ObjectRenderer(this.gl, this.assetManager);
    this._start = this._last = null;
    this._frame = null;
    this.scale = 1;
    this.resize();
  }

  /**
   * Resize the canvas and viewport to new dimensions.
   * Uses the canvas' clientWidth and clientHeight to determine viewport size,
   * if not provided.
   *
   * @chainable
   * @param {Number} width   (optional) width
   * @param {Number} height  (optional) height
   * @return {this} Returns `this`
   */
  resize(width, height) {
    let devicePixels = window.devicePixelRatio;
    if(!width) {
      width = this.canvas.clientWidth;
    }
    if (!height) {
      height = this.canvas.clientHeight;
    }
    let targetWidth = Math.floor(width * this.scale * devicePixels);
    let targetHeight = Math.floor(height * this.scale * devicePixels);
    this.canvas.width = targetWidth;
    this.canvas.height = targetHeight;
    this.camera.setDimensions(targetWidth, targetHeight);
    this.gl.viewport(0, 0, targetWidth, targetHeight);
    return this.updateView();
  }

  /**
   * Sets the scaling factor for the canvas.
   *
   * @chainable
   * @param  {Number} factor The scale factor
   * @return {this} Returns `this`
   */
  rescale(factor) {
    this.scale = factor;
    return this.resize();
  }

  /**
   * Updates the current drawing viewport to the canvas' current dimensions
   *
   * @chainable
   * @return {this} Returns `this`
   */
  updateView() {
    this.objectRenderer.updateView(this.camera);
    return this;
  }

  /**
   * Stops the render loop, if it's running.
   *
   * @chainable
   * @return {this} Returns `this`
   */
  stop() {
    this._last = this._start = null;
    if(this._frame) {
      window.cancelAnimationFrame(this._frame);
    }
    return this;
  }

  /**
   * Adds one of each inventory item, and a portal, to the scene
   * @return {void}
   */
  demoEntities() {
    var x = -5, y = 0, z = 4;
    var i, item;
    for(i in InventoryItems) {
      item = new InventoryItems[i](this);
      if(item) {
        item.translate(vec3.fromValues(x, y, z));
        x++;
        if(x > 5) {
          x = -5;
          z--;
        }
      }
    }
    var portal = new PortalEntity(this);
    portal.translate(vec3.fromValues(x, y, z));
  }

  /**
   * Adds one of each drawable to the scene
   * @return {void}
   */
  demo() {
    var x = -5, y = 0, z = 4;
    var i, item;
    for(i in Inventory) {
      item = new Inventory[i]();
      if(item) {
        mat4.translate(item.world, item.world, vec3.fromValues(x, y, z));
        x++;
        if(x > 5) {
          x = -5;
          z--;
        }
        this.objectRenderer.addDrawable(item);
      }
    }

    for(i in Resource) {
      item = new Resource[i]();
      if(item) {
        mat4.translate(item.world, item.world, vec3.fromValues(x, y, z));
        x++;
        if(x > 5) {
          x = -5;
          z--;
        }
        this.objectRenderer.addDrawable(item);
      }
    }

    for(i in World) {
      item = new World[i]();
      if(item) {
        mat4.translate(item.world, item.world, vec3.fromValues(x, y, z));
        x++;
        if(x > 5) {
          x = -5;
          z--;
        }
        this.objectRenderer.addDrawable(item);
      }
    }
  }

  /**
   * Draw a single frame, with a specified time since last draw
   * @param  {Number} delta Time since last render
   * @return {void}
   */
  draw(delta) {
    var gl = this.gl;
    // default setup stuff:
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    resetGL(gl);
    //gl.enable(gl.BLEND);
    //gl.depthMask(false);

    // render passes:
    this.objectRenderer.render();

    // run animations
    this.objectRenderer.updateTime(delta);
    this.camera.updateTime(delta);
  }

  /**
   * Start the render loop.
   * @param  {Number} tick Time since last tick (optional)
   * @return {void}
   */
  render(tick) {
    var delta = 0;
    if(!this._start) {
      this._start = tick;
      this._last = tick;
    }
    else if (tick) {
      delta = tick - this._last;
      this._last = tick;
    }
    this.draw(delta);
    // queue up next frame:
    this._frame = window.requestAnimationFrame(this.render.bind(this));
  }

  /**
   * Preloads all assets
   * @return {Promise<void>}
   */
  preload() {
    return this.assetManager.loadAll();
  }

  /**
   * Captures a screenshot, if enabled
   *
   * @param  {String} mimeType The mime type of the image
   * @param  {Number} quality  Quality, if applicable (applies to image/jpeg)
   * @return {Promise}         A promise that resolves when the screenshot is complete
   */
  capture(mimeType, quality) {
    if (this.canScreenshot) {
      this.stop();
      let promise = new Promise((resolve, reject) => {
        try {
          this.canvas.toBlob((blob) => {
            resolve(blob);
          }, mimeType, quality);
        } catch (e) {
          reject(e);
        }
      });
      // promise.then(() => {
      //   this.render();
      // }, () => {
      //   this.render();
      // });
      return promise;
    } else {
      return Promise.reject(new Error('Screenshots not enabled.  Initialize engine with `enableSnapshots` and ensure `canvas.toBlob` is supported by your browser.'));
    }
  }
}

export default Engine;
