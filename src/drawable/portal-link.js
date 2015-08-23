import Constants from '../constants';
import LinkDrawable from './link';
import PortalLinkMesh from '../mesh/portal-link';

class PortalLinkDrawable extends LinkDrawable {
  constructor(start, end, color, startPercent, endPercent) {
    this.start = start;
    this.end = end;
    this.color = color;
    this.startPercent = startPercent;
    this.endPercent = endPercent;
    super(Constants.Program.Link, Constants.Texture.PortalLink);
  }

  init(manager) {
    this.mesh = new PortalLinkMesh(manager._gl, this.start, this.end, this.color, this.startPercent, this.endPercent);
    return super.init(manager);
  }
}

export default PortalLinkDrawable;
