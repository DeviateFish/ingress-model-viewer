import Constants from '../constants';
import Entity from '../entity';
import World from '../drawable/world';
import ResonatorLink from '../drawable/resonator-link';
import { vec3, vec4, mat4 } from 'gl-matrix';


// TODO: Deprecate in favor of a proper scene graph
class PortalEntity extends Entity {
  constructor(engine) {
    super(engine);
    this.addDrawable('Portal', new World.Portal());
    // why 6? I dunno, ask Niantic
    mat4.scale(this.drawables.Portal.local, this.drawables.Portal.local, vec3.fromValues(6, 6, 6));
    this.setColor(vec4.clone(Constants.teamColors.LOKI));
  }

  setColor(color) {
    this.color = vec4.clone(color);
    this.drawables.Portal.uniforms.u_baseColor = this.color;
    if(this.drawables.Shield) {
      this.drawables.Shield.uniforms.u_color = this.color;
    }
    if(this.drawables.ArtifactsGreenGlow) {
      this.drawables.ArtifactsGreenGlow.u_baseColor = this.color;
    }
    /*for(var i = 0; i < 8; i++) {
      this._redrawLink(i);sd
    }*/
  }

  addResonator(level, slot, range, percent) {
    if(percent === undefined) {
      percent = 1.0;
    }
    if(+slot < 0 || +slot > 8) {
      throw new Error('slot out of bounds for resonator');
    }
    if(!(level in Constants.qualityColors)) {
      throw new Error('level must be one of ' + Object.keys(Constants.qualityColors).join(' '));
    }
    range = range === undefined ? 40 : range;
    var resonatorName = 'Resonator' + (+slot);
    var linkName = 'Link' + (+slot);
    var theta = slot / 8 * 2 * Math.PI;
    var resonator = new World.Resonator();
    var x = range * Math.cos(theta);
    var y = range * Math.sin(theta);
    var link = new ResonatorLink(
      [0,0],
      slot,
      range,
      vec4.clone(this.color),
      1.0
    );
    resonator.uniforms.u_color0 = vec4.clone(Constants.qualityColors[level]);
    resonator.world = mat4.clone(this.drawables.Portal.local);
    //link.local = mat4.clone(this.drawables.Portal.local);
    mat4.translate(
      resonator.world,
      resonator.world,
      vec3.fromValues(x / 6, 0, y / 6)
    );
    resonator.updateMatrix();
    link.updateMatrix();
    // keep the portal sorted last (this is a terrible way of doing this.)
    this.addDrawable(linkName, link);
    this.addDrawable(resonatorName, resonator);
    this.addDrawable('Portal', this.drawables.Portal);
  }

  removeResonator(slot) {
    if(+slot < 0 || +slot > 8) {
      throw new Error('slot out of bounds for resonator');
    }
    var name = 'Resonator' + (+slot);
    var resonator = this.drawables[name] || null;
    if(resonator) {
      this.removeDrawable(name);
      this._removeResonatorLink(slot);
      this.addDrawable('Portal', this.drawables.Portal);
    }
  }

  addShield() {
    if(!('Shield' in this.drawables)) {
      this.addDrawable('Shield', new World.Shield());
      // why 12? I don't know.
      mat4.scale(this.drawables.Shield.local, this.drawables.Shield.local, vec3.fromValues(12, 12, 12));
      this.drawables.Shield.updateMatrix();
    }
    this.drawables.Shield.uniforms.u_color = this.color;
    this.applyTransform();
  }

  addArtifact(artifact, name) {
    var rotate = function(delta/*, elapsed*/) {
      mat4.rotateY(this.model, this.model, delta / 1000);
      this.updateMatrix();
      return true;
    };
    if(!(name in this.drawables)) {
      this.addDrawable(name, artifact);
    }
    this.drawables[name].onUpdate = rotate;
    this.applyTransform();
  }

  addGlowMarker(name, color) {
    var n = 'Artifacts' + name + 'Glow';
    if(!(n in this.drawables)) {
      this.addDrawable(n, new World[n]());
    }
    this.drawables[n].uniforms.u_baseColor = vec4.clone(color);
  }
}

export default PortalEntity;
