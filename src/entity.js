var Entity = function(engine) {
  this.drawables = {};
  this.transform = mat4.create();
  this.engine = engine;
};

Entity.prototype.addDrawable = function(name, drawable) {
  // add dispose if this already exists.
  this.removeDrawable(name);
  this.drawables[name] = drawable;
  this.engine.objectRenderer.addDrawable(drawable);
};

Entity.prototype.removeDrawable = function(name, destroy) {
  // dispose stuffs.
  if(this.drawables[name]) {
    this.engine.objectRenderer.removeDrawable(this.drawables[name], destroy);
  }
};

Entity.prototype.applyTransform = function() {
  for(var i in this.drawables)
  {
    this.drawables[i].setMatrix(this.transform);
  }
};

Entity.prototype.translate = function(vec) {
  mat4.translate(this.transform, this.transform, vec);
  this.applyTransform();
};

Entity.prototype.rotate = function(quat) {
  var rotate = mat4.create();
  mat4.fromQuat(rotate, quat);
  mat4.multiply(this.transform, this.transform, rotate);
  this.applyTransform();
};

Entity.prototype.setAnimation = function(animate) {
  for(var i in this.drawables)
  {
    this.drawables[i].onUpdate = animate;
  }
};

imv.Entity = Entity;
