/* global THREE, THREE_VRM, loadMixamoAnimation */

const width = window.innerWidth;
const height = window.innerHeight;

// -- renderer -------------------------------------------------------------------------------------
const renderer = new THREE.WebGLRenderer();
renderer.setSize( width, height );
renderer.outputEncoding = THREE.sRGBEncoding;
document.body.appendChild( renderer.domElement );

// -- camera ---------------------------------------------------------------------------------------
const camera = new THREE.PerspectiveCamera( 30.0, width / height, 0.01, 20.0 );
camera.position.set( 0.0, 0.0, 5.0 );

// -- scene ----------------------------------------------------------------------------------------
const scene = new THREE.Scene();

// -- vrm ------------------------------------------------------------------------------------------
let currentVRM = undefined; // 現在使用中のvrm、update内で使えるようにするため
let currentMixer = undefined;

function initVRM( modelUrl ) { // モデルが読み込まれたあとの処理
  const loader = new THREE.GLTFLoader(); // GLTFを読み込むLoader
  
  loader.register( ( parser ) => new THREE_VRM.VRMLoaderPlugin( parser ) ); // GLTFLoaderにVRMLoaderPluginをインストール
  
  return loader.loadAsync( modelUrl ).then( ( gltf ) => {
    const vrm = gltf.userData.vrm; // VRMを制御するためのクラス `VRM` が `gltf.userData.vrm` に入っています
    scene.add( vrm.scene ); // モデルをsceneに追加し、表示できるようにする
    currentVRM = vrm; // currentGLTFにvrmを代入
    console.log( vrm );
    
    THREE_VRM.VRMUtils.rotateVRM0( vrm ); // 読み込んだモデルがVRM0.0の場合

    const head = vrm.humanoid.getBoneNode( 'head' ); // vrmの頭を参照する
    camera.position.set( 0.0, head.getWorldPosition(new THREE.Vector3()).y, 6.0 ); // カメラを頭が中心に来るように動かす
    
    return vrm;
  } );
}

const modelUrl = 'https://cdn.glitch.me/c4e5cfb3-513e-4d82-a37f-62836378466b%2Fthree-vrm-girl-1.0-beta.vrm?v=1636610288920'; // モデルのURL
const animationUrl = 'https://cdn.glitch.me/16b81be8-1f14-4a44-b78f-c3f6da842ee7%2FDancing%20(1).fbx?v=1636707337661';

initVRM( modelUrl ).then( ( vrm ) => {
  currentMixer = new THREE.AnimationMixer( vrm.scene );
  
  loadMixamoAnimation( animationUrl, vrm ).then( ( clip ) => {
    currentMixer.clipAction( clip ).play();
  } );
} );

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

  if ( currentVRM ) { // VRMが読み込まれていれば
    currentVRM.update( delta ); // VRMの各コンポーネントを更新
  }
  
  if ( currentMixer ) {
    currentMixer.update( delta );
  }

  renderer.render( scene, camera );
};
update();
