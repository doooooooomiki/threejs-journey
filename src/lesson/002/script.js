import '/style.css';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

// Scene
// Scenes allow you to set up what and where is to be rendered by three.js. 
// This is where you place objects, lights and cameras.
const scene = new THREE.Scene();

// PerspectiveCamera
// Camera that uses perspective projection.
// https://en.wikipedia.org/wiki/Perspective_(graphical)
const fov = 75; // field of view
const aspect = window.innerWidth / window.innerHeight;
const near = 1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 0, 4);
scene.add(camera);

// PointLight
// A light that gets emitted from a single point in all directions. 
// A common use case for this is to replicate the light emitted from a bare lightbulb.
const color = 0xffffff; // default value
const intensity = 1; // default value
const pointlight = new THREE.PointLight(color, intensity);
pointlight.position.set(200, 200, 200);
scene.add(pointlight);

// BufferGeometry
// A representation of mesh, line, or point geometry. 
// Includes vertex positions, face indices, normals, colors, UVs, 
// and custom attributes within buffers, reducing the cost of passing all this data to the GPU.
// https://threejs.org/docs/#api/en/core/BufferGeometry
const geometry = new THREE.BufferGeometry();

const count = 50;

const vertices = new Float32Array(count * 3 * 3);

for(let i = 0; i < count * 3 * 3; i++) {
  vertices[i] = (Math.random() - 0.5) * 4;
}

// BufferAttribute
// https://threejs.org/docs/?q=bufferatt#api/en/core/BufferAttribute
// itemSize -- the number of values of the array that should be associated with a particular vertex.
const itemSize = 3;
const positionAttribute = new THREE.BufferAttribute(vertices, itemSize);
geometry.setAttribute('position', positionAttribute);

// MeshBasicMaterial
// A material for drawing geometries in a simple shaded (flat or wireframe) way.
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true,
});

// Mesh
// Class representing triangular polygon mesh based objects.
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

camera.lookAt(mesh.position);

// WebGLRenderer
// The WebGL renderer displays your beautifully crafted scenes using WebGL.
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('.webgl'),
  antialias: true,
});

// Sets device pixel ratio. 
// This is usually used for HiDPI device to prevent blurring output canvas.
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// renderer.setSize
// Resizes the output canvas to (width, height) with device pixel ratio taken into account, 
// and also sets the viewport to fit that size, starting in (0, 0). 
// Setting updateStyle to false prevents any style changes to the output canvas.
const updateStyle = false;
renderer.setSize(window.innerWidth, window.innerHeight, updateStyle);

// setAnimationLoop
// A built in function that can be used instead of requestAnimationFrame.
renderer.setAnimationLoop(function() {
  controls.update();
  renderer.render(scene, camera);
});

// Sets the clear color and opacity.
// ( color : Color, alpha : Float ) : undefined
renderer.setClearColor(0x000000, 1.0);

const controls = new OrbitControls(camera, renderer.domElement);
// controls.enabled = false;
controls.enableDamping = true;

function onResize() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  
  renderer.setSize(width, height, updateStyle);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  camera.aspect = width / height;
  // Updates the camera projection matrix. 
  // Must be called after any change of parameters.
  camera.updateProjectionMatrix();
}
window.addEventListener('resize', onResize);