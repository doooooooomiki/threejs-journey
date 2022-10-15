import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

import fragment from '../shaders/fragment.glsl';
import vertex from '../shaders/vertex.glsl';


export class Sketch {
  constructor(options) {

    this.clock = new THREE.Clock();
    
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      75,
      options.canvas.offsetWidth / options.canvas.offsetHeight,
      0.001,
      1000,
    );

    this.camera.position.z = 1;

    this.scene.add(this.camera);

    this.renderer = new THREE.WebGLRenderer({
      canvas: options.canvas,
      antialias: true,
    });

    this.renderer.setSize(
      options.canvas.offsetWidth, 
      options.canvas.offsetHeight, 
      false,
    );

    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.renderer.setAnimationLoop(this.animationLoop.bind(this));

    this.addObject();

    this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
    this.orbitControls.enableDamping = true;

    window.addEventListener('resize', this.onWindowResize.bind(this));

  }

  onWindowResize() {
    const width = this.renderer.domElement.offsetWidth;
    const height = this.renderer.domElement.offsetHeight;
  
    this.renderer.setSize(width, height, false);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  addObject() {
    this.geometry = new THREE.PlaneGeometry( 1, 1 );
    this.material = new THREE.MeshNormalMaterial();

    this.shaderMaterial = new THREE.ShaderMaterial( {

      side: THREE.DoubleSide,
    
      vertexShader: vertex,
      
      fragmentShader: fragment,
    
    } );

    this.mesh = new THREE.Mesh(this.geometry, this.shaderMaterial);
    this.scene.add(this.mesh);
  }

  animationLoop() {
    // this.mesh.rotation.x = Math.sin(this.clock.getElapsedTime());
    // this.mesh.rotation.y = Math.cos(this.clock.getElapsedTime());
    this.renderer.render(this.scene, this.camera);
  }
}