var Engine = function(canvas, assets)
{
  this.canvas = canvas;
  var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  if(!gl)
  {
    throw 'Could not initialize webgl';
  }
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  this.gl = gl;
  this.view = mat4.create();
  mat4.lookAt(this.view, [0.0, 4.0, 10.0], [0.0, 0.0, 0.0], [0.0, 1.0, 0.0]);
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
  this.gl.viewport(0, 0, width, height);
  mat4.perspective(this.project, 45, width / height, 0.1, 100);
  this.objectRenderer.updateView(this.view, this.project);
};

Engine.prototype.stop = function() {
  this.paused = true;
  this.cleared = false;
  if(this.frame) {
    window.cancelAnimationFrame(this.frame);
  }
};

Engine.prototype.start = function() {
  this.resize(this.canvas.width, this.canvas.height);
  this.render(0);
};

Engine.prototype.demo = function() {
  var x = -5, y = 0, z = 0;
  var i, j, item;
  for(i in imv.Primitives) {
    for(j in imv.Primitives[i])
    {
      item = imv.Primitives[i][j].createInstance(this.objectRenderer);
      if(item) {
        if(i === 'Artifact') {
          y = -14;
        }
        else {
          y = 0;
        }
        mat4.translate(item.model, item.model, vec3.fromValues(x, y, z));
        x++;
        if(x > 5) {
          x = -5;
          z--;
        }
        this.objectRenderer.addDrawable(item);
      }
    }
  }
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
  var gl = this.gl;
  // default setup stuff:
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.lineWidth(1.0);
  gl.enable(gl.CULL_FACE);
  gl.frontFace(gl.CCW);
  gl.cullFace(gl.BACK);
  gl.enable(gl.DEPTH_TEST);
  gl.blendEquation(gl.FUNC_ADD);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  //gl.enable(gl.BLEND);
  //gl.depthMask(false);

  gl.disable(gl.BLEND);
  gl.depthMask(true);

  // render passes:
  this.objectRenderer.render();

  // run animations
  this.objectRenderer.updateTime(delta);

  // queue up next frame:
  this.frame = window.requestAnimationFrame(this.render.bind(this));
};

Engine.prototype.preload = function() {
  this.assetManager.load();
};

imv.Engine = Engine;