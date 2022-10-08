import '/style.css';
import * as THREE from 'three';

const canvas = document.querySelector('.webgl');

// A Scene in three.js is the root of a form of scene graph. 
// Anything you want three.js to draw needs to be added to the scene
const scene = new THREE.Scene();

// Radius of the torus, 
// from the center of the torus to the center of the tube. Default is 1.
const radius = 0.8;
// Radius of the tube. Default is 0.4
const tube = 0.4;
// radialSegments
const radialSegments = 16;
// tubularSegments
const tubularSegments = 32;
const geometry = new THREE.TorusGeometry(radius, tube, radialSegments, tubularSegments);
const material = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe:true});
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

// field of view (in this case 75 deg in the vertical dimension)
const fov = 75;
// aspect ratio of the canvas
const aspect = 2;
// near and far represent the space in front of the camera 
// that will be rendered. Anything before that range or after 
// that range will be clipped (not drawn).
const near = 0.1;
const far = 5;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;
scene.add(camera);

const renderer = new THREE.WebGLRenderer({canvas});

function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needsToBeResized = canvas.width !== width || canvas.height !== height;
  if (needsToBeResized) {
    // Resizes the output canvas to (width, height) with device
    // pixel ratio taken into account, and also sets the viewport
    // to fit that size, starting in (0, 0). Setting updateStyle 
    // to false prevents any style changes to the output canvas.
    renderer.setSize(width, height, false);
  }

  return needsToBeResized;
}

function animate(time) {
  time *= 0.001 // convert time to seconds

  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    // Updates the camera projection matrix. 
    // Must be called after any change of parameters.
    camera.updateProjectionMatrix();
  }
  
  torus.rotation.x = time;
  torus.rotation.y = time;
  torus.rotation.z= time;

  renderer.render(scene, camera);

  window.requestAnimationFrame(animate);
}

window.requestAnimationFrame(animate);