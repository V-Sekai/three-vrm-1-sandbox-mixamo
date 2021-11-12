/* global THREE, THREE_VRM, mixamoVRMRigMap */

function loadMixamoAnimation( url ) {
  const loader = new THREE.FBXLoader();
  loader.loadAsync( url ).then( ( asset ) => {
    const clip = asset.animations.find( ( clip ) => clip.name === 'mixamo.com' );
    clip.tracks.forEach( ( track ) => {
      const trackSplitted = track.name.split( '.' );
      const mixamoRigName = trackSplitted[ 0 ];
      const vrmBoneName = mixamoVRMRigMap[ mixamoRigName ];
      const propertyName = trackSplitted[ 1 ];
    } );
  } );
}
