import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

import fragment from '../shaders/fragment.frag';
import colormix from '../shaders/colormix.frag';
import arch from '../shaders/arch.vert';
import wave from '../shaders/wave.vert';
import noise from '../shaders/noise.vert';


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

    this.camera.position.z = 2;

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
    this.geometry = new THREE.PlaneGeometry( 0.4, 0.4, 64, 64 );

    this.noiseShaderMaterial = new THREE.ShaderMaterial( {

      side: THREE.DoubleSide,

      // wireframe: true,

      uniforms: {
        time: { value: 0 },
      },
    
      vertexShader: noise,
      
      fragmentShader: colormix,
    
    } );

    this.archShaderMaterial = new THREE.ShaderMaterial( {

      side: THREE.DoubleSide,

      wireframe: true,

      uniforms: {
        time: { value: 0 },
      },
    
      vertexShader: arch,
      
      fragmentShader: fragment,
    
    } );

    this.waveShaderMaterial = new THREE.ShaderMaterial( {

      side: THREE.DoubleSide,

      wireframe: true,

      uniforms: {
        time: { value: 0 },
      },
    
      vertexShader: wave,
      
      fragmentShader: fragment,
    
    } );

    this.group = new THREE.Group();

    this.mesh1 = new THREE.Mesh(this.geometry, this.noiseShaderMaterial);
    this.mesh1.position.y = -0.8;
    this.group.add(this.mesh1);

    this.mesh2 = new THREE.Mesh(this.geometry, this.archShaderMaterial);
    this.group.add(this.mesh2);

    this.mesh3 = new THREE.Mesh(this.geometry, this.waveShaderMaterial);
    this.mesh3.position.y = 0.8;
    this.group.add(this.mesh3);

    this.scene.add(this.group);
    this.camera.lookAt(this.group.position);
  }

  animationLoop() {
    this.noiseShaderMaterial.uniforms.time.value = this.clock.getElapsedTime();
    this.archShaderMaterial.uniforms.time.value = this.clock.getElapsedTime();
    this.waveShaderMaterial.uniforms.time.value = this.clock.getElapsedTime();
    this.renderer.render(this.scene, this.camera);
  }
}