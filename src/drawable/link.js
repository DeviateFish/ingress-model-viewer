var LinkDrawable = (function(){

  // no defaults here.
  var PROGRAM_NAME = 'LinkShader';

  var linkDrawable = function(mesh, textureName) {
    DynamicTexturedDrawable.call(this, PROGRAM_NAME, mesh, textureName);
    this.uniforms.u_cameraFwd = vec3.fromValues(0, 0, -1);
    this.uniforms.u_elapsedTime = 0;
  };
  inherits(linkDrawable, DynamicTexturedDrawable);

  // TODO: needs a camera class:
  linkDrawable.prototype.updateView = function(viewProject, view, project) {
    DynamicTexturedDrawable.prototype.updateView.call(this, viewProject, view, project);
    if(view) {
      var rot = mat3.fromMat4(mat3.create(), view);
      var q = quat.fromMat3(quat.create(), rot);
      var fwd = vec3.transformQuat(vec3.create(), vec3.fromValues(0, 0, -1), q);
      vec3.normalize(fwd, fwd);
      this.uniforms.u_cameraFwd = fwd;
    }
  };

  linkDrawable.prototype.updateTime = function(delta) {
    var ret = DynamicTexturedDrawable.prototype.updateTime.call(this, delta);
    this.uniforms.u_elapsedTime = ((this.elapsed / 1000) % 300.0) * 0.1;
    return ret;
  };

  linkDrawable.prototype.addLink = function(start, end, color, startPercent, endPercent) {
    // since this doesn't need to be loaded
    // perhaps change this behavior?
    if(!this.mesh) {
      throw 'Mesh not ready yet!';
    }

    return this.mesh.addLink(start, end, color, startPercent, endPercent);
  };

  return linkDrawable;
}());

imv.Drawables = imv.Drawables || {};
imv.Drawables.Link = LinkDrawable;