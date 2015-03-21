var AtmosphereDrawable = (function(){

  // this program (atmosphere.glsl.vert and atmosphere.glsl.frag)
  // is a modified version of the atmosphere program in
  // https://github.com/dataarts/webgl-globe/blob/master/globe/globe.js
  var PROGRAM = imv.Constants.Program.Atmosphere;

  // this current expects a SphereMesh, but what that really
  // means is that it's expecting a mesh that provides
  // a_postion, a_texCoord0 and a_normal attributes.
  var atmosphereDrawable = function(mesh, scaleFactor) {
    DynamicModelDrawable.call(this, PROGRAM, mesh);
    this.uniforms.u_normalMatrix = mat3.create();
    this.scaleFactor = scaleFactor || 1.1;
    mat4.scale(this.local, this.local, [this.scaleFactor, this.scaleFactor, this.scaleFactor]);
  };
  inherits(atmosphereDrawable, DynamicModelDrawable);

  atmosphereDrawable.prototype.updateView = function(viewProject) {
    DynamicModelDrawable.prototype.updateView.call(this, viewProject);
     var invert = mat4.invert(mat4.create(), viewProject),
         transpose = mat4.transpose(mat4.create(), invert);
    this.uniforms.u_normalMatrix = mat3.fromMat4(mat3.create(), transpose);
  };

  return atmosphereDrawable;
}());

imv.Drawables = imv.Drawables || {};
imv.Drawables.Atmosphere = AtmosphereDrawable;
