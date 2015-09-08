import Renderer from '../renderer';

// TODO: rework this.
class PortalRenderer extends Renderer {
  constructor(gl, manager) {
    super(gl, manager);
    this.portals = [];
    this.links = null;
    this.particles = null;
  }

  updateView(view, project) {
    super.updateView(view, project);
    var i, len = this.portals.length;
    for(i = 0; i < len; i++)
    {
      this.portals[i].updateView(this.viewProject, view, project);
    }
  }

  render() {
    var i, len = this.portals.length;
    for(i = 0; i < len; i++)
    {
      this.portals[i].draw();
    }
  }

  updateTime(delta) {
    super.updateTime(delta);
    var i, len = this.portals.length;
    for(i = 0; i < len; i++)
    {
      // if these return false, remove them from the render loop:
      if(!this.portals[i].updateTime(delta))
      {
        this.portals.splice(i, 1);
        i--;
        len--;
      }
    }
  }
}

export default PortalRenderer;
