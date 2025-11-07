import ApiPath from "../../../../constants/api/ApiPath";
import Api from "../../../../utils/api/Api";


const ExamScoreDownloadApi = async ({
  token,
  id,
  setloading,
  setData,
}: {
  token: string;
  id: any;
  setloading: any;
  setData: React.Dispatch<
    React.SetStateAction<null>
    //   | {
    //       semesterId: string;
    //       semesterName: number;
    //       dataList: {
    //         sessionId: number;
    //         sessionName: string;
    //         sessionStartDate: string;
    //       }[];
    //     }[]
  >;
}) => {
  try {
    const response = await Api.post(
      ApiPath.GHRUA.MAIN_TOKEN.DOWNLOAD_EXAM_SCORE_PDF,
      {
        token: token,
        semesterId: id?.dataList[0].semesterId,
        sessionId: id?.dataList[0].sessionId,
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

export default ExamScoreDownloadApi;
