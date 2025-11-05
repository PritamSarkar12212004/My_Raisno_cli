import { Platform } from 'react-native';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import PermissionChaker from '../../modules/permission/PermissionChaker';
import FlashMsg from '../../components/global/flash/FlashMsg';

const downloadPDF = async (
  base64Data: string,
  fileName: string,
): Promise<void> => {
  try {
    const hasPermission = await PermissionChaker();
    if (!hasPermission) {
      FlashMsg({
        message: 'Permission Denied',
        description: 'Storage permission is required to download PDF files',
        type: 'danger',
      });
      return;
    }

    const cleanBase64 = base64Data
      .replace(/\s/g, '')
      .replace(/^data:application\/pdf;base64,/, '');

    const baseDir =
      Platform.OS === 'ios'
        ? RNFS.DocumentDirectoryPath
        : RNFS.DownloadDirectoryPath;

    const customFolder = `${baseDir}/My_Raisno`;

    const folderExists = await RNFS.exists(customFolder);
    if (!folderExists) {
      await RNFS.mkdir(customFolder);
    }
    const path = `${customFolder}/${fileName}.pdf`;
    await RNFS.writeFile(path, cleanBase64, 'base64');

    FlashMsg({
      message: 'PDF Download Complete',
      description: `Saved to ${Platform.OS === 'ios' ? 'Documents' : 'Downloads/My_Raisno'}`,
      type: 'success',
    });

    if (Platform.OS === 'ios') {
      await Share.open({
        url: `file://${path}`,
        type: 'application/pdf',
        filename: fileName,
        saveToFiles: true,
      });
    }

    FlashMsg({
      message: 'PDF Download Complete',
      description: `Saved to ${Platform.OS === 'ios' ? 'Documents' : 'Downloads/My_Raisno'}`,
      type: 'success',
    });
  } catch (error) {
    console.error('❌ Download error:', error);
    FlashMsg({
      message: 'Download Failed',
      description: 'Failed to download PDF file. Please try again.',
      type: 'danger',
    });
  }
};

export default downloadPDF;
