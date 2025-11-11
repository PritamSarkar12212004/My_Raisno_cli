import FlashMsg from '../../../components/global/flash/FlashMsg';
import ApiPath from '../../../constants/api/ApiPath';
import StorageToken from '../../../constants/token/StorageToken';
import Api from '../../../utils/api/Api';
import writeStorage from '../../helper/storage/writeStorage';

const LinkPhoneNumber = async ({
  setModalProvider,
  phone,
  password,
  userName,
  navigation,
}: {
  setModalProvider: any;
  phone: any;
  password: any;
  userName: any;
  navigation: any;
}) => {
  await Api.post(ApiPath.GHRUA.MAIN_TOKEN.PHONE_LINK.LINK_PHONE_NUMBER_ID, {
    phone: phone,
    password,
    userName,
  })
    .then(async res => {
      await writeStorage({
        key: StorageToken.PHONE_NUMBER.LINK_PHONE,
        value: true,
      });
      FlashMsg({
        message: 'Phone Number Linked Successfully',
        description:
          'This phone number is now associated with your user ID and password.',
        type: 'success',
      });
      setModalProvider(false);
      navigation.navigate('main', {
        screen: 'ProfileScreen',
      });
    })
    .catch(err => {
      FlashMsg({
        message: 'Linking Failed',
        description:
          'Unable to link your phone number with your user ID and password. Please try again.',
        type: 'danger',
      });
      setModalProvider(false);
      navigation.goBack();
      return false;
    });
};

export default LinkPhoneNumber;
