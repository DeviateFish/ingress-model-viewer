import Ease from './easing';
/**
 * Simple class for hooking up animations to drawables.
 *
 * Animations refers specifically to things like moving objects/cameras around.
 * Animations handled by the existing shaders should be implemented that way, instead.
 */

class Animation {

  /**
   * Create an animation for a drawable
   *
   * @chainable
   * @param  {Drawable} drawable  The object ot animate
   * @param  {Number}  duration   Duration of one cycle of the animation
   * @param  {Function} transform Animation callback
   *                              Parameter: Number t
   *                              Parameter: Drawable drawable
   * @param  {Function} timing    Timing function (i.e. easing)  Defaults. to Ease.linear
   * @param  {Boolean}  loop      Whether or not to loop the animation
   * @return {this}               The animation
   */
  constructor(duration, transform, timing, loop) {
    this.elapsed = 0;
    this.duration = duration;
    this.transform = transform;
    this.timing = timing || Ease.linear;
    this.loop = loop;
    this.running = false;
    this.next = [];
    return this;
  }

  /**
   * Starts the animation
   *
   * @chainable
   * @return {this}
   */
  start() {
    if(!this.running) {
      this.running = true;
    }
    return this;
  }

  /**
   * Stops the animation, and resets the elasped time to 0
   *
   * @chainable
   * @return {this}
   */
  stop() {
    this.elapsed = 0;
    return this.pause();
  }

  /**
   * Pauses the running animation
   *
   * @chainable
   * @return {this}
   */
  pause() {
    if(this.running) {
      this.running = false;
    }
    return this;
  }

  /**
   * Perform a step of the animation
   * @param  {Number} delta      Time elasped since last frame
   * @param  {Drawable} drawable The drawable to operate on
   * @return {Boolean}           Return true to signal the end of the animation
   */
  step(delta, drawable) {
    if(!this.running) {
      return false;
    }
    this.elapsed += delta;
    // if we're done with the animation
    if (this.elapsed > this.duration && !this.loop) {
      let t = this.timing(1);
      this.transform(t, drawable);
      this.stop();
      return true;
    }
    let t = this.timing((this.elapsed / this.duration) % 1);
    this.transform(t, drawable);
    return false;
  }

  /**
   * Allows for chaining of animations
   *
   * @chainable
   * @param  {Animation} animation  The animation to queue after this one
   *                                completes. Note that this isn't really
   *                                valid for looping animations
   * @return {this} Returns `this`
   */
  chain(animation) {
    if (!(animation instanceof Animation)) {
      throw new Error('New animation should be an instance of an Animation');
    }
    this.next.push(animation);
    return this;
  }
}

export default Animation;
