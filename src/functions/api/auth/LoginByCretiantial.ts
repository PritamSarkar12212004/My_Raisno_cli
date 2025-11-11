import FlashMsg from '../../../components/global/flash/FlashMsg';
import Api from '../../../utils/api/Api';
import useTokenFinder from './TokenFinder';
import ApiPath from '../../../constants/api/ApiPath';
import writeStorage from '../../helper/storage/writeStorage';
import StorageToken from '../../../constants/token/StorageToken';

const LoginByCretiantial = async ({
  formData,
  setLoading,
  setUserDta,
  setUnivarsalTokenData,
  mainLoader,
  navigation,
  CommonActions,
}: any) => {
  try {
    const { password, username } = formData;
    if (!password || !username) {
      FlashMsg({
        message: 'Getting Error',
        description: 'Provide User Id and User Name',
        type: 'danger',
      });
      return false;
    } else {
      const data = await useTokenFinder({
        password: password,
        username: username,
        setLoading: setLoading,
        setUnivarsalTokenData: setUnivarsalTokenData,
      });
      mainLoader(true);
      await Api.post(ApiPath.GHRUA.MAIN_TOKEN.FETCH_MAINDATA_PATH, {
        data: data,
      })
        .then(async res => {
          await setUserDta({
            attendanceData: res.data.data.attandance,
            profileImage: res.data.data.image,
            castReliganData: res.data.data.castAndReligion
              ? res.data.data.castAndReligion
              : null,
            corseData: res.data.data.courseDetails
              ? res.data.data.courseDetails
              : null,
            fatherDetilesData: res.data.data.fatherDetails
              ? res.data.data.fatherDetails
              : null,
            idDetilesData: res.data.data.idDetails
              ? res.data.data.idDetails
              : null,
            personlInformationData: res.data.data.personalInformation
              ? res.data.data.personalInformation
              : null,
            studentAddressData: res.data.data.studentAddress
              ? res.data.data.studentAddress
              : null,
            userDetilesData: res.data.data.userDetails
              ? res.data.data.userDetails
              : null,
          });
          await writeStorage({
            key: StorageToken.MAIN_TOKEN.DATA,
            value: true,
          });
          await writeStorage({
            key: StorageToken.AUTH_TOKEN.DATA,
            value: true,
          });
          await writeStorage({
            key: StorageToken.MAIN_TOKEN.USER_DATA,
            value: {
              UserName: username,
              PassWord: password,
            },
          });
          if (res.data.data.PhoneLinkData) {
            writeStorage({
              key: StorageToken.PHONE_NUMBER.LINK_PHONE,
              value: true,
            });
          } else {
            writeStorage({
              key: StorageToken.PHONE_NUMBER.LINK_PHONE,
              value: false,
            });
          }
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'main' }],
            }),
          );
          mainLoader(false);
        })
        .catch(err => {
          console.log(err);
          FlashMsg({
            message: 'Server Error',
            description: 'Fetching Detiles Form Server Getting Error',
            type: 'danger',
          });

          mainLoader(false);
          setLoading(false);
        });
    }
  } catch (error) {
    console.log('Find Error : ', error);
    setLoading(false);
    return false;
  }
};
export default LoginByCretiantial;
