import ApiPath from '../../../constants/api/ApiPath';
import Api from '../../../utils/api/Api';

const ExamScoreApi = async ({
  token,
  id,
  setloading,
  setData,
}: {
  token: string;
  id: string;
  setloading: any;
  setData: React.Dispatch<
    React.SetStateAction<
      | null
      | {
          semesterId: string;
          semesterName: number;
          dataList: {
            sessionId: number;
            sessionName: string;
            sessionStartDate: string;
          }[];
        }[]
    >
  >;
}) => {
  try {
    const response = await Api.post(
      ApiPath.GHRUA.MAIN_TOKEN.FETCH_EXAM_SCORE_DOX,
      {
        data: { token, id },
      },
    );
    setData(response.data.data);
    console.log(response.data.data);
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

export default ExamScoreApi;
