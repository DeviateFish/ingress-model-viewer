var ArtifactEntity = function(series, index, frozen) {

  var MESH = series + (frozen ? 'Frozen' : '') + index,
    TEXTURE = 'Artifact' + series + 'Texture',
    SHADER = 'textured',
    PORTAL_SCALE = 6.0;

  var artifact = function(loader) {
    Entity.call(this, loader);
    var geometry = loader.getAsset('geometry', MESH);
    var texture = loader.getAsset('texture', TEXTURE);
    var shaders = loader.getAsset('shaders', SHADER);
    if(!geometry)
    {
      throw 'Unable to load Geometry ' + MESH;
    }
    if(!texture)
    {
      throw 'Unable to load texture ' + TEXTURE;
    }
    if(!shaders)
    {
      throw 'Unable to load shaders: ' + SHADER;
    }
    this.entity = new TexturedDrawable(texture);
    this.entity.init(geometry, shaders);
    this.entity.mesh.scale.set(PORTAL_SCALE, PORTAL_SCALE, PORTAL_SCALE);
    this.entity.updateModel();
    this.models = [this.entity];
  };
  Entity.extend(artifact, Entity);
  artifact._assets.geometry.push(MESH);
  artifact._assets.texture.push(TEXTURE);
  artifact._assets.shaders.push(SHADER);

  return artifact;
};

imv.Entities = imv.Entities || {};
imv.Entities.Artifact = ArtifactEntity;
imv.Entities.Artifacts = imv.Entities.Artifacts || {};
//Jarvis shards:
var i;
for(i = 1; i <= 13; i++)
{
  imv.Entities.Artifacts['Jarvis' + i] = ArtifactEntity('Jarvis', i, false);
}

for(i = 1; i <= 17; i++)
{
  imv.Entities.Artifacts['Amar' + i] = ArtifactEntity('Amar', i, false);
  imv.Entities.Artifacts['AmarFrozen' + i] = ArtifactEntity('Amar', i, true);
}

for(i = 1; i <= 40; i++)
{
  imv.Entities.Artifacts['Helios' + i] = ArtifactEntity('Helios', i, false);
  imv.Entities.Artifacts['HeliosFrozen' + i] = ArtifactEntity('Helios', i, true);
}