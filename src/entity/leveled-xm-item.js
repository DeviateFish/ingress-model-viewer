var LeveledXMItemEntity = (function(){

  var ITEM_TEXTURE = 'FlipCardTexture',
    ITEM_SHADER = 'bicolor_textured',
    CORE_TEXTURE = 'ObjectXMTexture',
    CORE_SHADER = 'xm';

  var leveledItem = function(loader, meshName, coreName, quality) {
    Entity.call(this, loader);
    var itemGeometry = loader.getAsset('model', meshName);
    var itemTexture = loader.getAsset('texture', ITEM_TEXTURE);
    var itemShaders = loader.getAsset('shaders', ITEM_SHADER);
    if(!itemGeometry)
    {
      throw 'Unable to load Geometry ' + meshName;
    }
    if(!itemTexture)
    {
      throw 'Unable to load texture ' + ITEM_TEXTURE;
    }
    if(!itemShaders)
    {
      throw 'Unable to load shaders: ' + ITEM_SHADER;
    }
    this.item = new BicoloredDrawable(itemTexture, this.quality);
    this.item.init(itemGeometry, itemShaders);
    var coreGeometry = loader.getAsset('model', coreName);
    var coreTexture = loader.getAsset('texture', CORE_TEXTURE);
    var coreShaders = loader.getAsset('shaders', CORE_SHADER);
    if(!coreGeometry)
    {
      throw 'Unable to load Geometry ' + coreName;
    }
    if(!coreTexture)
    {
      throw 'Unable to load texture ' + CORE_TEXTURE;
    }
    if(!coreShaders)
    {
      throw 'Unable to load shaders: ' + CORE_SHADER;
    }
    this.core = new XmDrawable(coreTexture);
    this.core.init(coreGeometry, coreShaders);
    this.setQuality(quality);
    this.models = [this.item, this.core];
  };
  inherits(leveledItem, Entity);

  leveledItem.prototype.setQuality = function(quality)
  {
    if(quality instanceof THREE.Vector4)
    {
      this.quality = quality;
    }
    else if(!(quality in constants.qualityColors))
    {
      throw 'Unknown quality color ' + quality;
    }
    else
    {
      this.quality = constants.qualityColors[quality].clone();
    }
    if(this.item)
    {
      this.item.setPrimaryColor(this.quality);
    }
    return this;
  };

  return leveledItem;
}());

imv.Entities = imv.Entities || {};
imv.Entities.LeveledXMItem = LeveledXMItemEntity;