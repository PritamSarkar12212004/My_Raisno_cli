import FlashMsg from '../../../components/global/flash/FlashMsg';
import CretiantialToken from '../../../constants/api/CretiantialToken';
import ApiPath from '../../../constants/api/ApiPath';
import axios from 'axios';

const TokenFinder = async ({
  password,
  username,
  setLoading,
  setUnivarsalTokenData,
}: {
  password: any;
  username: any;
  setLoading: any;
  setUnivarsalTokenData: any;
}) => {
  const data = await axios.post(ApiPath.GHRUA.AUTH_LOGIN_PATH, {
    password: password,
    reCaptchaToken: CretiantialToken,
    userName: username,
  });
  if (data.data.data) {
    setUnivarsalTokenData({
      Token: data.data.data.token ? data.data.data.token : null,
      Id: data.data.data.id ? data.data.data.id : null,
    });
    setLoading(false);
    return data.data.data;
  } else {
    FlashMsg({
      message: 'Getting Error',
      description: 'Token Fetching Error Form Server Please try again.',
      type: 'danger',
    });
    console.log('getting error to find Token Finder');
    setLoading(false);
    return null;
  }
};
export default TokenFinder;
