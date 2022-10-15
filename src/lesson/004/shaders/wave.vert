varying vec2 vUv;

void main() {

  vec3 newposition = position;

  newposition.z += 0.04 * sin( newposition.x * 20. );

  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( newposition, 1.0 );
}