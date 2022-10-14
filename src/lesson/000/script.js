import '/style.css';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';

const data = {

  camera: {
    fov: 75,
    aspect: window.innerWidth / window.innerHeight,
    near: 1,
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
 * LoadingManager
 * Handles and keeps track of loaded and pending data. 
 * A default global instance of this class is created and used by loaders if not supplied manually
 * https://threejs.org/docs/?q=loadingm#api/en/loaders/managers/LoadingManager
 * 
 * LoadingManager( onLoad : Function, onProgress : Function, onError : Function )
 */
const loadingManager = new THREE.LoadingManager();

loadingManager.onStart = function() {
  console.log("on start");
};

loadingManager.onLoad = function() {
  console.log("on load");
};

loadingManager.onProgress = function() {
  console.log("on progress");
};

loadingManager.onError = function() {
  console.log("on error");
};

/**
 * TextureLoader
 * Class for loading a texture
 * https://threejs.org/docs/?q=texture#api/en/loaders/TextureLoader
 * 
 * TextureLoader( manager : LoadingManager )
 * .load ( url : String, onLoad : Function, onProgress : Function, onError : Function ) : Texture
 */
 const textureLoader = new THREE.TextureLoader(loadingManager);
 const textureColor = textureLoader.load("./textures/color.jpg");
 const textureAmbientOcclusion = textureLoader.load("./textures/ambientOcclusion.jpg");
 const textureHeight = textureLoader.load("./textures/height.png");
 const textureMetallic = textureLoader.load("./textures/metallic.jpg");
 const textureNormal = textureLoader.load("./textures/normal.jpg");
 const textureAlpha = textureLoader.load("./textures/alpha.jpg");
 const textureRoughness = textureLoader.load("./textures/roughness.jpg");

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
  map: textureColor,
});

cube.position.set(0, 0, 0);
scene.add(cube);

gui
  .addColor(data.cube.material, 'color')
  .onChange(() => cube.material.color.set(data.cube.material.color))
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