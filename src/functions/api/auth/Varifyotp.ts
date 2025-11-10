import ApiPath from '../../../constants/api/ApiPath';
import Api from '../../../utils/api/Api';
import FlashMsg from '../../../components/global/flash/FlashMsg';

const Varifyotp = async ({
  setModalProvider,
  phone,
}: {
  phone: string;
  setModalProvider: any;
}) => {
  const numericPhone = Number(phone);
  await Api.post(ApiPath.GHRUA.AUTH_API.FETH_PHONE_DATA_PATH, {
    phone: numericPhone,
  })
    .then(async res => {
      console.log(res.data);
      setModalProvider(false);
    })
    .catch(err => {
      FlashMsg({
        message: 'Error',
        description:
          err.response.data.message ||
          'Something went wrong. Please try again later.',
        type: 'danger',
      });
      setModalProvider(false);
    });
};

export default Varifyotp;
