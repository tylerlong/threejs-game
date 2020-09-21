import './index.css';

import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three';

const scene = new Scene();
const camera = new PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new BoxGeometry();
const material = new MeshBasicMaterial({color: 0x00ff00});
const mesh = new Mesh(geometry, material);
scene.add(mesh);

camera.position.z = 5;

const animate = () => {
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;
  renderer.render(scene, camera);

  requestAnimationFrame(animate);
};

animate();
