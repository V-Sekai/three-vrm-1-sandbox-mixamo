/* global THREE, THREE_VRM, mixamoVRMRigMap */

/**
 * Mixamoのアニメーションを読み込み、
 */
function loadMixamoAnimation( url, vrm ) {
  const loader = new THREE.FBXLoader(); // FBXを読み込むLoader
  return loader.loadAsync( url ).then( ( asset ) => {
    const clip = THREE.AnimationClip.findByName( asset.animations, 'mixamo.com' );
    
    const tracks = [];

    clip.tracks.forEach( ( track ) => {
      const trackSplitted = track.name.split( '.' );
      const mixamoRigName = trackSplitted[ 0 ];
      const vrmBoneName = mixamoVRMRigMap[ mixamoRigName ];
      const vrmNodeName = vrm.humanoid?.getBoneNode( vrmBoneName )?.name;
      
      if ( vrmNodeName != null ) {
        const propertyName = trackSplitted[ 1 ];

        if ( track instanceof THREE.QuaternionKeyframeTrack ) {
          tracks.push( new THREE.QuaternionKeyframeTrack(
            `${ vrmNodeName }.${ propertyName }`,
            track.times,
            track.values,
          ) );
        } else if ( track instanceof THREE.VectorKeyframeTrack ) {
          tracks.push( new THREE.VectorKeyframeTrack(
            `${ vrmNodeName }.${ propertyName }`,
            track.times,
            track.values.map( ( v ) => v * 0.01 ),
          ) );
        }
      }
    } );
    
    return new THREE.AnimationClip( 'vrmAnimation', clip.duration, tracks );
  } );
}
