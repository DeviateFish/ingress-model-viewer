import Renderer from '../renderer';
import Drawable from '../drawable';

// TODO rework this.
class ObjectRenderer extends Renderer {
  constructor(gl, manager) {
    super(gl, manager);
    this.drawables = [];
  }

  addDrawable(drawable, excludeChildren) {
    if(!(drawable instanceof Drawable))
    {
      return Promise.reject(new Error('Drawables must always inherit from the base Drawable'));
    }
    var promise = drawable.init(this.manager).catch((err) => {
      console.warn('could not initialize drawable: ', drawable); // eslint-disable-line no-console
      return Promise.reject(err);
    });
    if(drawable.updateView)
    {
      drawable.updateView(this.viewProject, null);
    }
    this.drawables.push(drawable);
    if(!excludeChildren) {
      drawable.children.forEach((c) => {
        this.addDrawable(c);
      });
    }
    return promise;
  }

  removeDrawable(drawable, destroy) {
    for(var i = 0; i < this.drawables.length; i++)
    {
      if(this.drawables[i] === drawable)
      {
        this.drawables.splice(i, 1);
        if(destroy) {
          drawable.dispose();
          return true;
        } else {
          return drawable;
        }
      }
    }
    return false;
  }

  addEntity(entity) {
    for(var i in entity.drawables) {
      this.addDrawable(entity.drawables[i]);
    }
  }

  updateView(camera) {
    super.updateView(camera);
    var i, len = this.drawables.length;
    for(i = 0; i < len; i++)
    {
      if(this.drawables[i].updateView) {
        this.drawables[i].updateView(this.viewProject, camera);
      }
    }
  }

  render() {
    var i, len = this.drawables.length;
    for(i = 0; i < len; i++)
    {
      this.drawables[i].draw();
    }
  }

  updateTime(delta) {
    super.updateTime(delta);
    var i, len = this.drawables.length;
    for(i = 0; i < len; i++)
    {
      // if these return false, remove them from the render loop:
      if(!this.drawables[i].updateTime(delta))
      {
        this.drawables.splice(i, 1);
        i--;
        len--;
      }
    }
  }
}

export default ObjectRenderer;
