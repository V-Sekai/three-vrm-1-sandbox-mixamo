/* global THREE, THREE_VRM */

/**
 * VRMを読み込む
 */
function loadVRM( modelUrl ) { // モデルを読み込む処理
  const loader = new THREE.GLTFLoader(); // GLTFを読み込むLoader
  
  loader.register( ( parser ) => new THREE_VRM.VRMLoaderPlugin( parser ) ); // GLTFLoaderにVRMLoaderPluginをインストール
  
  return loader.loadAsync( modelUrl ).then( ( gltf ) => {
    const vrm = gltf.userData.vrm; // VRMを制御するためのクラス `VRM` が `gltf.userData.vrm` に入っています
    
    THREE_VRM.VRMUtils.rotateVRM0( vrm ); // 読み込んだモデルがVRM0.0の場合は回す
    
    return vrm;
  } );
}
