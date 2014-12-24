var Entity = (function(){

  var entity = function(loader) {
    this.loader = loader;
    this.models = [];
  };
  entity._assets = {
    geometry: [],
    texture: [],
    shaders: [],
    rawShaders: []
  };

  entity.extend = function(child, parent) {
    inherits(child, parent);
    child._assets = {
      geometry: parent._assets.geometry.slice(),
      texture: parent._assets.texture.slice(),
      shaders: parent._assets.shaders.slice(),
      rawShaders: parent._assets.rawShaders.slice()
    };
  };
  // Add functions for translations, rotations, etc
  // Anything you'd want to manipulate the entire entity at once.
  var uniq = function(l, c) {
    if(l.indexOf(c) < 0) {
      l.push(c);
    }
    return l;
  };
  entity.getAssets = function(ent) {
    return {
      geometry: ent._assets.geometry.reduce(uniq, []),
      texture: ent._assets.texture.reduce(uniq, []),
      shaders: ent._assets.shaders.reduce(uniq, []),
      rawShaders: ent._assets.rawShaders.reduce(uniq, [])
    };
  };

  entity.prototype.setPosition = function(v) {
    for(var i = 0; i < this.models.length; i++)
    {
      this.models[i].mesh.position.copy(v);
      this.models[i].updateModel();
    }
    return this;
  };

  entity.prototype.setScale = function(v) {
    for(var i = 0; i < this.models.length; i++)
    {
      this.models[i].mesh.scale.copy(v);
      this.models[i].updateModel();
    }
    return this;
  };

  entity.prototype.setRotation = function(v) {
    for(var i = 0; i < this.models.length; i++)
    {
      this.models[i].mesh.rotation.copy(v);
      this.models[i].updateModel();
    }
    return this;
  };

  entity.prototype.translate = function(direction, distance) {
    for(var i = 0; i < this.models.length; i++)
    {
      this.models[i].mesh.translateOnAxis(direction, distance);
      this.models[i].updateModel();
    }
    return this;
  };

  entity.prototype.rotate = function(axis, angle) {
    for(var i = 0; i < this.models.length; i++)
    {
      this.models[i].mesh.rotateOnAxis(axis, angle);
      this.models[i].updateModel();
    }
    return this;
  };

  return entity;
}());

imv.Entity = Entity;