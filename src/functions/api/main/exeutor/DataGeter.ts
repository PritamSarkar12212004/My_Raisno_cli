import FlashMsg from '../../../../components/global/flash/FlashMsg';
import ApiPath from '../../../../constants/api/ApiPath';
import Api from '../../../../utils/api/Api';

const DataGeter = async ({
  data,
  setLoading,
  setUserDta,
}: {
  data: any;
  setLoading: any;
  setUserDta: any;
}) => {
  try {
    await Api.post(ApiPath.GHRUA.MAIN_TOKEN.FETCH_MAINDATA_PATH, {
      data: data,
    })
      .then(async (res: any) => {
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
        setLoading({
          loading: false,
          status: true,
        });
      })
      .catch(err => {
        console.log(err);
        FlashMsg({
          message: 'Server Error',
          description: 'Fetching Detiles Form Server Getting Error',
          type: 'danger',
        });
        setLoading({
          loading: false,
          status: false,
        });
      });
  } catch (error) {
    console.log('Find Error : ', error);
    setLoading({
      loading: false,
      status: false,
    });
    return false;
  }
};
export default DataGeter;
