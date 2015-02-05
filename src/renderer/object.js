var ObjectRenderer = (function(){

  var objectRenderer = function(gl, manager) {
    GLBound.call(this, gl);
    this.manager = manager;
    this.entities = [];
    this.viewProject = mat4.create();
  };
  inherits(objectRenderer, GLBound);

  objectRenderer.prototype.createDrawable = function(textureName, programName, meshName, proto) {
    var texture = this.manager.getTexture(textureName),
      program = this.manager.getProgram(programName),
      mesh = this.manager.getMesh(meshName);
    if(!texture) {
      console.warn('missing texture ' + textureName);
      return false;
    }
    if(!program) {
      console.warn('missing program ' + programName);
      return false;
    }
    if(!mesh) {
      console.warn('missing mesh ' + meshName);
      return false;
    }

    return new proto(program, mesh, texture);
  };

  objectRenderer.prototype.addDrawable = function(drawable) {
    if(drawable)
    {
      if(drawable.updateView)
      {
        drawable.updateView(this.viewProject);
      }
      this.entities.push(drawable);
    }
  };

  objectRenderer.prototype.loadDrawable = function(textureName, programName, meshName, drawable) {
    var item = this.createDrawable(textureName, programName, meshName, drawable);
    this.addDrawable(item);
    return item;
  };

  objectRenderer.prototype.addBicoloredDrawable = function(textureName, programName, meshName) {
    return this.loadDrawable(textureName, programName, meshName, BicoloredDrawable);
  };

  objectRenderer.prototype.addXmDrawable = function(textureName, programName, meshName) {
    return this.loadDrawable(textureName, programName, meshName, XmDrawable);
  };

  objectRenderer.prototype.addGlowrampDrawable = function(textureName, programName, meshName) {
    return this.loadDrawable(textureName, programName, meshName, GlowrampDrawable);
  };

  objectRenderer.prototype.addShieldEffectDrawable = function(textureName, programName, meshName) {
    return this.loadDrawable(textureName, programName, meshName, ShieldEffectDrawable);
  };

  objectRenderer.prototype.updateView = function(view, project) {
    var i, len = this.entities.length;
    mat4.multiply(this.viewProject, project, view);
    for(i = 0; i < len; i++)
    {
      if(this.entities[i].updateView) {
        this.entities[i].updateView(this.viewProject, view, project);
      }
    }
  };

  objectRenderer.prototype.render = function() {
    var i, len = this.entities.length;
    for(i = 0; i < len; i++)
    {
      this.entities[i].draw();
    }
  };

  objectRenderer.prototype.updateTime = function(delta) {
    var i, len = this.entities.length;
    for(i = 0; i < len; i++)
    {
      // if these return false, remove them from the render loop:
      if(!this.entities[i].updateTime(delta))
      {
        this.entities.splice(i, 1);
        i--;
        len--;
      }
    }
  };

  return objectRenderer;
}());

imv.Renderers = imv.Renderers || {};
imv.Renderers.Object = ObjectRenderer;