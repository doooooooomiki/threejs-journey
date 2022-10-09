import '/style.css';
import * as THREE from 'three';

// A Scene in three.js is the root of a form of scene graph. 
// Anything you want three.js to draw needs to be added to the scene
const scene = new THREE.Scene();

// field of view (in this case 75 deg in the vertical dimension)
const fov = 75;
// aspect ratio of the canvas
const aspect = window.innerWidth / window.innerHeight;
// near and far represent the space in front of the camera 
// that will be rendered. Anything before that range or after 
// that range will be clipped (not drawn).
const near = 0.1;
const far = 5;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;
scene.add(camera);

const geometry = new THREE.BoxGeometry(0.4, 0.4, 0.4);
const material = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe:true});

const cubeA = new THREE.Mesh( geometry, material );
cubeA.position.set( 0, 0, 0 );

const cubeB = new THREE.Mesh( geometry, material );
cubeB.position.set( -0.8, 0, 0);

const cubeC = new THREE.Mesh( geometry, material );
cubeC.position.set(0.8, 0, 0);

// This is almost identical to an Object3D. 
// Its purpose is to make working with groups of objects 
// syntactically clearer.
const group = new THREE.Group();
group.add(cubeA);
group.add(cubeB);
group.add(cubeC);

scene.add(group);
camera.lookAt(group.position);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('.webgl'),
});

function onResize() {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  
  camera.aspect = width / height;
  // Updates the camera projection matrix. 
  // Must be called after any change of parameters.
  camera.updateProjectionMatrix();
  
  renderer.setSize(width, height, false);
  renderer.render(scene, camera);
}

const resizeObserver = new ResizeObserver(onResize);
resizeObserver.observe(renderer.domElement);