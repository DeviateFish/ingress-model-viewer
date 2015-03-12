#ifdef GL_ES
precision mediump float;
#endif
varying vec3 vNormal;
void main() {
  float intensity = pow( 0.8 - dot( vNormal, vec3( 0, 1.0, 0 ) ), 12.0 );
  gl_FragColor = vec4( 1.0, 1.0, 1.0, 1.0 ) * intensity;
}