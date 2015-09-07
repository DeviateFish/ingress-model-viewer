import Constants from '../constants';
import LinkDrawable from './link';
import PortalLinkMesh from '../mesh/portal-link';

/**
 * A LinkDrawable that represents a link from one portal to another
 * @extends {LinkDrawable}
 */
class PortalLinkDrawable extends LinkDrawable {

  /**
   * Construct a portal link
   * @param  {vec2} start          X, Z of origin portal
   * @param  {vec2} end            X, Z of destination portal
   * @param  {vec4} color          Color of link
   * @param  {Number} startPercent Percent health of the origin portal
   * @param  {Number} endPercent   Percent health of the destination portal
   */
  constructor(start, end, color, startPercent, endPercent) {
    super(Constants.Program.Link, Constants.Texture.PortalLink);
    this.start = start;
    this.end = end;
    this.color = color;
    this.startPercent = startPercent;
    this.endPercent = endPercent;
  }

  /**
   * Construct the PortalLinkMesh for this link
   * @param  {AssetManager} manager AssetManager to look up the program and texture
   * @return {Boolean}              Success/failure
   */
  init(manager) {
    this.mesh = new PortalLinkMesh(manager._gl, this.start, this.end, this.color, this.startPercent, this.endPercent);
    return super.init(manager);
  }
}

export default PortalLinkDrawable;
