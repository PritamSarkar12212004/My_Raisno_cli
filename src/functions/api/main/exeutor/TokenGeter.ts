import FlashMsg from '../../../../components/global/flash/FlashMsg';
import CretiantialToken from '../../../../constants/api/CretiantialToken';
import ApiPath from '../../../../constants/api/ApiPath';
import axios from 'axios';

const TokenGeter = async ({
  password,
  username,
  setDataLoading,
}: {
  password: any;
  username: any;
  setDataLoading: any;
}) => {
  const data = await axios.post(ApiPath.GHRUA.AUTH_LOGIN_PATH, {
    password: password,
    reCaptchaToken: CretiantialToken,
    userName: username,
  });
  if (data.data.data) {
    return data.data.data;
  } else {
    FlashMsg({
      message: 'Getting Error',
      description: 'Token Fetching Error Form Server Please try again.',
      type: 'danger',
    });
    console.log('getting error to find Token Finder');
    setDataLoading({
      loading: false,
      status: false,
    });
    return null;
  }
};
export default TokenGeter;
