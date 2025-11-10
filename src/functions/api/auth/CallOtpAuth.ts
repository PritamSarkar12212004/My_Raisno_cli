import FlashMsg from '../../../components/global/flash/FlashMsg';
import ApiPath from '../../../constants/api/ApiPath';
import RoutesConst from '../../../constants/routes/RoutesConst';
import Api from '../../../utils/api/Api';

const CallOtpAuth = async ({
  phone,
  setModalProvider,
  navigation,
}: {
  phone: any;
  setModalProvider: any;
  navigation: any;
}) => {
  Api.post(ApiPath.GHRUA.OTP.MIN_OTP, {
    phone,
  })
    .then(async res => {
      setModalProvider(false);
      await FlashMsg({
        message: 'OTP Sent Successfully',
        description: 'An OTP has been sent to your registered device.',
        type: 'success',
      });
      navigation.navigate('auth', {
        screen: RoutesConst.AUTH_ROUTE.VARIFY_SCREEN,
        params: {
          otp: res.data.otp,
          phone: phone,
        },
      });
    })
    .catch(err => {
      console.log(err?.message);
      setModalProvider(false);
      FlashMsg({
        message: 'Failed to Send OTP',
        description:
          'Something went wrong while sending the OTP. Please try again.',
        type: 'danger',
      });
    });
};
export default CallOtpAuth;
