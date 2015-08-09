var ResonatorLinkDrawable = (function() {
  var portalLink = function(portalPosition, slot, distance, color, resonatorPercent) {
    this.portalPosition = portalPosition;
    this.slot = slot;
    this.distance = distance;
    this.color = color;
    this.resonatorPercent = resonatorPercent;
    LinkDrawable.call(this, imv.Constants.Program.Link, imv.Constants.Texture.ResonatorLink);
  };
  inherits(portalLink, LinkDrawable);

  portalLink.prototype.init = function(manager) {
    this.mesh = new ResonatorLinkMesh(
      manager._gl,
      this.portalPosition,
      this.slot,
      this.distance,
      this.color,
      this.resonatorPercent
    );
    return TexturedDrawable.prototype.init.call(this, manager);
  };

  return portalLink;
}());

imv.Drawables = imv.Drawables || {};
imv.Drawables.ResonatorLink = ResonatorLinkDrawable;
