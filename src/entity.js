import { mat4 } from 'gl-matrix';

// TODO: Deprecate
class Entity {
  constructor(engine) {
    this.drawables = {};
    this.transform = mat4.create();
    this.engine = engine;
  }

  addDrawable(name, drawable) {
    // add dispose if this already exists.
    this.removeDrawable(name);
    this.drawables[name] = drawable;
    this.engine.objectRenderer.addDrawable(drawable);
  }

  removeDrawable(name, destroy) {
    // dispose stuffs.
    if(this.drawables[name]) {
      this.engine.objectRenderer.removeDrawable(this.drawables[name], destroy);
    }
  }

  applyTransform() {
    for(var i in this.drawables)
    {
      this.drawables[i].setMatrix(this.transform);
    }
  }

  translate(vec) {
    mat4.translate(this.transform, this.transform, vec);
    this.applyTransform();
  }

  rotate(quat) {
    var rotate = mat4.create();
    mat4.fromQuat(rotate, quat);
    mat4.multiply(this.transform, this.transform, rotate);
    this.applyTransform();
  }

  setAnimation(animate) {
    for(var i in this.drawables)
    {
      this.drawables[i].onUpdate = animate;
    }
  }
}

export default Entity;
