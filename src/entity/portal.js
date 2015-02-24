var PortalEntity = function() {
  Entity.call(this);
  this.color = vec4.clone(imv.Constants.teamColors.LOKI);
  this.addDrawable('Portal', new imv.Drawables.World.Portal());
  this.drawables.Portal.onUpdate = function(delta, elapsed) {
    var inc = elapsed / 1000;
    this.uniforms.u_baseColor[0] = Math.sin(inc);
    this.uniforms.u_baseColor[1] = Math.sin(inc + (2 * Math.PI / 3));
    this.uniforms.u_baseColor[2] = Math.sin(inc + (4 * Math.PI / 3));
    return true;
  };
};
inherits(PortalEntity, Entity);

PortalEntity.prototype.setColor = function(color) {
  this.color = vec4.clone(color);
  if(this.drawables.Portal) {
    this.drawables.Portal.onUpdate = undefined;
    this.drawables.Portal.uniforms.u_baseColor = this.color;
  }
  if(this.drawables.Shield) {
    this.drawables.Shield.uniforms.u_color = this.color;
  }
  if(this.drawables.ArtifactsGreenGlow) {
    this.drawables.ArtifactsGreenGlow.u_baseColor = this.color;
  }
};

PortalEntity.prototype.addShield = function() {
  if(!('Shield' in this.drawables)) {
    this.addDrawable('Shield', new imv.Drawables.World.Shield());
  }
  this.drawables.Shield.uniforms.u_color = this.color;
  this.applyTransform();
};

PortalEntity.prototype.addArtifact = function(series, num, frozen) {
  var rotate = function(delta/*, elapsed*/) {
    mat4.rotateY(this.model, this.model, delta / 1000);
    this.updateMatrix();
    return true;
  };
  var name = series + (frozen ? 'Frozen' : '') + num;
  if(!(name in this.drawables)) {
    this.addDrawable(name, new imv.Drawables.Artifact[series][name]());
  }
  this.drawables[name].onUpdate = rotate;
  this.applyTransform();
};

PortalEntity.prototype.addGlowMarker = function(name, color) {
  var n = 'Artifacts' + name + 'Glow';
  if(!(n in this.drawables)) {
    this.addDrawable(n, new imv.Drawables.World[n]());
  }
  this.drawables[n].uniforms.u_baseColor = vec4.clone(color);
};

imv.Entities = imv.Entities || {};
imv.Entities.World = imv.Entities.World || {};
imv.Entities.World.Portal = PortalEntity;

