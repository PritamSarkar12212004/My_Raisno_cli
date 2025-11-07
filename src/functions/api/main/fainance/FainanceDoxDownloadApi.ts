import ApiPath from '../../../../constants/api/ApiPath';
import Api from '../../../../utils/api/Api';
const FainanceDoxDownloadApi = async ({
  token,
  id,
  setloading,
  setData,
}: {
  token: string;
  id: any;
  setloading: any;
  setData: any;
}) => {
  try {
    const response = await Api.post(
      ApiPath.GHRUA.MAIN_TOKEN.FAINANCE.DOWNLOAD_FAINANCE_PDF,
      {
        token: token,
        voucherNo: id,
      },
    );
    setData(response.data.data);
    setloading({
      status: true,
      load: false,
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching attendance:', error);
    setloading({
      status: false,
      load: false,
    });
  }
  return null;
};

export default FainanceDoxDownloadApi;
