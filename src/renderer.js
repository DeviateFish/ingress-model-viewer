var Renderer = function(gl, manager) {
  GLBound.call(this, gl);
  this.manager = manager;
  this.viewProject = mat4.create();
  this.view = mat4.create();
  this.project = mat4.create();
  this.elapsed = 0;
};
inherits(Renderer, GLBound);

Renderer.prototype.updateView = function(view, project) {
  this.view = view;
  this.project = project;
  mat4.multiply(this.viewProject, project, view);
};

Renderer.prototype.render = function() {
  console.warn("base class renders nothing.");
};

Renderer.prototype.updateTime = function(delta) {
  this.elapsed += delta;
};

imv.Renderer = Renderer;