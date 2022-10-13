import './style.css';
import threeToneUrl from './tones/threeTone.jpeg'
import fiveToneUrl from './tones/fiveTone.jpeg'
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
camera.position.set(0, 0, 500);
scene.add(camera);

// PointLight
// A light that gets emitted from a single point in all directions. 
// A common use case for this is to replicate the light emitted from a bare lightbulb.
const color = 0xffffff; // default value
const intensity = 1; // default value
const pointlight = new THREE.PointLight(color, intensity);
pointlight.position.set(200, 200, 200);
scene.add(pointlight);

// SphereGeometry
// A class for generating sphere geometries.
const pearlRadius = 100;
const pearlWidthSegments = 64; // number of horizontal segments. Minimum value is 3, and the default is 32.
const pearlHeightSegments = 64; // number of vertical segments. Minimum value is 2, and the default is 16.
const pearlGeometry = new THREE.SphereGeometry(pearlRadius, pearlWidthSegments, pearlHeightSegments);

// TextureLoader
// Class for loading a texture. This uses the ImageLoader internally for loading files.
const pearlTextureLoader = new THREE.TextureLoader();

const threeTone = pearlTextureLoader.load(threeToneUrl);
threeTone.minFilter = THREE.NearestFilter;
threeTone.magFilter = THREE.NearestFilter;

// MeshToonMaterial
// A material implementing toon shading.
// https://en.wikipedia.org/wiki/Cel_shading
// https://threejs.org/docs/?q=MeshToonMaterial#api/en/materials/MeshToonMaterial
const pearlMaterialThreeTone = new THREE.MeshToonMaterial({
  color: 0x049ef4,
  gradientMap: threeTone,
});

const pearl1 = new THREE.Mesh(pearlGeometry, pearlMaterialThreeTone);
pearl1.position.y = 120;

const fiveTone = pearlTextureLoader.load(fiveToneUrl);
fiveTone.minFilter = THREE.NearestFilter;
fiveTone.magFilter = THREE.NearestFilter;

const pearlMaterialFiveTone = new THREE.MeshToonMaterial({
  color: 0x049ef4,
  gradientMap: fiveTone,
});

const pearl2 = new THREE.Mesh(pearlGeometry, pearlMaterialFiveTone);
pearl2.position.y = -120;

const pearlGroup = new THREE.Group();
pearlGroup.add(pearl1);
pearlGroup.add(pearl2);
scene.add(pearlGroup);

camera.lookAt(pearlGroup.position);

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