var Engine = function(canvas, assets, enableSnapshots)
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
  mat4.lookAt(this.view, [0.0, 2.0, 5.0], [0.0, 0.0, 0.0], [0.0, 1.0, 0.0]);

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
};

Engine.prototype.resize = function(width, height)
{
  this.canvas.width = width;
  this.canvas.height = height;
  this.gl.viewport(0, 0, width, height);
  this.updateView();
};

Engine.prototype.updateView = function() {
  this.project = mat4.create();
  mat4.perspective(this.project, this.hFoV, this.canvas.width / this.canvas.height, 0.1, this.far);
  this.objectRenderer.updateView(this.view, this.project);
};

Engine.prototype.stop = function() {
  this.paused = true;
  this.cleared = false;
  if(this.frame) {
    window.cancelAnimationFrame(this.frame);
  }
};

Engine.prototype.demoEntities = function() {
  var x = -5, y = 0, z = 4;
  var i, item;
  for(i in imv.Entities.Inventory) {
    item = new imv.Entities.Inventory[i]();
    if(item) {
      item.translate(vec3.fromValues(x, y, z));
      x++;
      if(x > 5) {
        x = -5;
        z--;
      }
      this.objectRenderer.addEntity(item);
      console.log('added ' + i);
    }
  }
  var portal = new imv.Entities.World.Portal();
  portal.translate(vec3.fromValues(x, y, z));
  this.objectRenderer.addEntity(portal);
};

Engine.prototype.demo = function() {
  var x = -5, y = 0, z = 4;
  var i, j, item;
  for(i in imv.Drawables.Inventory) {
    item = new imv.Drawables.Inventory[i]();
    if(item) {
      mat4.translate(item.model, item.model, vec3.fromValues(x, y, z));
      x++;
      if(x > 5) {
        x = -5;
        z--;
      }
      this.objectRenderer.addDrawable(item);
      console.log('added ' + i);
    }
  }

  for(i in imv.Drawables.Resource) {
    item = new imv.Drawables.Resource[i]();
    if(item) {
      mat4.translate(item.model, item.model, vec3.fromValues(x, y, z));
      x++;
      if(x > 5) {
        x = -5;
        z--;
      }
      this.objectRenderer.addDrawable(item);
      console.log('added ' + i);
    }
  }

  for(i in imv.Drawables.World) {
    item = new imv.Drawables.World[i]();
    if(item) {
      mat4.translate(item.model, item.model, vec3.fromValues(x, y, z));
      x++;
      if(x > 5) {
        x = -5;
        z--;
      }
      this.objectRenderer.addDrawable(item);
      console.log('added ' + i);
    }
  }

  for(i in imv.Drawables.Artifact) {
    for(j in imv.Drawables.Artifact[i]) {
      item = new imv.Drawables.Artifact[i][j]();
      if(item) {
        mat4.translate(item.model, item.model, vec3.fromValues(x, y, z));
        x++;
        if(x > 5) {
          x = -5;
          z--;
        }
        this.objectRenderer.addDrawable(item);
        console.log('added ' + i + ': ' + j);
      }
    }
  }
};

Engine.prototype.draw = function(delta) {
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
};

Engine.prototype.render = function(tick)
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
};

Engine.prototype.preload = function(callback) {
  this.assetManager.loadAll(callback);
};

imv.Engine = Engine;
