import './index.css';

import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

import knightAsset from './assets/knight/gltf/KnightCharacter.glb';

import {
  Color,
  DirectionalLight,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three';

const scene = new Scene();
scene.background = new Color('white');
const camera = new PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.set(0, 0, 20);

const gltfLoader = new GLTFLoader();

gltfLoader.load(knightAsset, gltf => {
  scene.add(gltf.scene);
});

const animate = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};

animate();

const addLight = (x: number, y: number, z: number) => {
  const color = 0xffffff;
  const intensity = 1;
  const light = new DirectionalLight(color, intensity);
  light.position.set(x, y, z);
  scene.add(light);
  scene.add(light.target);
};
addLight(10, 10, 10);
addLight(-10, 10, 10);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 5, 0);
controls.update();
