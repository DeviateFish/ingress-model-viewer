var ObjectRenderer = function(gl, manager) {
  Renderer.call(this, gl, manager);
  this.drawables = [];
};
inherits(ObjectRenderer, Renderer);

ObjectRenderer.prototype.addDrawable = function(drawable) {
  if(!drawable instanceof Drawable)
  {
    throw 'Drawables must always inherit from the base Drawable';
  }
  if(!drawable.init(this.manager))
  {
    console.warn('could not initialize drawable: ', drawable);
    return false;
  }
  if(drawable.updateView)
  {
    drawable.updateView(this.viewProject);
  }
  this.drawables.push(drawable);
};

ObjectRenderer.prototype.removeDrawable = function(drawable) {
  for(var i = 0; i < this.drawables.length; i++)
  {
    if(this.drawables[i] === drawable)
    {
      this.drawables.splice(i, 1);
      // TODO: should dispose of drawable here.
      return;
    }
  }
};

ObjectRenderer.prototype.addEntity = function(entity) {
  for(var i in entity.drawables) {
    this.addDrawable(entity.drawables[i]);
  }
};

ObjectRenderer.prototype.updateView = function(view, project) {
  Renderer.prototype.updateView.call(this, view, project);
  var i, len = this.drawables.length;
  for(i = 0; i < len; i++)
  {
    if(this.drawables[i].updateView) {
      this.drawables[i].updateView(this.viewProject, view, project);
    }
  }
};

ObjectRenderer.prototype.render = function() {
  var i, len = this.drawables.length;
  for(i = 0; i < len; i++)
  {
    this.drawables[i].draw();
  }
};

ObjectRenderer.prototype.updateTime = function(delta) {
  Renderer.prototype.updateTime.call(this, delta);
  var i, len = this.drawables.length;
  for(i = 0; i < len; i++)
  {
    // if these return false, remove them from the render loop:
    if(!this.drawables[i].updateTime(delta))
    {
      this.drawables.splice(i, 1);
      i--;
      len--;
    }
  }
};

imv.Renderers = imv.Renderers || {};
imv.Renderers.Object = ObjectRenderer;