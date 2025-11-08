import FlashMsg from '../../../components/global/flash/FlashMsg';
import ApiPath from '../../../constants/api/ApiPath';
import Api from '../../../utils/api/Api';

const CallOtp = async ({
  phone,
  setModalProvider,
}: {
  phone: any;
  setModalProvider: any;
}) => {
  Api.post(ApiPath.GHRUA.OTP.MIN_OTP, {
    phone: phone,
  })
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      setModalProvider(false);
      FlashMsg({
        message: 'Error',
        description: `Error Sending OTP`,
        type: 'danger',
      });
    });
};
export default CallOtp;
