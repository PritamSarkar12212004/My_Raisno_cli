import ApiPath from '../../../../constants/api/ApiPath';
import Api from '../../../../utils/api/Api';

const TimeTableApi = async ({
  token,
  Id,
  setData,
}: {
  token: any;
  Id: any;
  setData: any;
}) => {
  await Api.post(ApiPath.GHRUA.MAIN_TOKEN.TIME_TABLE.MAIN_TIME_TABLE, {
    data: { token: token, id: Id },
  })
    .then(res => {
      console.log(res.data.data.data.data);
      setData({
        weekDetails: res.data.data.weekDetails,
        timeTableDetailes: res.data.data.data.data,
      });
    })
    .catch(err => {
      console.log('err', err.response);
    });
};

export default TimeTableApi;
