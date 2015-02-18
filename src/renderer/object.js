var ObjectRenderer = (function(){

  var objectRenderer = function(gl, manager) {
    GLBound.call(this, gl);
    this.manager = manager;
    this.drawables = [];
    this.viewProject = mat4.create();
  };
  inherits(objectRenderer, GLBound);

  objectRenderer.prototype.addDrawable = function(drawable) {
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

  objectRenderer.prototype.removeDrawable = function(drawable) {
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

  objectRenderer.prototype.addEntity = function(entity) {
    for(var i in entity.drawables) {
      this.addDrawable(entity.drawables[i]);
    }
  };

  objectRenderer.prototype.updateView = function(view, project) {
    var i, len = this.drawables.length;
    mat4.multiply(this.viewProject, project, view);
    for(i = 0; i < len; i++)
    {
      if(this.drawables[i].updateView) {
        this.drawables[i].updateView(this.viewProject, view, project);
      }
    }
  };

  objectRenderer.prototype.render = function() {
    var i, len = this.drawables.length;
    for(i = 0; i < len; i++)
    {
      this.drawables[i].draw();
    }
  };

  objectRenderer.prototype.updateTime = function(delta) {
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

  return objectRenderer;
}());

imv.Renderers = imv.Renderers || {};
imv.Renderers.Object = ObjectRenderer;