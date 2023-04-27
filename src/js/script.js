import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';
import nebula from '../images/nebula.jpg'
import stars from '../images/stars.jpg'

const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75, window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const orbit = new OrbitControls(camera, renderer.domElement)
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);
camera.position.set(0, 2, 5);
orbit.update();
renderer.render(scene, camera);


const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00FF00 });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);


const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshStandardMaterial({
    color: 0xFFFFFF,
    side: THREE.DoubleSide
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane)
plane.rotation.x = -0.5 * Math.PI;
plane.receiveShadow = true;



const gridHelper = new THREE.GridHelper(30, 50);
scene.add(gridHelper);



const sphereGeometry = new THREE.SphereGeometry(1, 50, 50);
const sphereMaterial = new THREE.MeshStandardMaterial({
    color: 0x0000FF,
    wireframe: false
});

const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.x = -5
scene.add(sphere);
sphere.castShadow = true;


const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

// const directionalLight = new THREE.DirectionalLight(0xFFFFFF,0.8)
// scene.add(directionalLight);
// directionalLight.position.set(-30,50,0);
// directionalLight.castShadow = true;

// const dLightHelper = new THREE.DirectionalLightHelper(directionalLight,5);
// scene.add(dLightHelper);

// const dLightShadowHelper  = new THREE.CameraHelper(directionalLight.shadow.camera);
// scene.add(dLightShadowHelper);
const spotLight = new THREE.SpotLight(0xFFFFFF);
scene.add(spotLight);
spotLight.position.set(-100, 100, 0);
spotLight.castShadow = true;
spotLight.angle = 0.1;

const sLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(sLightHelper);

const textureLoader = new THREE.TextureLoader();
// scene.background = textureLoader.load(stars);

const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
    nebula,
    nebula,
    stars,
    stars,
    stars,
    stars

]);

const box2Geometry = new THREE.BoxGeometry(4, 4, 4)
const box2Material = new THREE.MeshBasicMaterial({
    map: textureLoader.load(nebula)
});
const box2 = new THREE.Mesh(box2Geometry, box2Material);
scene.add(box2);
box2.position.set(0, 15, 10);


const gui = new dat.GUI();
const options = {
    sphereColor: '#ffea00',
    wireframe: false,
    speed: 0.01,
    angle: 0.02,
    penumbra: 0,
    intensity: 1
}
gui.addColor(options, 'sphereColor').onChange(function (e) {
    sphere.material.color.set(e);
});

gui.add(options, 'wireframe').onChange(function (e) {
    sphere.material.wireframe = e;
});

gui.add(options, 'speed', 0, 0.1);
gui.add(options, 'angle', 0, 0.1);
gui.add(options, 'penumbra', 0, 0.1);
gui.add(options, 'intensity', 0, 1);

let step = 0;
// let speed = 0.01;

const mousePosition = new THREE.Vector2();
window.addEventListener('mousemove', function (e) {
    mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1 ;
    mousePosition.y = (e.clientY / window.innerHeight) * 2 + 1;
});

const rayCaster = new THREE.Raycaster();

function animate() {
    box.rotation.x += 0.01;
    box.rotation.y += 0.01;
    step += options.speed;
    sphere.position.y = 2 * Math.abs(Math.sin(step));
    // plane.rotation.z += 0.01;
    // gridHelper.rotation.y += 0.01;
    spotLight.angle = options.angle;
    spotLight.penumbra = options.penumbra;
    spotLight.intensity = options.intensity;
    rayCaster.setFromCamera(mousePosition,camera);
    const int
    renderer.render(scene, camera);

}

renderer.setAnimationLoop(animate);