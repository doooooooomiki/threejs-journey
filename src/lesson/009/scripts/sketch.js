import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

import ocean from '../shaders/ocean.frag';
import noise from '../shaders/noise.vert';

import oceanUrl from '../img/ines-alvarez.jpg';


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

    this.camera.position.z = 0.6;

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
    this.geometry = new THREE.PlaneGeometry( 0.4, 0.4, 32, 32 );

    this.noiseShaderMaterial = new THREE.ShaderMaterial( {

      side: THREE.DoubleSide,

      wireframe: true,

      uniforms: {
        time: { value: 0 },
        oceanTexture: { value: new THREE.TextureLoader().load(oceanUrl) },
      },

    
      vertexShader: noise,
      
      fragmentShader: ocean,
    
    } );


    this.mesh = new THREE.Mesh(this.geometry, this.noiseShaderMaterial);
    this.scene.add(this.mesh);
    this.camera.lookAt(this.mesh.position);
  }

  animationLoop() {
    this.noiseShaderMaterial.uniforms.time.value = this.clock.getElapsedTime();
    this.renderer.render(this.scene, this.camera);
  }
}