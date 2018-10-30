import Drawable from '../drawable';
import { mat4, vec3, quat } from 'gl-matrix';
import Animator from './animation/animator';
import Mesh from '../mesh';

/**
 * Base class for all Ingress drawable things.
 * Given a mesh internal name and a program internal name, construct
 * a Drawable
 * @param  {Program} program   Bound WebGL Program
 * @param  {Mesh}    mesh      Bound mesh
 * @param  {Texture} texture   Bound texture
 */
class GDXDrawable extends Drawable {
  constructor(program, mesh, texture) {
    super();
    this.mesh = mesh;
    this.program = program;
    this.texture = texture;
    this.uniforms = {};
    this.drawfn = this._draw.bind(this);
    this.uniforms.u_modelViewProject = this._modelViewProject;
    this.drawMode = Mesh.MODE_TRIANGLES;
  }

  /**
   * Sets the specific draw function for this drawable
   *
   * @chainable
   * @param {Function} fn The draw function to use when drawable this object
   * @return {this} Returns `this`
   */
  setDrawFn(fn) {
    this.drawfn = fn;
    return this;
  }

  /**
   * Executes a draw call for this object
   *
   * @return {void}
   */
  draw() {
    if (this.texture) {
      this.texture.use(0);
      this.uniforms.u_texture = 0;
    }
    this.program.use(this.drawfn);
  }

  /**
   * Sets a uniform on the drawable
   *
   * @chainable
   * @param {String} name  Name of the drawable to set
   * @param {mixed} value  Value to set on the drawable.
   * @returns {this} Returns `this`
   */
  setUniform(name, value) {
    this.uniforms[name] = value;
    return this;
  }

  /**
   * Sets the drawing mode for this drawable.  Should be one of the modes
   * found on Mesh
   *
   * @see  Mesh
   * @param {enum} mode One of the Mesh.MODE_* constants
   * @return {void}
   */
  setDrawMode(mode) {
    let modes = [Mesh.MODE_TRIANGLES, Mesh.MODE_LINES];
    if(modes.indexOf(mode) === -1) {
      throw new Error('mode should be one of ' + modes.join(', '));
    }
    this.drawMode = mode;
  }

  /**
   * Sets the draw mode to draw lines
   * @return {void}
   */
  drawLines() {
    this.setDrawMode(Mesh.MODE_LINES);
  }

  /**
   * Sets the draw mode to draw triangles
   * @return {void}
   */
  drawFaces() {
    this.setDrawMode(Mesh.MODE_TRIANGLES);
  }

  _draw(locations, uniforms) {
    for(var i in this.uniforms) {
      if(this.uniforms.hasOwnProperty(i) && (i in uniforms)) {
        uniforms[i](this.uniforms[i]);
      }
    }
    this.mesh.draw(locations, this.drawMode);
  }
}

export default Drawable;
