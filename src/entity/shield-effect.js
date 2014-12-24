var ShieldEffectEntity = (function(){

  var SHIELD_GEOMETRY = 'PortalShieldMesh',
    SHIELD_TEXTURE = 'PortalShieldTexture',
    SHIELD_SHADER = 'shield',
    SHIELD_SCALE = 12.0;

  var shieldEffect = function(loader, color, options) {
    Entity.call(this, loader);
    options = options || {};
    color = color || constants.teamColors.LOKI.clone();
    this.setColor(color);
    var geometry = loader.getAsset('geometry', SHIELD_GEOMETRY);
    var texture = loader.getAsset('texture', SHIELD_TEXTURE);
    var shaders = loader.getAsset('shaders', SHIELD_SHADER);
    if(!geometry)
    {
      throw 'Unable to load Geometry ' + SHIELD_GEOMETRY;
    }
    if(!texture)
    {
      throw 'Unable to load texture ' + SHIELD_TEXTURE;
    }
    if(!shaders)
    {
      throw 'Unable to load shaders: ' + SHIELD_SHADER;
    }
    this.effect = new ShieldEffectDrawable(texture, this.color);
    this.effect.init(geometry, shaders);
    this.effect.mesh.scale.set(SHIELD_SCALE, SHIELD_SCALE, SHIELD_SCALE);
    this.effect.updateModel();
    this.models = [this.effect];
  };
  Entity.extend(shieldEffect, Entity);
  shieldEffect._assets.geometry.push(SHIELD_GEOMETRY);
  shieldEffect._assets.texture.push(SHIELD_TEXTURE);
  shieldEffect._assets.shaders.push(SHIELD_SHADER);

  shieldEffect.prototype.setColor = function(color)
  {
    if(!(color instanceof THREE.Vector4))
    {
      throw 'Color must be a Vector4';
    }
    this.color = color;
    if(this.effect)
    {
      this.effect.setColor(this.color);
    }
    return this;
  };

  return shieldEffect;
}());

imv.Entities = imv.Entities || {};
imv.Entities.ShieldEffect = ShieldEffectEntity;