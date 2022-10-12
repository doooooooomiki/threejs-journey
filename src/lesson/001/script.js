import './style.css';
import threeToneUrl from './threeTone.jpeg'
import fiveToneUrl from './fiveTone.jpeg'
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
const pearlGeometry = new THREE.SphereGeometry(pearlRadius, pearlWidthSegments, pearlHeightSegments);

const pearlTextureLoader = new THREE.TextureLoader();

const threeTone = pearlTextureLoader.load(threeToneUrl);
threeTone.minFilter = THREE.NearestFilter;
threeTone.magFilter = THREE.NearestFilter;

const pearlMaterialThreeTone = new THREE.MeshToonMaterial({
  color: 0x049ef4,
  gradientMap: threeTone,
});

const pearl1 = new THREE.Mesh(pearlGeometry, pearlMaterialThreeTone);
pearl1.position.y = 120;
scene.add(pearl1);

const fiveTone = pearlTextureLoader.load(fiveToneUrl);
fiveTone.minFilter = THREE.NearestFilter;
fiveTone.magFilter = THREE.NearestFilter;

const pearlMaterialFiveTone = new THREE.MeshToonMaterial({
  color: 0x049ef4,
  gradientMap: fiveTone,
});

const pearl2 = new THREE.Mesh(pearlGeometry, pearlMaterialFiveTone);
pearl2.position.y = -120;
scene.add(pearl2);


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