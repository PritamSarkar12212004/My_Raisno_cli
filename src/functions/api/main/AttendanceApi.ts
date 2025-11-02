import ApiPath from '../../../constants/api/ApiPath';
import Api from '../../../utils/api/Api';

const AttendanceApi = async ({
  token,
  id,
  setloading,
  setData,
}: {
  token: string;
  id: string;
  setloading: any;
  setData: React.Dispatch<
    React.SetStateAction<null | {
      attendanceData: {
        attendanceCourseComponentNameInfoList: {
          courseComponentId: number;
          courseRegisterDate: string;
          courseVariant: string;
          numberOfExtraAttendance: number;
          numberOfPeriods: number;
          numberOfPresent: number;
          presentPercentage: number;
          presentPercentageWith: string;
        }[];
        courseCode: any;
        courseId: number;
        courseName: string;
      }[];
      commenDetiles: {
        academicSessionName: string;
        degreeBranchSemesterName: string;
        degreeName: string;
        semesterName: string;
      };
    }>
  >;
}) => {
  try {
    const response = await Api.post(ApiPath.GHRUA.MAIN_TOKEN.FETCH_ATTENDANCE, {
      data: { token, id },
    });
    await setData({
      attendanceData: response.data.data.attendanceData,
      commenDetiles: response.data.data.commenDetiles,
    });
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

export default AttendanceApi;
