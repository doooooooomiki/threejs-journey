varying vec2 vUv;

uniform float time;

void main() {

  vec3 newposition = position;

  newposition.z += 0.04 * sin( newposition.x * 20. + time );

  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( newposition, 1.0 );
}