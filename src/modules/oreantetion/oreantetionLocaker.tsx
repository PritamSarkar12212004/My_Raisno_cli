import React from 'react';
import { OrientationLocker, PORTRAIT } from 'react-native-orientation-locker';

const OrientationLock = () => {
  return (
    <OrientationLocker
      orientation={PORTRAIT}
    />
  );
};

export default OrientationLock;
