var AtmosphereDrawable = (function(){

  // this program (atmosphere.glsl.vert and atmosphere.glsl.frag)
  // is a modified version of the atmosphere program in
  // https://github.com/dataarts/webgl-globe/blob/master/globe/globe.js
  var PROGRAM = imv.Constants.Program.Atmosphere;

  // this current expects a SphereMesh, but what that really
  // means is that it's expecting a mesh that provides
  // a_postion, a_texCoord0 and a_normal attributes.
  var atmosphereDrawable = function(radius, vSlices, hSlices, scaleFactor) {
    this.radius = radius;
    this.vSlices = vSlices;
    this.hSlices = hSlices;
    ModelDrawable.call(this, PROGRAM, null);
    this.uniforms.u_normalMatrix = mat3.create();
    this.scaleFactor = scaleFactor || 1.1;
    mat4.scale(this.local, this.local, [this.scaleFactor, this.scaleFactor, this.scaleFactor]);
  };
  inherits(atmosphereDrawable, ModelDrawable);

  atmosphereDrawable.prototype.updateView = function(viewProject) {
    ModelDrawable.prototype.updateView.call(this, viewProject);
     var invert = mat4.invert(mat4.create(), viewProject),
         transpose = mat4.transpose(mat4.create(), invert);
    this.uniforms.u_normalMatrix = mat3.fromMat4(mat3.create(), transpose);
  };

  atmosphereDrawable.prototype.init = function(manager) {
    this.mesh = new SphereMesh(
      manager._gl,
      this.radius,
      this.vSlices,
      this.hSlices
    );
    return ModelDrawable.prototype.init.call(this, manager);
  };

  return atmosphereDrawable;
}());

imv.Drawables = imv.Drawables || {};
imv.Drawables.Atmosphere = AtmosphereDrawable;
