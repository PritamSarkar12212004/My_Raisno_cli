import { Platform, PermissionsAndroid } from 'react-native';
const PermissionChaker = async (): Promise<boolean> => {
  if (Platform.OS === 'android') {
    try {
      if (Platform.Version >= 33) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES, // PDFs treated as "media"
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } else if (Platform.Version >= 29) {
        // Android 10–12 (Scoped Storage)
        return true;
      } else {
        // Android 9 and below
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message:
              'This app needs access to your storage to download PDF files',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
    } catch (err) {
      console.warn('Permission error:', err);
      return false;
    }
  }
  // iOS automatically has permission to its sandbox
  return true;
};

export default PermissionChaker;
