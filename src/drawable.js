import { mat4, vec3, quat } from 'gl-matrix';
import Animation from './animation/animation';
import Mesh from './mesh';

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
    this._translate = vec3.create();
    this._rotate = quat.create();
    this._scale = vec3.fromValues(1, 1, 1);
    this._model = mat4.create();
    this._ray = vec3.create();
    this.local = mat4.create();
    this.world = mat4.create();
    this.uniforms.u_modelViewProject = mat4.create();
    this.children = [];
    this._animations = [];
    this.drawMode = Mesh.MODE_TRIANGLES;
  }

  _loadAssets(manager) {
    let promises = [];
    if(this.meshName) {
      promises.push(
        manager.loadMesh(this.meshName).then((mesh) => {
          this.mesh = mesh;
        }).catch((err) => {
          console.warn('missing mesh ' + this.meshName);
          throw err;
        })
      );
    }
    if(this.programName) {
      promises.push(
        manager.loadProgram(this.programName).then((program) => {
          this.program = program;
        }).catch((err) => {
          console.warn('missing program' + this.programName);
          throw err;
        })
      );
    }
    return promises;
  }

  /**
   * Initializer for the drawable
   *
   * Hooks up the drawable to all its gl-bound resources
   *
   * @param  {AssetManager} manager AssetManager containing the managed resources for this
   *                                drawable.
   * @return {Promise}              Resolves if the assets are successfully found and initialized,
   *                                rejects (and generates a warning) otherwise.
   */
  init(manager) {
    let promises = this._loadAssets(manager);
    return Promise.all(promises).then(() => {
      this.ready = true;
      return true;
    });
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
    if(this.ready) {
      if(this.program) {
        this.program.use(this.drawfn);
      }
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
    var translateRotate = mat4.create();
    mat4.fromRotationTranslation(translateRotate, this._rotate, this._translate);
    mat4.scale(this.local, translateRotate, this._scale);
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
    this.updateRay();
  }

  /**
   * Updates the internal representation of the ray from the camera to the
   * drawable
   */
  updateRay() {
    vec3.copy(this._ray, this._translate);
    vec3.transformMat4(this._ray, this._ray, this.world);
    vec3.transformMat4(this._ray, this._ray, this.viewProject);
  }

  /**
   * Translate a model along some vector
   * @param  {vec3} vec   The vector
   */
  translate(vec) {
    vec3.add(this._translate, this._translate, vec);
    this.updateMatrix();
    this.updateRay();
  }

  /**
   * Sets the position to some vector
   * @param {vec3} vec The new position
   */
  setTranslation(vec) {
    this._translate = vec3.create();
    this.translate(vec);
  }

  /**
   * Scale a model by some vector
   * @param  {vec3} vec   The vector
   */
  scale(vec) {
    vec3.multiply(this._scale, this._scale, vec);
    this.updateMatrix();
  }

  /**
   * Sets the scale of the local transform
   * @param {vec3} vec The scale to set to.
   */
  setScale(vec) {
    this._scale = vec3.fromValues(1, 1, 1);
    this.scale(vec);
  }

  /**
   * Rotate a model with a quaternion
   * @param  {quat} quat   The quaternion
   */
  rotate(q) {
    quat.multiply(this._rotate, this._rotate, q);
    this.updateMatrix();
  }

  /**
   * Sets the object's rotation from a quaternion
   * @param {quat} quat The new rotation
   */
  setRotation(q) {
    this._rotate = quat.create();
    this.rotate(q);
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
   * Sets the drawing mode for this drawable.  Should be one of the modes
   * found on Mesh
   *
   * @see  Mesh
   * @param {enum} mode One of the Mesh.MODE_* constants
   */
  setDrawMode(mode) {
    let modes = [Mesh.MODE_TRIANGLES, Mesh.MODE_LINES];
    if(modes.indexOf(mode) === -1) {
      console.warn('mode should be one of ' + modes.join(', '));
      mode = Mesh.MODE_TRIANGLES;
    }
    this.drawMode = mode;
  }

  /**
   * Sets the draw mode to draw lines
   */
  drawLines() {
    this.setDrawMode(Mesh.MODE_LINES);
  }

  /**
   * Sets the draw mode to draw triangles
   */
  drawFaces() {
    this.setDrawMode(Mesh.MODE_TRIANGLES);
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
    this.mesh.draw(locations, this.drawMode);
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
