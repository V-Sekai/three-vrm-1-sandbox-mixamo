/* global THREE, THREE_VRM */

function loadMixamoAnimation( url ) {
  const loader = new THREE.FBXLoader();
  loader.loadAsync( url ).then( ( asset ) => {
    const clip = asset.animations.find( ( clip ) => clip.name === 'mixamo.com' );
    console.log( clip );
  } );
}
