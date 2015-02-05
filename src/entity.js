var Entity = function(drawables) {

  var _specs = drawables;

  var entity = function(renderer) {
    this.drawables = [];
    this.renderer = renderer;
    for(var i = 0; i < _specs.length; i++)
    {
      this.drawables.push(_specs[i].createInstance(renderer));
    }
    this.transform = mat4.create();
  };

  entity.prototype.add = function() {
    for(var i = 0; i < this.drawables.length; i++)
    {
      this.renderer.addDrawable(this.drawables[i]);
    }
  };

  entity.prototype.applyTransform = function() {
    for(var i = 0; i < this.drawables.length; i++)
    {
      this.drawables[i].setMatrix(this.transform);
    }
  };

  entity.prototype.translate = function(vec) {
    mat4.translate(this.transform, this.transform, vec);
    this.applyTransform();
  };

  entity.prototype.rotate = function(quat) {
    var rotate = mat4.create();
    mat4.fromQuat(rotate, quat);
    mat4.multiply(this.transform, this.transform, rotate);
    this.applyTransform();
  };

  entity.prototype.setAnimation = function(animate) {
    for(var i = 0; i < this.drawables.length; i++)
    {
      this.drawables[i].onUpdate = animate;
    }
  };

  return entity;
};

imv.Entity = Entity;