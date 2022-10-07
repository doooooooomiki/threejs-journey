import '/style.css';
import * as THREE from 'three';

const canvas = document.querySelector('.webgl');

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe:true});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const fov = 75; // field of view
const sizes = {
  width: 800,
  height: 600
};
const camera = new THREE.PerspectiveCamera(fov, sizes.width / sizes.height);
camera.position.z = 3;
camera.position.x = 1;
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

function animate() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.005;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
}

window.requestAnimationFrame(animate);