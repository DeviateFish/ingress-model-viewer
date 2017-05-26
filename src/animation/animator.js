import Animation from './animation';

class Animator {
	constructor() {
    this._animations = [];
	}

  /**
   * Adds an animation
   *
   * @chainable
   * @param {Animation} animation The animation to be run.
   *                              This will need to be started independently, or prior to being added.
   * @return {this}
   */
  addAnimation(animation) {
    if (!(animation instanceof Animation)) {
      console.warn('New animation should be an instance of an Animation');
    }
    this._animations.unshift(animation);
    return this;
  }

  /**
   * @param  {Number}  Time since last update
   * @param  {Object}  Object to animate
   * @return {void}
   */
  runAnimations(delta, subject) {
    let i = this._animations.length - 1;
    for(; i >= 0; i--) {
      let animation = this._animations[i];
      if(animation.running && animation.step(delta, subject)) {
        this._animations.splice.apply(
          this._animations,
          [i, 1].concat(animation.next)
        );
      }
    }
  }
}

export default Animator;
