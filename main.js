/* global THREE, THREE_VRM */

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

function initVRM( modelUrl ) { // モデルが読み込まれたあとの処理
  const loader = new THREE.GLTFLoader(); // GLTFを読み込むLoader
  
  loader.register( ( parser ) => new THREE_VRM.VRMLoaderPlugin( parser ) ); // GLTFLoaderにVRMLoaderPluginをインストール
  
  loader.loadAsync( modelUrl ).then( ( gltf ) => {
    const vrm = gltf.userData.vrm; // VRMを制御するためのクラス `VRM` が `gltf.userData.vrm` に入っています
    scene.add( vrm.scene ); // モデルをsceneに追加し、表示できるようにする
    currentVRM = vrm; // currentGLTFにvrmを代入
    
    THREE_VRM.VRMUtils.rotateVRM0( vrm ); // 読み込んだモデルがVRM0.0の場合

    const head = vrm.humanoid.getBoneNode( 'head' ); // vrmの頭を参照する
    camera.position.set( 0.0, head.getWorldPosition(new THREE.Vector3()).y, 2.0 ); // カメラを頭が中心に来るように動かす
  } );
}

const modelUrl = 'https://cdn.glitch.me/c4e5cfb3-513e-4d82-a37f-62836378466b%2Fthree-vrm-girl-1.0-beta.vrm?v=1636610288920'; // モデルのURL
initVRM( modelUrl );

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

  renderer.render( scene, camera );
};
update();
