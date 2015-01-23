var ResonatorLinkSystemEntity = (function(){

  var LINK_TEXTURE = 'ResonatorLinkTexture',
    LINK_SHADER = 'LinkShader';

  var resonatorLinkSystem = function(loader) {
    Entity.call(this, loader);
    this.linkGeometry = new ResonatorLinkGeometry();
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
  Entity.extend(resonatorLinkSystem, Entity);
  resonatorLinkSystem._assets.texture.push(LINK_TEXTURE);
  resonatorLinkSystem._assets.rawShaders.push(LINK_SHADER);

  resonatorLinkSystem.prototype.addLink = function(srcx, srcy, srcPercent,
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

  return resonatorLinkSystem;
}());

imv.Entities = imv.Entities || {};
imv.Entities.ResonatorLinkSystem = ResonatorLinkSystemEntity;