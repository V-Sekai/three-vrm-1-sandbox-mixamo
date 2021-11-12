/* global THREE, THREE_VRM, mixamoVRMRigMap */

function loadMixamoAnimation( url, vrm ) {
  const loader = new THREE.FBXLoader();
  return loader.loadAsync( url ).then( ( asset ) => {
    const clip = asset.animations.find( ( clip ) => clip.name === 'mixamo.com' );
    
    const tracks = [];

    clip.tracks.forEach( ( track ) => {
      const trackSplitted = track.name.split( '.' );
      const mixamoRigName = trackSplitted[ 0 ];
      const vrmBoneName = mixamoVRMRigMap[ mixamoRigName ];
      const propertyName = trackSplitted[ 1 ];
      
      if ( track instanceof THREE.QuaternionKeyframeTrack ) {
        tracks.push( new THREE.QuaternionKeyframeTrack(
          `${ vrmBoneName }.${ propertyName }`,
          track.times,
          track.values,
        ) );
      } else if ( track instanceof THREE.VectorKeyframeTrack ) {
        tracks.push( new THREE.VectorKeyframeTrack(
          `${ vrmBoneName }.${ propertyName }`,
          track.times,
          track.values,
        ) );
      }
    } );
    
    console.log(tracks);
    console.log(vrm);
    
    return new THREE.AnimationClip( 'vrmAnimation', clip.duration, tracks );
  } );
}
