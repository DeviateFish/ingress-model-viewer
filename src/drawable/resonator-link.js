import Constants from '../constants';
import LinkDrawable from './link';
import ResonatorLinkMesh from '../mesh/resonator-link';


/**
 * A ResonatorLinkDrawable is a LinkDrawable that represents a link
 * between a portal and a resonator
 */
class ResonatorLinkDrawable extends LinkDrawable {

  /**
   * Construct a portal link resonator
   * @param  {vec2} portalPosition     X,Z of the portal (usually 0,0)
   * @param  {Number} slot             Slot (0-7)
   * @param  {Number} distance         Usually 0-40
   * @param  {vec4} color              Color of the resonator link (TODO: make this disco)
   * @param  {Number} resonatorPercent Percent health of the resonator
   */
  constructor(portalPosition, slot, distance, color, resonatorPercent) {
    super(Constants.Program.Link, Constants.Texture.ResonatorLink);
    this.portalPosition = portalPosition;
    this.slot = slot;
    this.distance = distance;
    this.color = color;
    this.resonatorPercent = resonatorPercent;
  }

  /**
   * Creates a ResonatorLinkMesh with the given params, and initializes the
   * texture/program
   * @param  {AssetManager} manager AssetManager containing the required program/texture
   * @return {Boolean}              Success/failure
   */
  init(manager) {
    this.mesh = new ResonatorLinkMesh(
      manager._gl,
      this.portalPosition,
      this.slot,
      this.distance,
      this.color,
      this.resonatorPercent
    );
    return super.init(manager);
  }
}

export default ResonatorLinkDrawable;
