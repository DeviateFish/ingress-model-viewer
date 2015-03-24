#ifdef GL_ES
precision mediump float;
#endif
uniform sampler2D u_texture;
varying vec4 v_color;
varying vec4 v_texCoord0And1;
// this is unchanged from the original
void main() {
  vec4 base = texture2D(u_texture, v_texCoord0And1.xy);
  vec4 scrolled = texture2D(u_texture, v_texCoord0And1.zw);
  float dots = scrolled.g;
  float brighten = mix(1.0, 2.0, base.b + (dots / 4.0));
  gl_FragColor.rgb = v_color.rgb * mix(0.35, brighten, dots);
  gl_FragColor.a = v_color.a * base.r;
}
