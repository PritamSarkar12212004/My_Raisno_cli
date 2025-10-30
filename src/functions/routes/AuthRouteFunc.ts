import StorageToken from '../../constants/token/StorageToken';
import readStorage from '../helper/storage/readStorage';

const AuthRouteFunc = async () => {
  const splashData = await readStorage({ key: StorageToken.SPLASH_TOKEN.DATA });
  const authData = await readStorage({ key: StorageToken.AUTH_TOKEN.DATA });
  if (splashData == true) {
    if (authData) {
      return 'main';
    } else {
      return 'auth';
    }
  } else {
    return 'splash';
  }
};
export default AuthRouteFunc;
