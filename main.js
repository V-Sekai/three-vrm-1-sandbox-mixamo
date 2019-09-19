/* global THREE */

const width = window.innerWidth;
const height = window.innerHeight;

// -- renderer --
const renderer = new THREE.WebGLRenderer();
renderer.setSize( width, height );
document.body.appendChild( renderer.domElement );

// -- camera --
const camera = new THREE.PerspectiveCamera( 30, width / height, 0.01, 20.0 );
camera.position.set( 0.0, 0.0, 5.0 );

// -- scene --
const scene = new THREE.Scene();

// -- avocado (gltf) --
let currentGLTF = undefined;

function initGLTF( gltf ) {
  scene.add( gltf.scene );
  gltf.scene.scale.set( 20.0, 20.0, 20.0 );
  currentGLTF = gltf;
}

const loader = new THREE.GLTFLoader();
loader.load(
  'https://cdn.glitch.com/0a36e09b-3913-4217-902a-b2292d472997%2FAvocado.glb?v=1568864419285',
  ( gltf ) => { initGLTF( gltf ); },
  ( progress ) => { console.info( 100.0 * progress.loaded / progress.total, '% loaded' ); },
  ( error ) => { console.error( error ); }
);

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

  if ( currentGLTF ) {
    currentGLTF.scene.rotation.x += delta;
    currentGLTF.scene.rotation.y += delta;
  }

  renderer.render( scene, camera );
};
update();
