/* global THREE, THREE_VRM */

const mixamoVRMRigMap = {
  'mixamorigHips': 'hips',
  'mixamorigSpine': 'spine',
  'mixamorigSpine1': 'chest',
  'mixamorigSpine2': 'upperChest',
  'mixamorigNeck': 'neck',
  'mixamorigHead': 'head',
  'mixamorigLeftShoulder': 'leftShoulder',
  'mixamorigLeftArm': 'leftUpperArm',
  'mixamorigLeftForeArm': 'leftLowerArm',
  'mixamorigLeftHand': 'leftHand',
  'mixamorigLeftHandThumb1': 'leftHandThumbProximal',
  'mixamorigLeftHandThumb2': 'leftHandThumbIntermediate',
  'mixamorigLeftHandThumb3': 'leftHandThumbDistal',
  'mixamorigLeftHandIndex1': 'leftHandIndexProximal',
  'mixamorigLeftHandIndex2': 'leftHandIndexIntermediate',
  'mixamorigLeftHandIndex3': 'leftHandIndexDistal',
  'mixamorigLeftHandMiddle1': 'leftHandMiddleProximal',
  'mixamorigLeftHandMiddle2': 'leftHandMiddleIntermediate',
  'mixamorigLeftHandMiddle3': 'leftHandMiddleDistal',
  'mixamorigLeftHandRing1': 'leftHandRingProximal',
  'mixamorigLeftHandRing2': 'leftHandRingIntermediate',
  'mixamorigLeftHandRing3': 'leftHandRingDistal',
  'mixamorigLeftHandPinky1': 'leftHandLittleProximal',
  'mixamorigLeftHandPinky2': 'leftHandLittleIntermediate',
  'mixamorigLeftHandPinky3': 'leftHandLittleDistal',
  'mixamorigRightShoulder': 'rightShoulder',
  'mixamorigRightArm': 'rightUpperArm',
  'mixamorigRightForeArm': 'rightLowerArm',
  'mixamorigRightHand': 'rightHand',
  'mixamorigRightHandPinky1': 'rightHandLittleProximal',
  'mixamorigRightHandPinky2': 'rightHandLittleIntermediate',
  'mixamorigRightHandPinky3': 'rightHandLittleDistal',
  'mixamorigRightHandRing1': 'rightHandRingProximal',
  'mixamorigRightHandRing2': 'rightHandRingIntermediate',
  'mixamorigRightHandRing3': 'rightHandRingDistal',
  'mixamorigRightHandMiddle1': 'rightHandMiddleProximal',
  'mixamorigRightHandMiddle2': 'rightHandMiddleIntermediate',
  'mixamorigRightHandMiddle3': 'rightHandMiddleDistal',
  'mixamorigRightHandIndex1': 'rightHandIndexProximal',
  'mixamorigRightHandIndex2': 'rightHandIndexIntermediate',
  'mixamorigRightHandIndex3': 'rightHandIndexDistal',
  'mixamorigRightHandThumb1': 'rightHandThumbProximal',
  'mixamorigRightHandThumb2': 'rightHandThumbIntermediate',
  'mixamorigRightHandThumb3': 'rightHandThumbDistal',
  'mixamorigLeftUpLeg': 'leftUpperLeg',
  'mixamorigLeftLeg': 'leftLowerLeg',
  'mixamorigLeftFoot': 'leftFoot',
  'mixamorigLeftToeBase': 'leftToes',
  'mixamorigRightUpLeg': 'rightUpperLeg',
  'mixamorigRightLeg': 'rightLowerLeg',
  'mixamorigRightFoot': 'rightFoot',
  'mixamorigRightToeBase': 'rightToes',
};

function loadMixamoAnimation( url ) {
  const loader = new THREE.FBXLoader();
  loader.loadAsync( url ).then( ( asset ) => {
    const clip = asset.animations.find( ( clip ) => clip.name === 'mixamo.com' );
    clip.tracks.forEach( ( track ) => {
      const trackSplitted = track.name.split( '.' );
      const vrmBoneName = mixamoVRMRigMap[ trackSplitted[ 0 ] ];
      const propertyName = trackSplitted[ 1 ];
    } );
  } );
}
