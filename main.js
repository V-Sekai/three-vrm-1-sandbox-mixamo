/* global THREE */

const width = window.innerWidth;
const height = window.innerHeight;

// -- renderer -------------------------------------------------------------------------------------
const renderer = new THREE.WebGLRenderer();
renderer.setSize( width, height );
document.body.appendChild( renderer.domElement );

// -- camera ---------------------------------------------------------------------------------------
const camera = new THREE.PerspectiveCamera( 30.0, width / height, 0.01, 20.0 );
camera.position.set( 0.0, 0.0, 5.0 );

// -- scene ----------------------------------------------------------------------------------------
const scene = new THREE.Scene();

// -- vrm ------------------------------------------------------------------------------------------
let currentVRM = undefined;

function initVRM( gltf ) {
  THREE.VRM.from( gltf ).then( ( vrm ) => {
    scene.add( vrm.scene );
    currentVRM = vrm;

    const head = vrm.humanoid.getBoneNode( THREE.VRMSchema.HumanoidBoneName.Head );
    camera.position.set( 0.0, head.getWorldPosition(new THREE.Vector3()).y, 2.0 );
  } );
}

const loader = new THREE.GLTFLoader();
loader.load(
  'https://cdn.glitch.com/e9accf7e-65be-4792-8903-f44e1fc88d68%2Fthree-vrm-girl.vrm?v=1605264912635',
  ( gltf ) => { initVRM( gltf ); },
  ( progress ) => { console.info( ( 100.0 * progress.loaded / progress.total ).toFixed( 2 ) + '% loaded' ); },
  ( error ) => { console.error( error ); }
);

// -- light ----------------------------------------------------------------------------------------
const light = new THREE.DirectionalLight( 0xffffff );
light.position.set( 1.0, 1.0, 1.0 ).normalize();
scene.add( light );

// -- update ---------------------------------------------------------------------------------------
const clock = new THREE.Clock();
clock.start();

function update() {
  requestAnimationFrame( update );

  const delta = clock.getDelta();

  if ( currentVRM ) {
    currentVRM.scene.rotation.y = Math.PI * Math.sin( clock.getElapsedTime() );

    currentVRM.update( delta );
  }

  renderer.render( scene, camera );
};
update();
