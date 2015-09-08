/**
 * Base class for all "drawable" things.
 *
 * Requires, at the very least, a program to run.
 */
class Drawable {
  /**
   * Constructor for the base drawable
   * @param  {String} programName Internal name of the program to be run
   */
  constructor(programName) {
    this.programName = programName;
    this.program = null;
    this.uniforms = {};
    this.drawfn = null;
    this.elapsed = 0;
    this.ready = false;
  }

  /**
   * Initializer for the drawable
   *
   * Hooks up the drawable to all its gl-bound resources
   *
   * @param  {AssetManager} manager AssetManager containing the managed resources for this
   *                                drawable.
   * @return {boolean}              Returns true if the assets are successfully found and initialized,
   *                                false (and generates a warning) otherwise.
   */
  init(manager) {
    this.program = manager.getProgram(this.programName);
    if(!this.program) {
      console.warn('missing program ' + this.programName);
      return false;
    }
    this.ready = true;
    return true;
  }

  /**
   * Sets the specific draw function for this drawable
   *
   * @chainable
   * @param {Function} fn The draw function to use when drawable this object
   * @return {this}
   */
  setDrawFn(fn) {
    this.drawfn = fn;
    return this;
  }

  /**
   * Executes a draw call for this object
   *
   * Issues a warning if the drawable has not yet been initialized with `init`
   * @return {void}
   */
  draw() {
    if(!this.ready) {
      console.warn('drawable is not initialized');
      return false;
    }
    this.program.use(this.drawfn);
  }

  /**
   * Sets a uniform on the drawable
   *
   * @chainable
   * @param {String} name  Name of the drawable to set
   * @param {mixed} value  Value to set on the drawable.
   * @returns {this}
   */
  setUniform(name, value) {
    this.uniforms[name] = value;
    return this;
  }

  /**
   * Updates the elapsed time for this object.
   *
   * Also executes any periodic updates that have been applied to the drawable
   * (i.e. animations).  If this function returns a falsey value, it signals that the
   * animation has ended, and that the object should be removed from the draw loop.
   *
   * @param  {Number} delta Amount of time that has elapsed since the last draw call
   * @return {boolean}      Return false if the object should be removed from the
   *                        return loop.
   */
  updateTime(delta) {
    this.elapsed += delta;
    if(this.onUpdate)
    {
      return this.onUpdate(delta, this.elapsed);
    }
    return true;
  }

  /**
   * NYI
   * @return {void}
   */
  dispose() {
    // noop;
  }
}

export default Drawable;
