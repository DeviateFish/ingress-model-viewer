var PortalRenderer = function(gl, manager) {
  Renderer.call(this, gl, manager);
  this.portals = [];
  this.links = null;
  this.particles = null;
};
inherits(PortalRenderer, Renderer);

PortalRenderer.prototype.updateView = function(view, project) {
  Renderer.prototype.updateView.call(this, view, project);
  var i, len = this.portals.length;
  for(i = 0; i < len; i++)
  {
    this.portals[i].updateView(this.viewProject, view, project);
  }
};

PortalRenderer.prototype.render = function() {
  var i, len = this.portals.length;
  for(i = 0; i < len; i++)
  {
    this.portals[i].draw();
  }
};

PortalRenderer.prototype.updateTime = function(delta) {
  Renderer.prototype.updateTime.call(this, delta);
  var i, len = this.portals.length;
  for(i = 0; i < len; i++)
  {
    // if these return false, remove them from the render loop:
    if(!this.portals[i].updateTime(delta))
    {
      this.portals.splice(i, 1);
      i--;
      len--;
    }
  }
};

imv.Renderers = imv.Renderers || {};
imv.Renderers.Portal = PortalRenderer;