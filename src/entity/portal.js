var PortalEntity = (function(){

  var PORTAL_GEOMETRY = 'TexturedPortalMesh',
    PORTAL_TEXTURE = 'GlowrampTexture',
    PORTAL_SHADER = 'portal_scanner',
    PORTAL_SCALE = 6.0;

  var portal = function(loader, teamColor, options) {
    Entity.call(this, loader);
    options = options || {};
    teamColor = teamColor || 'NEUTRAL';
    this.setTeamColor(teamColor);
    var portalGeometry = loader.getAsset('model', PORTAL_GEOMETRY);
    var portalTexture = loader.getAsset('texture', PORTAL_TEXTURE);
    var portalShaders = loader.getAsset('shaders', PORTAL_SHADER);
    if(!portalGeometry)
    {
      throw 'Unable to load Geometry ' + PORTAL_GEOMETRY;
    }
    if(!portalTexture)
    {
      throw 'Unable to load texture ' + PORTAL_TEXTURE;
    }
    if(!portalShaders)
    {
      throw 'Unable to load shaders: ' + PORTAL_SHADER;
    }
    this.portal = new GlowrampDrawable(portalTexture, this.teamColor);
    this.portal.init(portalGeometry, portalShaders);
    this.portal.mesh.scale.set(PORTAL_SCALE, PORTAL_SCALE, PORTAL_SCALE);
    this.portal.mesh.updateMatrix();
    this.portal.mesh.updateMatrixWorld();
    this.portal.updateModel();
    this.models = [this.portal];
  };
  inherits(portal, Entity);

  portal.prototype.setTeamColor = function(color)
  {
    if(color instanceof THREE.Vector4)
    {
      this.teamColor = color;
    }
    else if(!(color in constants.teamColors))
    {
      throw 'Unknown team color ' + color;
    }
    else
    {
      this.teamColor = constants.teamColors[color].clone();
    }
    if(this.portal)
    {
      this.portal.setBaseColor(this.teamColor);
    }
    return this;
  };

  return portal;
}());

imv.Entities = imv.Entities || {};
imv.Entities.Portal = PortalEntity;