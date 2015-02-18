var ModelDrawable = (function() {

  var modelDrawable = function(programName, meshName) {
    MeshDrawable.call(this, programName, meshName);
    this.viewProject = mat4.create();
    this.model = mat4.create();
  };
  inherits(modelDrawable, MeshDrawable);

  modelDrawable.prototype.updateMatrix = function() {
    var mvp = mat4.create();
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
imv.Drawables.Model = ModelDrawable;