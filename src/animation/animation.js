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
     *                              Will be executed in the context of the drawable (i.e. this === drawable)
     * @param  {Function} timing    Timing function (i.e. easing)  Defaults. to Ease.linear
     * @param  {Boolean}  loop      Whether or not to loop the animation
     * @return {this}               The animation
     */
    constructor(drawable, duration, transform, timing, loop) {
      let self = this;
      this.elapsed = 0;
      this.drawable = drawable;
      this.duration = duration;
      this.transform = transform;
      this.timing = timing || Ease.linear;
      this.loop = loop;
      this.oldUpdate = null;
      function onUpdate(delta) {
        self.elapsed += delta;
        // if we're done with the animation
        if (self.elapsed > self.duration && !self.loop) {
          self.stop();
        } else {
          let t = self.timing((self.elapsed / self.duration) % 1);
          // jshint, pls, I know what I'm doing.
          self.transform.call(this, t); // jshint ignore:line
        }
        if (self.oldUpdate) {
          return self.oldUpdate.call(this, delta); // jshint ignore:line
        } else {
          return true;
        }
      }
      this.onUpdate = onUpdate;
      this.running = false;
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
        this.oldUpdate = this.drawable.onUpdate;
        this.drawable.onUpdate = this.onUpdate;
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
        this.drawable.onUpdate = this.oldUpdate;
        this.running = false;
      }
      return this;
    }
}

export default Animation;
