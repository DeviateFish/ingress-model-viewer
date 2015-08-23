import Constants from '../constants';
import TexturedDrawable from './textured';
import { vec2, vec3, vec4 } from 'gl-matrix';

const PROGRAM = Constants.Program.ShieldEffect;

// these defaults are whack.  Need to find the real
// functions used to update these, too
// As of 1.62.0, that was in ...ingress.common.scanner.b.a.d
// The baksmali is a little jacked up, though.
const defaultColor = vec4.clone(Constants.teamColors.NEUTRAL);
const defaultRampTargetInv = vec2.fromValues(0.5, 1.3);
const defaultContributions = vec3.fromValues(0.5, 0.5, 0.5);

class ShieldEffectDrawable extends TexturedDrawable {

  constructor(meshName, textureName) {
    super(PROGRAM, meshName, textureName);
    this.uniforms.u_color = vec4.clone(defaultColor);
    this.uniforms.u_rampTargetInvWidth = vec2.clone(defaultRampTargetInv);
    this.uniforms.u_contributionsAndAlpha = vec3.clone(defaultContributions);
  }

  updateTime(delta) {
    var ret = super.updateTime(delta);
    var inc = this.elapsed / 10000;
    // this is so shitty, but again, this java decompiler really doesn't like the file.
    // This is nothing close to what's 'supposed' to happen in these uniforms, just a hack
    // that's kinda sorta like the actual thing.
    this.uniforms.u_rampTargetInvWidth[0] = -(inc - Math.floor(inc));
    this.uniforms.u_rampTargetInvWidth[1] = Math.sin((inc - Math.floor(inc)) * Math.PI / 2);
    // u_contributionsAndAlpha?
    return ret;
  }
}

export default ShieldEffectDrawable;
