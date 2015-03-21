var DynamicModelDrawable = (function() {

  var modelDrawable = function(programName, mesh) {
    DynamicDrawable.call(this, programName, mesh);
    this.viewProject = mat4.create();
    this.model = mat4.create();
    this.local = mat4.create();
    this.world = mat4.create();
  };
  inherits(modelDrawable, DynamicDrawable);

  modelDrawable.prototype.updateMatrix = function() {
    var mvp = mat4.create();
    mat4.multiply(this.model, this.world, this.local);
    mat4.multiply(mvp, this.viewProject, this.model);
    this.uniforms.u_modelViewProject = mvp;
  };

  modelDrawable.prototype.updateView = function(viewProject) {
    this.viewProject = viewProject;
    this.updateMatrix();
  };

  modelDrawable.prototype.setMatrix = function(mat) {
    this.model = mat;
    this.updateMatrix();
  };

  return modelDrawable;
}());

imv.Drawables = imv.Drawables || {};
imv.Drawables.DynamicModel = DynamicModelDrawable;
