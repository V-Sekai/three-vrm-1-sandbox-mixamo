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
let currentGLTF = undefined; // 現在使用中のgltf、update内で使えるようにするため

function initGLTF( gltf ) {
  scene.add( gltf.scene ); // gltfのモデルをsceneに追加
  gltf.scene.scale.set( 20.0, 20.0, 20.0 ); // 小さすぎるので大きさを20倍に
  currentGLTF = gltf; // currentGLTFにgltfを代入
}

const loader = new THREE.GLTFLoader();
loader.load(
  'https://cdn.glitch.com/0a36e09b-3913-4217-902a-b2292d472997%2FAvocado.glb?v=1568864419285',
  ( gltf ) => { initGLTF( gltf ); }, // もでる
  ( progress ) => { console.info( ( 100.0 * progress.loaded / progress.total ).toFixed( 2 ) + '% loaded' ); }, // モデル読み込みの進捗を表示
  ( error ) => { console.error( error ); } // モデル読み込み時のエラーを表示
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
    currentGLTF.scene.rotation.y += delta;
  }

  renderer.render( scene, camera );
};
update();
