import '/style.css';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';

const gui = new dat.GUI();

/**
 * Scene
 * Scenes allow you to set up what and where is to be rendered by three.js. 
 * This is where you place objects, lights and cameras.
 * https://threejs.org/docs/?q=scene#api/en/scenes/Scene
 * 
 * Scene()
 */
const scene = new THREE.Scene();

/**
 * PerspectiveCamera
 * Camera that uses perspective projection.
 * https://threejs.org/docs/?q=scene#api/en/cameras/PerspectiveCamera
 * 
 * PerspectiveCamera( fov : Number, aspect : Number, near : Number, far : Number )
 */
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  8,
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

/**
 * Mesh
 * Class representing triangular polygon mesh based objects.
 * https://threejs.org/docs/?q=Mesh#api/en/objects/Mesh
 * 
 * Mesh( geometry : BufferGeometry, material : Material )
 * geometry — (optional) an instance of BufferGeometry. Default is a new BufferGeometry
 * material — (optional) a single or an array of Material. Default is a new MeshBasicMaterial
 */
const cube = new THREE.Mesh();
cube.geometry = new THREE.BoxGeometry(0.4, 0.4, 0.4);
cube.material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true,
});
cube.position.set(0, 0, 0);
scene.add(cube);

// Debug
const palette = {
  color: 0x00ff00,
};

gui
  .addColor(palette, 'color')
  .onChange(() => cube.material.color.set(palette.color))
  ;

gui
  .add(cube.position, 'x')
  .min(-1)
  .max(1)
  .step(0.0001)
  .name('cube x')
  ;

gui
  .add(cube.position, 'y')
  .min(-1)
  .max(1)
  .step(0.0001)
  .name('cube y')
  ;

gui
  .add(cube.position, 'z')
  .min(-1)
  .max(1)
  .step(0.0001)
  .name('cube z')
  ;

gui
  .add(cube, 'visible')
  ;

gui
  .add(cube.material, 'wireframe')
  ;


/**
 * WebGLRenderer
 * The WebGL renderer displays your beautifully crafted scenes using WebGL.
 * https://threejs.org/docs/?q=renderer#api/en/renderers/WebGLRenderer
 * 
 * WebGLRenderer( parameters : Object )
 */
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('.webgl'),
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight, false);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setAnimationLoop(() => {
  controls.update();
  renderer.render(scene, camera);
});
renderer.render(scene, camera);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

function onWindowResize() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  renderer.setSize(width, height, false);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}
window.addEventListener('resize', onWindowResize)