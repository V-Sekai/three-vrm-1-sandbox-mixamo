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
let currentMixer = undefined; // 現在使用中のAnimationMixer、update内で使えるようにするため

function initVRM( modelUrl ) { // モデルを読み込む処理
  const loader = new THREE.GLTFLoader(); // GLTFを読み込むLoader
  
  loader.register( ( parser ) => new THREE_VRM.VRMLoaderPlugin( parser ) ); // GLTFLoaderにVRMLoaderPluginをインストール
  
  return loader.loadAsync( modelUrl ).then( ( gltf ) => {
    const vrm = gltf.userData.vrm; // VRMを制御するためのクラス `VRM` が `gltf.userData.vrm` に入っています
    scene.add( vrm.scene ); // モデルをsceneに追加し、表示できるようにする
    currentVRM = vrm; // currentGLTFにvrmを代入
    
    THREE_VRM.VRMUtils.rotateVRM0( vrm ); // 読み込んだモデルがVRM0.0の場合

    const head = vrm.humanoid.getBoneNode( 'head' ); // vrmの頭を参照する
    camera.position.set( 0.0, head.getWorldPosition(new THREE.Vector3()).y, 6.0 ); // カメラを頭が中心に来るように動かす
    
    return vrm;
  } );
}

const modelUrl = 'https://cdn.glitch.me/c4e5cfb3-513e-4d82-a37f-62836378466b%2Fthree-vrm-girl-1.0-beta.vrm?v=1636610288920'; // モデルのURL
const animationUrl = 'https://cdn.glitch.me/16b81be8-1f14-4a44-b78f-c3f6da842ee7%2FGangnam%20Style.fbx?v=1636708670740'; // MixamoのアニメーションのURL

// See: https://threejs.org/docs/#manual/en/introduction/Animation-system
initVRM( modelUrl ).then( ( vrm ) => { // vrmを読み込む
  currentMixer = new THREE.AnimationMixer( vrm.scene ); // vrmのAnimationMixerを作る
  currentMixer.timeScale = 4; // 早回しにする
  
  loadMixamoAnimation( animationUrl, vrm ).then( ( clip ) => { // アニメーションを読み込む
    currentMixer.clipAction( clip ).play(); // アニメーションをMixerに適用してplay
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

  const delta = clock.getDelta(); // 前フレームとの差分時間を取得
  
  if ( currentMixer ) { // アニメーションが読み込まれていれば
    currentMixer.update( delta ); // アニメーションをアップデート
  }

  if ( currentVRM ) { // VRMが読み込まれていれば
    currentVRM.update( delta ); // VRMの各コンポーネントを更新
  }

  renderer.render( scene, camera ); // 描画
};
update();
