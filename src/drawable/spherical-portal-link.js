var SphericalPortalLinkDrawable = function(sphereRadius, start, end, color, startPercent, endPercent) {
  this.radius = sphereRadius;
  this.start = start;
  this.end = end;
  this.color = color;
  this.startPercent = startPercent;
  this.endPercent = endPercent;
  LinkDrawable.call(this, imv.Constants.Program.SphericalLink, imv.Constants.Texture.PortalLink);
};
inherits(SphericalPortalLinkDrawable, LinkDrawable);

SphericalPortalLinkDrawable.prototype.init = function(manager) {
  this.mesh = new SphericalPortalLinkMesh(
    manager._gl,
    this.radius,
    this.start,
    this.end,
    this.color,
    this.startPercent,
    this.endPercent
  );
  return TexturedDrawable.prototype.init.call(this, manager);
};

SphericalPortalLinkDrawable.prototype.updateView = function(viewProject, view, project) {
  LinkDrawable.prototype.updateView.call(this, viewProject, view, project);
  this.uniforms.u_model = this.model;
};

imv.Drawables = imv.Drawables || {};
imv.Drawables.SphericalPortalLink = SphericalPortalLinkDrawable;
