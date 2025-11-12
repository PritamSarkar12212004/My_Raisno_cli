import ApiPath from '../../../constants/api/ApiPath';
import Api from '../../../utils/api/Api';
import FlashMsg from '../../../components/global/flash/FlashMsg';
import LoginByCretiantial from './LoginByCretiantial';

const Varifyotp = async ({
  setModalProvider,
  phone,
  navigation,
  setLoading,
  CommonActions,
  setUnivarsalTokenData,
  setUserDta,
}: {
  phone: string;
  setModalProvider: any;
  navigation: any;
  setLoading: any;
  CommonActions: any;
  setUnivarsalTokenData: any;
  setUserDta: any;
}) => {
  const numericPhone = Number(phone);
  await Api.post(ApiPath.GHRUA.AUTH_API.FETH_PHONE_DATA_PATH, {
    phone: numericPhone,
  })
    .then(async res => {
      const { User_Id, User_Passowrd } = await res.data.data;
      const formData = await {
        password: User_Passowrd,
        username: User_Id,
      };
      LoginByCretiantial({
        setLoading: setModalProvider,
        navigation: navigation,
        CommonActions: CommonActions,
        setUnivarsalTokenData: setUnivarsalTokenData,
        setUserDta: setUserDta,
        mainLoader: setLoading,
        formData: formData,
      });
    })
    .catch(err => {
      FlashMsg({
        message: 'Error',
        description:
          err.response.data.message ||
          'Something went wrong. Please try again later.',
        type: 'danger',
      });
      setLoading(false);
      setModalProvider(false);
      navigation.goBack();
    });
};

export default Varifyotp;
