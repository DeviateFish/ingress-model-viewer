#ifdef GL_ES
precision mediump float;
#endif
uniform mat4 u_modelViewProject;
uniform vec3 u_cameraFwd;
uniform float u_elapsedTime;
uniform mat4 u_model;
attribute vec4 a_position;
attribute vec2 a_texCoord0;
attribute vec3 a_normal;
attribute vec4 a_color;
varying vec4 v_texCoord0And1;
varying vec4 v_color;
void main() {
  v_texCoord0And1.xy = (a_texCoord0 + vec2(0, u_elapsedTime * a_position.w * 0.6));
  v_texCoord0And1.zw = a_texCoord0 + vec2(0, u_elapsedTime * a_position.w);
  v_color = a_color;
  vec4 normal = u_model * vec4(a_normal.xyz, 0.0);
  float alpha = abs(dot(normalize(normal.xyz), u_cameraFwd));
  v_color.a *= (3.0 * alpha * alpha) - (2.0 * alpha * alpha * alpha);
  gl_Position = u_modelViewProject * vec4(a_position.xyz, 1.0);
}
