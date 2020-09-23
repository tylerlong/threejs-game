import './index.css';

import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

import knightAsset from './assets/knight/gltf/KnightCharacter.glb';

import {
  Color,
  DirectionalLight,
  Group,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three';

const scene = new Scene();
scene.background = new Color('white');
const camera = new PerspectiveCamera(
  90,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);

const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.set(0, 0, 10);

const gltfLoader = new GLTFLoader();

let knightGroup: Group;
gltfLoader.load(knightAsset, gltf => {
  knightGroup = gltf.scene;
  scene.add(knightGroup);
});

const animate = (time: number) => {
  time /= 1000;
  if (knightGroup) {
    knightGroup.rotation.y = time;
  }
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};
requestAnimationFrame(animate);

const addLight = (x: number, y: number, z: number) => {
  const color = 0xffffff;
  const intensity = 1;
  const light = new DirectionalLight(color, intensity);
  light.position.set(x, y, z);
  scene.add(light);
};
addLight(10, 10, 11);
addLight(-10, 10, 11);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 5, 0);
controls.update();
