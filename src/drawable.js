import { mat4, vec3 } from 'gl-matrix';
import Animation from './animation/animation';

/**
 * Base class for all "drawable" things.
 *
 * Requires, at the very least, a program to run.
 */
class Drawable {

  /**
   * Given a mesh internal name and a program internal name, construct
   * a Drawable
   * @param  {String} programName Program internal name
   * @param  {String} meshName    Mesh internal Name
   */
  constructor(programName, meshName) {
    this.programName = programName;
    this.meshName = meshName;
    this.mesh = null;
    this.program = null;
    this.uniforms = {};
    this.drawfn = this._draw.bind(this);
    this.elapsed = 0;
    this.ready = false;
    this.viewProject = mat4.create();
    this._translate = mat4.create();
    this._rotate = mat4.create();
    this._scale = mat4.create();
    this._model = mat4.create();
    this.local = mat4.create();
    this.world = mat4.create();
    this.uniforms.u_modelViewProject = mat4.create();
    this.children = [];
    this._animations = [];
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
    if(this.meshName) {
      this.mesh = manager.getMesh(this.meshName);
      if(!this.mesh) {
        console.warn('missing mesh ' + this.meshName);
        return false;
      }
    }
    if(this.programName) {
      this.program = manager.getProgram(this.programName);
      if(!this.program) {
        console.warn('missing program ' + this.programName);
        return false;
      }
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
    if(this.program) {
      this.program.use(this.drawfn);
    }
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
    this._runAnimations(delta);
    return true;
  }

  /**
   * Adds an animation to the drawable
   * @param {Animation} animation The animation to be run.
   *                              This will need to be started independently, or prior to being added.
   */
  addAnimation(animation) {
    if (!(animation instanceof Animation)) {
      console.warn('New animation should be an instance of an Animation');
    }
    this._animations.unshift(animation);
  }

  /**
   * Adds a drawable as a child of this one.
   * @param {Drawable} drawable The child drawable.
   */
  addChild(drawable) {
    if (!(drawable instanceof Drawable)) {
      console.warn('Child drawable should be an instance of Drawable');
    }
    drawable.updateWorld(this._model);
    this.children.push(drawable);
  }

  /**
   * Update the internal u_modelViewProject uniform
   * by applying world and local transforms to the model
   * matrix.  Then, propagate the new local transform to all the children
   * by way of their world transforms.
   */
  updateMatrix() {
    var scaleTranslate = mat4.create();
    mat4.multiply(scaleTranslate, this._translate, this._scale);
    mat4.multiply(this.local, this._rotate, scaleTranslate);
    mat4.multiply(this._model, this.world, this.local);
    mat4.multiply(this.uniforms.u_modelViewProject, this.viewProject, this._model);
    this.children.forEach((child) => {
      child.updateWorld(this._model);
    });
  }

  /**
   * Updates the model's "world" transform.
   * @param  {mat4} world   A world transform
   */
  updateWorld(world) {
    this.world = world;
    this.updateMatrix();
  }

  /**
   * Update the internal viewProject matrix (projection * view matrices)
   * @param  {mat4} viewProject Projection matrix multiplied by view matrix
   */
  updateView(viewProject) {
    this.viewProject = viewProject;
    this.updateMatrix();
  }

  /**
   * Translate a model along some vector
   * @param  {vec3} vec   The vector
   */
  translate(vec) {
    mat4.translate(this._translate, this._translate, vec);
    this.updateMatrix();
  }

  /**
   * Sets the position to some vector
   * @param {vec3} vec The new position
   */
  setPosition(vec) {
    this._translate = mat4.create();
    this.translate(vec);
  }

  /**
   * Scale a model by some vector
   * @param  {vec3} vec   The vector
   */
  scale(vec) {
    mat4.scale(this._scale, this._scale, vec);
    this.updateMatrix();
  }

  /**
   * Sets the scale of the local transform
   * @param {vec3} vec The scale to set to.
   */
  setScale(vec) {
    this._scale = mat4.create();
    this.scale(vec);
  }

  /**
   * Rotate a model with a quaternion
   * @param  {quat} quat   The quaternion
   */
  rotate(quat) {
    var rotate = mat4.create();
    mat4.fromQuat(rotate, quat);
    mat4.multiply(this._rotate, this._rotate, rotate);
    this.updateMatrix();
  }

  /**
   * Sets the object's rotation from a quaternion
   * @param {quat} quat The new rotation
   */
  setRotation(quat) {
    this._rotate = mat4.create();
    mat4.fromQuat(this._rotate, quat);
    this.updateMatrix();
  }

  /**
   * Translate the model along the X axis
   * @param  {float} dist  Distance to translate
   */
  translateX(dist) {
    this.translate(vec3.fromValues(dist, 0, 0));
  }

  /**
   * Translate the model along the Y axis
   * @param  {float} dist  Distance to translate
   */
  translateY(dist) {
    this.translate(vec3.fromValues(0, dist, 0));
  }

  /**
   * Translate the model along the Z axis
   * @param  {float} dist  Distance to translate
   */
  translateZ(dist) {
    this.translate(vec3.fromValues(0, 0, dist));
  }

  /**
   * Scale all dimensions by the same value
   * @param  {Number} f The amount to _scale
   */
  scalarScale(f) {
    this.scale(vec3.fromValues(f, f, f));
  }

  /**
   * Sets the local scale to some scalar value (for x, y, and z)
   * @param {Number} f Amount to set the scale to.
   */
  setScalarScale(f) {
    this.setScale(vec3.fromValues(f, f, f));
  }

  /**
   * NYI
   * @return {void}
   */
  dispose() {
    // noop;
  }

  _draw(locations, uniforms) {
    for(var i in this.uniforms)
    {
      if(this.uniforms.hasOwnProperty(i) && (i in uniforms))
      {
        uniforms[i](this.uniforms[i]);
      }
    }
    this.mesh.draw(locations);
  }

  _runAnimations(delta) {
    let i = this._animations.length - 1;
    for(; i >= 0; i--) {
      let animation = this._animations[i];
      if(animation.running && animation.step(delta, this)) {
        this._animations.splice(i, 1);
      }
    }
  }
}

export default Drawable;
