var TexturedDrawable = (function(){

  var texturedDrawable = function(texture) {
    ModelDrawable.call(this);
    if(!(texture instanceof THREE.Texture))
    {
      throw 'Texture must be a THREE.Texture';
    }
    this.uniforms.u_texture = {
      type: "t",
      value: texture
    };
    texture.needsUpdate = true; // not sure I need this here now.
  };
  inherits(texturedDrawable, ModelDrawable);

  return texturedDrawable;
}());

imv.Drawables = imv.Drawables || {};
imv.Drawables.Textured = TexturedDrawable;