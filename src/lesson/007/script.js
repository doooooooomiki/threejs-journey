import '/style.css';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';

const gui = new dat.GUI();

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera();
camera.fov = 75;
camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();
camera.near = 0.1;
camera.far = 8;
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

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

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('.webgl'),
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

function onResize() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  renderer.setSize(width, height, updateStyle);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}
window.addEventListener('resize', onResize)