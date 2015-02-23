var ArtifactGlowEntity = function(series, type, texture, glowColor) {

  var defaultColor = new THREE.Vector4().copy(glowColor);

  var MESH = 'Artifacts' + type + 'Glow',
    TEXTURE = texture + 'Texture',
    SHADER = 'portal_scanner',
    PORTAL_SCALE = 6.0;

  var artifactGlow = function(loader, color) {
    Entity.call(this, loader);
    color = color || defaultColor;
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
    this.entity = new GlowrampDrawable(texture, color);
    this.entity.init(geometry, shaders);
    this.entity.mesh.scale.set(PORTAL_SCALE, PORTAL_SCALE, PORTAL_SCALE);
    this.entity.updateModel();
    this.models = [this.entity];
  };
  Entity.extend(artifactGlow, Entity);
  artifactGlow._assets.geometry.push(MESH);
  artifactGlow._assets.texture.push(TEXTURE);
  artifactGlow._assets.shaders.push(SHADER);

  return artifactGlow;
};

imv.Entities = imv.Entities || {};
imv.Entities.ArtifactGlow = ArtifactGlowEntity;
imv.Entities.ArtifactGlows = imv.Entities.ArtifactGlows || {};
(function() {
  var _series = ['Jarvis', 'Amar', 'Helios', 'Shonin'];
  for(var i = 0; i < _series.length; i++)
  {
    imv.Entities.ArtifactGlows[_series[i]] = {
      Red: ArtifactGlowEntity(_series[i], 'Red', 'ColorGlow', constants.artifactColors[_series[i]].RedGlow),
      Purple: ArtifactGlowEntity(_series[i], 'Purple', 'ColorGlow', constants.artifactColors[_series[i]].PurpleGlow),
      Target: ArtifactGlowEntity(_series[i], 'Target', 'TargetGlow', constants.artifactColors[_series[i]].TargetGlow),
      Green: ArtifactGlowEntity(_series[i], 'Green', 'ColorGlow', constants.teamColors.NEUTRAL),
    };
  }
}());
