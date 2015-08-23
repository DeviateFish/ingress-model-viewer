import AssetManager from './asset-manager';
import ObjectRenderer from './renderer/object';
import { resetGL } from './utils';
import World from './drawable/world';
import Resource from './drawable/resource';
import Inventory from './drawable/inventory';
import InventoryItems from './entity/inventory';
import PortalEntity from './entity/portal';
import { vec3, mat4 } from 'gl-matrix';

class Engine {

  constructor(canvas, assets, enableSnapshots)
  {
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
    this.view = mat4.create();
    mat4.lookAt(this.view, [0.0, 20.0, 25.0], [0.0, 10.0, 0.0], [0.0, 1.0, 0.0]);

    // this should be in radians, not degrees.
    this.hFoV = Math.PI / 4;

    this.far = 100;
    this.project = mat4.create();
    this.assetManager = new AssetManager(this.gl, assets);
    this.objectRenderer = new ObjectRenderer(this.gl, this.assetManager);
    this.resize(canvas.width, canvas.height);
    this.start = this.last = null;
    this.paused = false;
    this.cleared = false;
    this.frame = null;
  }

  resize(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.gl.viewport(0, 0, width, height);
    this.updateView();
  }

  updateView() {
    this.project = mat4.create();
    mat4.perspective(this.project, this.hFoV, this.canvas.width / this.canvas.height, 0.1, this.far);
    this.objectRenderer.updateView(this.view, this.project);
  }

  stop() {
    this.paused = true;
    this.cleared = false;
    if(this.frame) {
      window.cancelAnimationFrame(this.frame);
    }
  }

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

  render(tick)
  {
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

  preload(callback) {
    this.assetManager.loadAll(callback);
  }
}

export default Engine;
