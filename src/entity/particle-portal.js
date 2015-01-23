var ParticlePortalsEntity = (function(){

  var PARTICLE_TEXTURE = 'ParticleTexture',
    PARTICLE_SHADER = 'particle_portals';

  var particlePortalsEntity = function(loader) {
    Entity.call(this, loader);
    this.geometry = new ParticlePortalsGeometry();
    var texture = loader.getAsset('texture', PARTICLE_TEXTURE);
    var shaders = loader.getAsset('shaders', PARTICLE_SHADER);
    this.count = 0;
    if(!texture)
    {
      throw 'Unable to load texture ' + PARTICLE_TEXTURE;
    }
    if(!shaders)
    {
      throw 'Unable to load shaders: ' + PARTICLE_SHADER;
    }
    this.system = new ParticlePortalsDrawable(texture);
    this.system.init(this.geometry, shaders);
    this.models = [this.system];
  };
  Entity.extend(particlePortalsEntity, Entity);
  particlePortalsEntity._assets.texture.push(PARTICLE_TEXTURE);
  particlePortalsEntity._assets.shaders.push(PARTICLE_SHADER);

  particlePortalsEntity.prototype.addSystem = function(color /* v3/v4 */, position /* v3 */,
    level)
  {
    var count = 12 + level * 84.0 / 8.0;
    var height = 1.35 + 0.65 * level / 8.0;
    var spread = 7.5 + 12.5 * level / 8.0;
    var distance = 30.0 + 58.0 * level / 8.0;

    var t_color = new THREE.Vector3(color.x, color.y, color.z);  // discard alpha if present.
    this.system.addSystem(t_color, position, count, height, spread, distance);
    this.geometry.addSystem();
    return this;
  };

  return particlePortalsEntity;
}());

imv.Entities = imv.Entities || {};
imv.Entities.ParticlePortals = ParticlePortalsEntity;