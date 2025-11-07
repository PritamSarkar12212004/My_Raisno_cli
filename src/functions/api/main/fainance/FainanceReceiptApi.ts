import ApiPath from '../../../../constants/api/ApiPath';
import Api from '../../../../utils/api/Api';

const FainanceReceiptApi = async ({
  token,
  setloading,
  setData,
}: {
  token: string;
  setloading: any;
  setData: any;
}) => {
  try {
    const response = await Api.post(
      ApiPath.GHRUA.MAIN_TOKEN.FAINANCE.FETCH_FAINANCE_RECEIPT,
      {
        data: { token: token },
      },
    );
    setData(response.data.data);
    setloading({
      status: true,
      load: false,
    });
  } catch (error) {
    console.error('Error fetching attendance:', error);
    setloading({
      status: false,
      load: false,
    });
  }
};

export default FainanceReceiptApi;
