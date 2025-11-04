import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import { Platform, Alert, PermissionsAndroid } from 'react-native';

export class PDFDownloader {
  // ✅ Handle permissions safely for all Android versions
  static async checkPermissions(): Promise<boolean> {
    if (Platform.OS === 'android') {
      try {
        if (Platform.Version >= 33) {
          // Android 13+ (Scoped Storage, new permissions)
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES // PDFs are treated as "media"
          );
          return granted === PermissionsAndroid.RESULTS.GRANTED;
        } else if (Platform.Version >= 29) {
          // Android 10–12 (Scoped Storage): no explicit permission required
          return true;
        } else {
          // Android 9 and below: need WRITE_EXTERNAL_STORAGE
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: 'Storage Permission Required',
              message: 'This app needs access to your storage to download PDF files',
              buttonPositive: 'OK',
            }
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
  }

  // ✅ Download PDF file to Downloads or Documents
  static async downloadPDF(base64Data: string, fileName: string): Promise<void> {
    try {
      // 1. Check storage permission
      const hasPermission = await this.checkPermissions();
      if (!hasPermission) {
        Alert.alert('Permission Denied', 'Storage permission is required to download PDF files');
        return;
      }

      // 2. Clean Base64 input
      const cleanBase64 = base64Data
        .replace(/\s/g, '')
        .replace(/^data:application\/pdf;base64,/, '');

      // 3. File save location
      const path =
        Platform.OS === 'ios'
          ? `${RNFS.DocumentDirectoryPath}/${fileName}.pdf`
          : `${RNFS.DownloadDirectoryPath}/${fileName}.pdf`;

      // 4. Write the file
      await RNFS.writeFile(path, cleanBase64, 'base64');
      console.log('✅ PDF downloaded successfully at:', path);

      // 5. Notify user
      if (Platform.OS === 'ios') {
        // iOS: share so user can save it manually
        await Share.open({
          url: `file://${path}`,
          type: 'application/pdf',
          filename: fileName,
          saveToFiles: true,
        });
      } else {
        // Android: show success message
        Alert.alert(
          'Download Complete',
          `PDF saved to your Downloads folder as ${fileName}.pdf`,
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('❌ Download error:', error);
      Alert.alert('Download Failed', 'Failed to download PDF file. Please try again.');
    }
  }

  // ✅ Share PDF (without saving to permanent folder)
  static async sharePDF(base64Data: string, fileName: string): Promise<void> {
    try {
      // 1. Clean Base64 input
      const cleanBase64 = base64Data
        .replace(/\s/g, '')
        .replace(/^data:application\/pdf;base64,/, '');

      // 2. Write temporary file
      const path = `${RNFS.TemporaryDirectoryPath}/${fileName}.pdf`;
      await RNFS.writeFile(path, cleanBase64, 'base64');

      // 3. Share the file
      await Share.open({
        url: `file://${path}`,
        type: 'application/pdf',
        filename: fileName,
        subject: fileName, // For email subjects
      });
    } catch (error) {
      console.error('❌ Share error:', error);
    }
  }
}
