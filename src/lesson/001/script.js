import './style.css';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

const cursor = {
  x: 0,
  y: 0
}

window.addEventListener('mousemove', (event) => {
  cursor.x = event.clientX / window.innerWidth - 0.5;
  cursor.y = -(event.clientY / window.innerWidth - 0.5);
});

const scene = new THREE.Scene();

const fov = 75;
const aspect = window.innerWidth / window.innerHeight;
const near = 1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 0, 500);
scene.add(camera);

const color = 0xffffff; // default value
const intensity = 1; // default value
const pointlight = new THREE.PointLight(color, intensity);
pointlight.position.set(200, 200, 200);
scene.add(pointlight);

const pearlRadius = 100;
const pearlWidthSegments = 64;
const pearlHeightSegments = 64;
const pearlGeo = new THREE.SphereGeometry(pearlRadius, pearlWidthSegments, pearlHeightSegments);
const pearlMat = new THREE.MeshPhysicalMaterial();
const pearlMesh = new THREE.Mesh(pearlGeo, pearlMat);
scene.add(pearlMesh);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('.webgl'),
  alpha: true,
  antialias: true,
});

renderer.setSize(
  window.innerWidth, 
  window.innerHeight
);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

function animation() {

  controls.update();

  renderer.render(scene, camera);

  window.requestAnimationFrame(animation);
}

window.requestAnimationFrame(animation);