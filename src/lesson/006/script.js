import '/style.css';
import * as THREE from 'three';

const scene = new THREE.Scene();

const fov = 75;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 8;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;
scene.add(camera);

const geometry = new THREE.BoxGeometry(0.4, 0.4, 0.4);
const material = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe:true});
const cube = new THREE.Mesh(geometry, material);
cube.position.set(0, 0, -2);
scene.add(cube);

camera.lookAt(cube.position);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('.webgl'),
});

renderer.setSize(
  renderer.domElement.clientWidth, 
  renderer.domElement.clientHeight, 
  false
);
renderer.render(scene, camera);

function animation(timestamp) {

  const elapsedTime = timestamp / 1000;

  cube.position.x = Math.sin(elapsedTime);
  cube.position.y = Math.cos(elapsedTime);

  renderer.render(scene, camera);

  window.requestAnimationFrame(animation);
}

window.requestAnimationFrame(animation);