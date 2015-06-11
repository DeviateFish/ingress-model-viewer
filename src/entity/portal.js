var PortalEntity = function(engine) {
  Entity.call(this, engine);
  this.addDrawable('Portal', new imv.Drawables.World.Portal());
  // why 6? I dunno, ask Niantic
  mat4.scale(this.drawables.Portal.local, this.drawables.Portal.local, vec3.fromValues(6, 6, 6));
  this.linkMesh = new imv.Meshes.ResonatorLink(engine.gl);
  this.links = new Array(8);
  this.addDrawable('ResonatorLinks', new imv.Drawables.PortalLink(this.linkMesh, imv.Constants.Texture.ResonatorLink));
  this.setColor(vec4.clone(imv.Constants.teamColors.LOKI));
};
inherits(PortalEntity, Entity);

PortalEntity.prototype.setColor = function(color) {
  this.color = vec4.clone(color);
  this.drawables.Portal.uniforms.u_baseColor = this.color;
  if(this.drawables.Shield) {
    this.drawables.Shield.uniforms.u_color = this.color;
  }
  if(this.drawables.ArtifactsGreenGlow) {
    this.drawables.ArtifactsGreenGlow.u_baseColor = this.color;
  }
  for(var i = 0; i < 8; i++) {
    this._redrawLink(i);
  }
};

PortalEntity.prototype._addResonatorLink = function(slot, x, y) {
  if(this.links[slot]) {
    this.linkMesh.removeLink(this.links[slot].id);
  }
  this.links[slot] = {
    x: x,
    y: y,
    id: this.linkMesh.addLink([0, 0], [x, y], this.color)
  };
};

PortalEntity.prototype._removeResonatorLink = function(slot) {
  this.linkMesh.removeLink(this.links[slot].id);
  this.links[slot] = null;
};

PortalEntity.prototype._redrawLink = function(slot) {
  if(this.links[slot]) {
    this._addResonatorLink(slot, this.links[slot].x, this.links[slot].y);
  }
};

PortalEntity.prototype.addResonator = function(level, slot, range) {
  if(+slot < 0 || +slot > 8) {
    throw new Error('slot out of bounds for resonator');
  }
  if(!(level in imv.Constants.qualityColors)) {
    throw new Error('level must be one of ' + Object.keys(imv.Constants.qualityColors).join(' '));
  }
  range = range === undefined ? 40 : range;
  var name = 'Resonator' + (+slot);
  var theta = slot / 8 * 2 * Math.PI;
  var drawable = new imv.Drawables.World.Resonator();
  drawable.uniforms.u_color0 = vec4.clone(imv.Constants.qualityColors[level]);
  drawable.local = mat4.clone(this.drawables.Portal.local);
  var x = range * Math.cos(theta);
  var y = range * Math.sin(theta);
  mat4.translate(
    drawable.local,
    drawable.local,
    vec3.fromValues(x / 6, 0, y / 6)
  );
  drawable.updateMatrix();
  this.addDrawable(name, drawable);
  this._addResonatorLink(slot, x, y);
  // keep the portal sorted last (this is a terrible way of doing this.)
  this.addDrawable('Portal', this.drawables.Portal);
};

PortalEntity.prototype.removeResonator = function(slot) {
  if(+slot < 0 || +slot > 8) {
    throw new Error('slot out of bounds for resonator');
  }
  var name = 'Resonator' + (+slot);
  var resonator = this.drawables[name] || null;
  if(resonator) {
    this.removeDrawable(name);
    this._removeResonatorLink(slot);
    this.addDrawable('Portal', this.drawables.Portal);
  }
};

PortalEntity.prototype.addShield = function() {
  if(!('Shield' in this.drawables)) {
    this.addDrawable('Shield', new imv.Drawables.World.Shield());
    // why 12? I don't know.
    mat4.scale(this.drawables.Shield.local, this.drawables.Shield.local, vec3.fromValues(12, 12, 12));
    this.drawables.Shield.updateMatrix();
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

