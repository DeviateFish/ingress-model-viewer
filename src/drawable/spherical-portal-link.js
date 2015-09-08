import Constants from '../constants';
import LinkDrawable from './link';
import SphericalPortalLinkMesh from '../mesh/spherical-portal-link';


/**
 * Represents a portal link that follows the surface of a sphere.
 *
 * Hooray for custom shaders, etc!
 */
class SphericalPortalLinkDrawable extends LinkDrawable {

  /**
   * Construct a spherical portal link
   * @param  {Number} sphereRadius Radius of the sphere
   * @param  {vec2} start          Lat,lng of the origin portal
   * @param  {vec2} end            Lat,lng of the destination portal
   * @param  {vec4} color          Color of the link
   * @param  {Number} startPercent Percent health of the origin portal
   * @param  {Number} endPercent   Percent health of the destination portal
   */
  constructor(sphereRadius, start, end, color, startPercent, endPercent) {
    super(Constants.Program.SphericalLink, Constants.Texture.PortalLink);
    this.radius = sphereRadius;
    this.start = start;
    this.end = end;
    this.color = color;
    this.startPercent = startPercent;
    this.endPercent = endPercent;
  }

  /**
   * Constructs a mesh for the link, then initializes the remaining assets.
   * @param  {AssetManager} manager AssetManager containing the program/texture
   * @return {Boolean}              Success/failure
   */
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
