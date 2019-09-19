/* global THREE */

const width = window.innerWidth;
const height = window.innerHeight;

// -- renderer --
const renderer = new THREE.WebGLRenderer();
renderer.setSize( width, height );
document.body.appendChild( renderer.domElement );

// -- camera --
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.set( 0.0, 0.0, 5.0 );

// -- scene --
const scene = new THREE.Scene();

// -- cube --
const geometry = new THREE.BoxGeometry( 1.0, 1.0, 1.0 );
const material = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

// -- light --
const light = new THREE.DirectionalLight( 0xffffff );
light.position.set( 1.0, 1.0, 1.0 ).normalize();
scene.add( light );

// -- update --
const clock = new THREE.Clock();
clock.start();

function update() {
  requestAnimationFrame( update );
  
  const delta = clock.getDelta();

  cube.rotation.x += delta;
  cube.rotation.y += delta;

  renderer.render( scene, camera );
};
update();
