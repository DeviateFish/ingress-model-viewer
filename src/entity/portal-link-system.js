var PortalLinkSystemEntity = (function(){

  var LINK_TEXTURE = 'PortalLinkTexture',
    LINK_SHADER = 'LinkShader';

  var portalLinkSystem = function(loader, options) {
    Entity.call(this, loader);
    options = options || {};
    this.linkGeometry = new PortalLinkGeometry();
    var linkTexture = loader.getAsset('texture', LINK_TEXTURE);
    var linkShaders = loader.getRawShader(LINK_SHADER);
    if(!linkTexture)
    {
      throw 'Unable to load texture ' + LINK_TEXTURE;
    }
    if(!linkShaders)
    {
      throw 'Unable to load shaders: ' + LINK_SHADER;
    }
    this.linkSystem = new LinkDrawable(linkTexture);
    this.linkSystem.init(this.linkGeometry, linkShaders);
    this.models = [this.linkSystem];
  };
  inherits(portalLinkSystem, Entity);

  portalLinkSystem.prototype.addLink = function(srcx, srcy, srcPercent,
    destx, desty, destPercent, color)
  {
    if(!(color instanceof THREE.Vector4))
    {
      throw 'Color must be a Vector4';
    }
    this.linkGeometry.addLink({
      x: srcx,
      y: srcy,
      percent: srcPercent
    }, {
      x: destx,
      y: desty,
      percent: destPercent
    }, color);
    return this;
  };

  return portalLinkSystem;
}());

imv.Entities = imv.Entities || {};
imv.Entities.PortalLinkSystem = PortalLinkSystemEntity;