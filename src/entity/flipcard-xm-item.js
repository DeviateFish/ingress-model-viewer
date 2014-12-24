var FlipCardXMItemEntity = function(mesh, defaultCoreColor) {

  var DEFAULT_CORE_COLOR = defaultCoreColor.clone();

  var ITEM_MESH = mesh,
    ITEM_TEXTURE = 'FlipCardTexture',
    ITEM_SHADER = 'bicolor_textured',
    CORE_MESH = 'FlipCardXmMesh',
    CORE_TEXTURE = 'ObjectXMTexture',
    CORE_SHADER = 'xm';

  var flipcardItem = function(loader, coreColor) {
    Entity.call(this, loader);
    coreColor = coreColor || DEFAULT_CORE_COLOR;
    var itemGeometry = loader.getAsset('geometry', ITEM_MESH);
    var itemTexture = loader.getAsset('texture', ITEM_TEXTURE);
    var itemShaders = loader.getAsset('shaders', ITEM_SHADER);
    if(!itemGeometry)
    {
      throw 'Unable to load Geometry ' + ITEM_MESH;
    }
    if(!itemTexture)
    {
      throw 'Unable to load texture ' + ITEM_TEXTURE;
    }
    if(!itemShaders)
    {
      throw 'Unable to load shaders: ' + ITEM_SHADER;
    }
    this.item = new TexturedDrawable(itemTexture);
    this.item.init(itemGeometry, itemShaders);
    var coreGeometry = loader.getAsset('geometry', CORE_MESH);
    var coreTexture = loader.getAsset('texture', CORE_TEXTURE);
    var coreShaders = loader.getAsset('shaders', CORE_SHADER);
    if(!coreGeometry)
    {
      throw 'Unable to load Geometry ' + CORE_MESH;
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
    this.core.setTeamColor(coreColor);
    this.models = [this.item, this.core];
  };
  Entity.extend(flipcardItem, Entity);
  flipcardItem._assets.geometry.push(ITEM_MESH);
  flipcardItem._assets.geometry.push(CORE_MESH);
  flipcardItem._assets.texture.push(ITEM_TEXTURE);
  flipcardItem._assets.texture.push(CORE_TEXTURE);
  flipcardItem._assets.shaders.push(ITEM_SHADER);
  flipcardItem._assets.shaders.push(CORE_SHADER);

  return flipcardItem;
};

imv.Entities = imv.Entities || {};
imv.Entities.FlipCardXMItem = FlipCardXMItemEntity;