class Drawable {
  constructor(programName)
  {
    this.programName = programName;
    this.program = null;
    this.uniforms = {};
    this.drawfn = null;
    this.elapsed = 0;
    this.ready = false;
  }

  init(manager) {
    this.program = manager.getProgram(this.programName);
    if(!this.program) {
      console.warn('missing program ' + this.programName);
      return false;
    }
    this.ready = true;
    return true;
  }

  setDrawFn(fn) {
    this.drawfn = fn;
  }

  draw() {
    if(!this.ready) {
      console.warn('drawable is not initialized');
      return false;
    }
    this.program.use(this.drawfn);
  }

  setUniform(name, value) {
    this.uniforms[name] = value;
  }

  updateTime(delta) {
    this.elapsed += delta;
    if(this.onUpdate)
    {
      return this.onUpdate(delta, this.elapsed);
    }
    return true;
  }

  dispose() {
    // noop;
  }
}

export default Drawable;
