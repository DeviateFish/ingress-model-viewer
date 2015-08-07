var PortalLinkDrawable = (function() {
  var portalLink = function(start, end, color, startPercent, endPercent) {
    this.start = start;
    this.end = end;
    this.color = color;
    this.startPercent = startPercent;
    this.endPercent = endPercent;
    LinkDrawable.call(this, imv.Constants.Program.Link, imv.Constants.Texture.PortalLink);
  };
  inherits(portalLink, LinkDrawable);

  portalLink.prototype.init = function(manager) {
    this.mesh = new PortalLinkMesh(manager._gl, this.start, this.end, this.color, this.startPercent, this.endPercent);
    return TexturedDrawable.prototype.init.call(this, manager);
  };

  return portalLink;
}());

imv.Drawables = imv.Drawables || {};
imv.Drawables.PortalLink = PortalLinkDrawable;
