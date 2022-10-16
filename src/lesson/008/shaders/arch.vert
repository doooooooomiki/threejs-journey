varying vec2 vUv;

uniform float time;

void main() {

  float PI = 3.14159265359;
 
  vec3 newposition = position;

  newposition.z += 0.1 * sin( ( newposition.x + 0.25 + time / 2. ) * 2. * PI ); // arch

  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( newposition, 1.0 );
}