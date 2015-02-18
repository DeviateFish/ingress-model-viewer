var Drawable = function(programName)
{
  this.programName = programName;
  this.program = null;
  this.uniforms = {};
  this.drawfn = null;
  this.elapsed = 0;
  this.ready = false;
};

Drawable.prototype.init = function(manager)
{
  this.program = manager.getProgram(this.programName);
  if(!this.program) {
    console.warn('missing program ' + this.programName);
    return false;
  }
  this.ready = true;
  return true;
};

Drawable.prototype.setDrawFn = function(fn) {
  this.drawfn = fn;
};

Drawable.prototype.draw = function()
{
  if(!this.ready) {
    console.warn('drawable is not initialized');
    return false;
  }
  this.program.use(this.drawfn);
};

Drawable.prototype.setUniform = function(name, value)
{
  this.uniforms[name] = value;
};

Drawable.prototype.updateTime = function(delta) {
  this.elapsed += delta;
  if(this.onUpdate)
  {
    return this.onUpdate(delta, this.elapsed);
  }
  return true;
};

imv.Drawable = Drawable;