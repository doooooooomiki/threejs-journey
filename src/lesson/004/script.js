import '/style.css';

import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'

const data = {

  camera: {
    fov: 75,
    aspect: window.innerWidth / window.innerHeight,
    near: 0.01,
    far: 1000,
  },

  renderer: {
    maxPixelRatio: 2,
    updateStyle: false,
  },

  pointlight: {
    color: 0xffffff,
    intensity: 1,
  },

  cube: {
    material: {
      color: 0x00ff00,
    },
  },

}

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
  data.camera.fov,
  data.camera.aspect,
  data.camera.near,
  data.camera.far,
);

camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

/**
 * PointLight
 * A light that gets emitted from a single point in all directions.
 * A common use case for this is to replicate the light emitted from a bare lightbulb.
 * https://threejs.org/docs/?q=PointLight#api/en/lights/PointLight
 * 
 * PointLight( color : Integer, intensity : Float, distance : Number, decay : Float )
 */
const pointlight = new THREE.PointLight(
  data.pointlight.color, 
  data.pointlight.intensity,
);

pointlight.position.set(200, 200, 200);
scene.add(pointlight);

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
  // color: data.cube.material.color,
});

cube.position.set(0, 0, 0);
scene.add(cube);

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

renderer.setSize(window.innerWidth, window.innerHeight, data.renderer.updateStyle);

renderer.setPixelRatio(Math.min(window.devicePixelRatio, data.renderer.maxPixelRatio));

renderer.setAnimationLoop(function() {
  orbitControls.update();
  renderer.render(scene, camera);
});

renderer.render(scene, camera);

const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableDamping = true;

function onWindowResize() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  renderer.setSize(width, height, data.renderer.updateStyle);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, data.renderer.maxPixelRatio));

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}
window.addEventListener('resize', onWindowResize)