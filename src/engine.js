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
 */
class Engine {

  /**
   * Constructs an engine, given a canvas to render on and a list of assets to seed
   * its AssetManager with.
   * @param  {HTMLCanvas} canvas       A Canvas element
   * @param  {Object} assets           A manifest to pass to the internal AssetManager
   *                                   @see  AssetManager
   * @param  {Boolean} enableSnapshots If set to true, the canvas will preserve its drawing
   *                                   buffer, to allow for accurate .toDataURL calls.
   *                                   This will have a performance impact.
   */
  constructor(canvas, assets, enableSnapshots) {
    this.canvas = canvas;
    var opt = {};
    if(enableSnapshots) {
      opt.preserveDrawingBuffer = true;
    }
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

    // this should be in radians, not degrees.
    this.assetManager = new AssetManager(this.gl, assets);
    this.objectRenderer = new ObjectRenderer(this.gl, this.assetManager);
    this.start = this.last = null;
    this.paused = false;
    this.cleared = false;
    this.frame = null;
  }

  /**
   * Resize the canvas and viewport to new dimensions
   * @param  {Number} width  Width, in pixels
   * @param  {Number} height Heigh, in pixels
   * @return {void}
   */
  resize(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.camera.setDimensions(width, height);
    this.gl.viewport(0, 0, width, height);
  }

  /**
   * Updates the current drawing viewport to the canvas' current dimensions
   * @return {void}
   */
  updateView() {
    this.objectRenderer.updateView(this.camera);
  }

  /**
   * Stops the render loop, if it's running.
   * @return {void}
   */
  stop() {
    this.paused = true;
    this.cleared = false;
    if(this.frame) {
      window.cancelAnimationFrame(this.frame);
    }
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
        console.log('added ' + i);
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
        console.log('added ' + i);
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
        console.log('added ' + i);
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
        console.log('added ' + i);
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
  }

  /**
   * Start the render loop.
   * @param  {Number} tick Time since last tick (optional)
   * @return {void}
   */
  render(tick) {
    if(this.paused) {
      this.cleared = true;
      this.paused = false;
      return;
    }
    var delta = 0;
    if(!this.start)
    {
      this.start = tick;
      this.last = tick;
    }
    else
    {
      delta = tick - this.last;
      this.last = tick;
    }
    this.draw(delta);
    // queue up next frame:
    this.frame = window.requestAnimationFrame(this.render.bind(this));
  }

  /**
   * Preloads all assets
   * @param  {Function} callback Callback to invoke on completion
   * @return {void}
   */
  preload(callback) {
    this.assetManager.loadAll(callback);
  }
}

export default Engine;
