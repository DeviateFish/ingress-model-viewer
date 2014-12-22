var TexturedDrawable = (function(){

  var texturedDrawable = function(texture) {
    ObjectDrawable.call(this);
    this.uniforms.u_texture = texture;
  };
  inherits(texturedDrawable, ObjectDrawable);

  return texturedDrawable;
}());

imv.TexturedDrawable = TexturedDrawable;