#ifdef GL_ES
precision mediump float;
#endif
attribute vec3 a_position;
attribute vec3 a_normal;
uniform mat3 u_normalMatrix;
uniform mat4 u_modelViewProject;
varying vec3 vNormal;
void main() {
  vNormal = normalize( u_normalMatrix * a_normal );
  gl_Position = u_modelViewProject * vec4( a_position, 1.0 );
}
