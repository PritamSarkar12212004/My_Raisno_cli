import FlashMsg from '../../../components/global/flash/FlashMsg';
import ApiPath from '../../../constants/api/ApiPath';
import RoutesConst from '../../../constants/routes/RoutesConst';
import Api from '../../../utils/api/Api';

const CallOtp = async ({
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
      navigation.navigate('stack', {
        screen: RoutesConst.STACK_SCREEN.PHONE_NUMBER_VARIFY_OTP,
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
export default CallOtp;
