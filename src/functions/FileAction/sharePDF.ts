import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import FlashMsg from '../../components/global/flash/FlashMsg';
const sharePDF = async (
  base64Data: string,
  fileName: string,
): Promise<void> => {
  try {
    const cleanBase64 = base64Data
      .replace(/\s/g, '')
      .replace(/^data:application\/pdf;base64,/, '');
    const path = `${RNFS.TemporaryDirectoryPath}/${fileName}.pdf`;
    await RNFS.writeFile(path, cleanBase64, 'base64');

    await Share.open({
      url: `file://${path}`,
      type: 'application/pdf',
      filename: fileName,
      subject: fileName,
    });
  } catch (error) {
    FlashMsg({
      message: 'Share error',
      description: error?.toString(),
      type: 'info',
    });
  }
};
export default sharePDF;
