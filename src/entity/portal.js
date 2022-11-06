import Constants from '../constants';
import Drawable from '../drawable';
import World from '../drawable/world';
import ResonatorLink from '../drawable/resonator-link'
import { vec3, vec4, quat } from 'gl-matrix';
import Ease from '../animation/easing';


const { max, min } = Math;
const clamp = (val, _min, _max) => max(_min, min(_max, val));
const rotate = (t, drawable) => {
  var q = quat.create();
  quat.rotateY(q, q, t * Math.PI * 2);
  drawable.setRotation(q);
};

const MARKER_RED = 'Red';
const MARKER_GREEN = 'Green';
const MARKER_PURPLE = 'Purple';
const MARKER_TARGET = 'Target';
const MARKERS = [
  MARKER_RED,
  MARKER_GREEN,
  MARKER_PURPLE,
  MARKER_TARGET,
];

const ORNAMENT_MEETUP = 'MeetupPoint';
const ORNAMENT_FINISH = 'FinishPoint';
const ORNAMENT_CLUSTER = 'Cluster';
const ORNAMENT_VOLATILE = 'Volatile';
const ORNAMENTS = [
  ORNAMENT_MEETUP,
  ORNAMENT_FINISH,
  ORNAMENT_CLUSTER,
  ORNAMENT_VOLATILE
];


class PortalEntity extends Drawable {
  constructor() {
    super(null, null);
    this.childMap = {};
    const portal = this._maybeCreateNamedChild('portal', () => {
      const drawable = new World.Portal();
      // I don't know why this is set to 6
      drawable.setScale(vec3.fromValues(6.0, 6.0, 6.0));
      return drawable;
    });
    this.addChild(portal);
    this.setColor(vec4.clone(Constants.teamColors.NEUTRAL));
  }

  setColor(color) {
    this.color = vec4.clone(color);
    this.childMap.portal.uniforms.u_baseColor = this.color;
    if(this.childMap.shield) {
      this.childMap.shield.uniforms.u_color = this.color;
    }
    if(this.childMap.artifactsGreenGlow) {
      this.childMap.artifactsGreenGlow.u_baseColor = this.color;
    }
  }

  addResonator(level, slot, range=40, percent=1.0) {
    // clamp to 0..7 (int)
    slot = clamp(parseInt(slot, 10), 0, 7);
    // clamp to 1..8 (int)
    level = clamp(parseInt(slot, 10), 1, 8);
    // clamp to 0..40 (float)
    range = clamp(parseFloat(range), 0, 40);
    // clamp to 0..1
    percent = clamp(parseFloat(percent), 0, 1.0);
    const levelName = `L${level}`;
    const linkName = `link${slot}`;
    const resonatorName = `resonator${slot}`;

    const link = this._maybeCreateNamedChild(linkName, () => new ResonatorLink(
      [0,0],
      slot,
      range,
      vec4.clone(this.color),
      percent
    ));

    const resonator = this._maybeCreateNamedChild(resonatorName, () => new World.Resonator());
    const theta = slot / 8 * 2 * Math.PI;
    // (x,y) as points on a plane turns into (x, 0, y) in 3d
    const x = range * Math.cos(theta);
    const y = range * Math.sin(theta);
    resonator.uniforms.u_color0 = vec4.clone(Constants.qualityColors[levelName]);
    resonator.translate(vec3.fromValues(x, 0, y));

    // keep the portal sorted last (this is a terrible way of doing this.)
    this.addChild(link);
    this.addChild(resonator);
  }

  removeResonator(slot) {
    slot = clamp(parseInt(slot), 0, 7);
    const resonator = this.childMap[`resonator${slot}`];
    if(resonator) {
      this.removeDrawable(name);
      this._removeResonatorLink(slot);
      this.addDrawable('Portal', this.childMap.Portal);
    }
  }

  addShield() {
    const shield = this._maybeCreateNamedChild('shield', () => {
      const drawable = new World.Shield();
      drawable.setScale(vec3.fromValues(2.0, 2.0, 2.0));
      return drawable;
    });
    shield.uniforms.u_color = this.color;
    this.addChild(shield);
  }

  removeShield() {
    if (this.childMap.shield) {
      this.removeChild(this.childMap.shield);
    }
  }

  addArtifactDrawable(drawable, name) {
    const artifact = this._maybeCreateNamedChild(name, () => {
      const animation = new Animation(4000, rotate, Ease.linear, true);
      drawable.addAnimation(animation);
      return drawable;
    });
    this.addChild(artifact);
  }

  addGlowMarker(name, color) {
    if (!MARKERS.includes(name)) {
      throw new Error(`name must be one of "${MARKERS.join(' ')}"`);
    }
    const markerName = `Artifacts${name}Glow`;
    const marker = this._maybeCreateNamedChild(markerName, () => new World[markerName]());
    marker.uniforms.u_baseColor = vec4.clone(color);
    this.addChild(marker);
    this._resortPortal();
  }

  removeGlowMarker(name) {
    if (!MARKERS.includes(name)) {
      throw new Error(`name must be one of "${MARKERS.join(' ')}"`);
    }
    const marker = this.childMap[`Artifacts${name}Glow`];
    if (marker) {
      this.removeDrawable(marker);
    }
  }

  addOrnament(name, color) {
    if (!ORNAMENTS.includes(name)) {
      throw new Error(`name must be one of "${ORNAMENTS.join(' ')}"`);
    }
    const ornamentName = `Ornament${name}`;
    const ornament = this._maybeCreateNamedChild(ornamentName, () => {
      const ornament = new World[ornamentName]();
      ornament.setScale(vec3.fromValues(2.0, 2.0, 2.0));
      return ornament;
    });
    ornament.uniforms.u_baseColor = vec4.clone(color);
    this.addChild(ornament);
    this._resortPortal();
  }

  removeOrnament(name) {
    if (!ORNAMENTS.includes(name)) {
      throw new Error(`name must be one of "${ORNAMENTS.join(' ')}"`);
    }
    const ornament = this.childMap[`Ornament${name}`];
    if (ornament) {
      this.removeDrawable(ornament);
    }
  }

  _maybeCreateNamedChild(name, initFn) {
    if (!Object.prototype.hasOwnProperty.call(this.childMap, name)) {
      this.childMap[name] = initFn();
    }
    return this.childMap[name];
  }

  _resortPortal() {
    this.removeChild(this.childMap.portal);
    this.addChild(this.childMap.portal);
  }
}
PortalEntity.MARKERS = MARKERS;
PortalEntity.ORNAMENTS = ORNAMENTS;

export default PortalEntity;
