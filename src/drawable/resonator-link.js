import Constants from '../constants';
import LinkDrawable from './link';
import ResonatorLinkMesh from '../mesh/resonator-link';

class ResonatorLinkDrawable extends LinkDrawable {
  constructor(portalPosition, slot, distance, color, resonatorPercent) {
    super(Constants.Program.Link, Constants.Texture.ResonatorLink);
    this.portalPosition = portalPosition;
    this.slot = slot;
    this.distance = distance;
    this.color = color;
    this.resonatorPercent = resonatorPercent;
  }

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
