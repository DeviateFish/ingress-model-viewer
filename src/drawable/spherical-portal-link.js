import Constants from '../constants';
import LinkDrawable from './link';
import SphericalPortalLinkMesh from '../mesh/spherical-portal-link';


class SphericalPortalLinkDrawable extends LinkDrawable {
  constructor(sphereRadius, start, end, color, startPercent, endPercent) {
    super(Constants.Program.SphericalLink, Constants.Texture.PortalLink);
    this.radius = sphereRadius;
    this.start = start;
    this.end = end;
    this.color = color;
    this.startPercent = startPercent;
    this.endPercent = endPercent;
  }

  init(manager) {
    this.mesh = new SphericalPortalLinkMesh(
      manager._gl,
      this.radius,
      this.start,
      this.end,
      this.color,
      this.startPercent,
      this.endPercent
    );
    return super.init(manager);
  }

  updateView(viewProject, view, project) {
    super.updateView(viewProject, view, project);
    this.uniforms.u_model = this.model;
  }
}

export default SphericalPortalLinkDrawable;
