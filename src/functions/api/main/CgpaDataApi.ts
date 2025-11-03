import ApiPath from '../../../constants/api/ApiPath';
import Api from '../../../utils/api/Api';

const CgpaDataApi = async ({
  token,
  setloading,
  setData,
}: {
  token: string;
  setloading: any;
  setData: React.Dispatch<
    React.SetStateAction<null | {
      academicSessionName: string;
      admissionBatchName: string;
      degreeName: string;
      cgpa: any;
      degreeBranchSemesterName: string;
      rollNumber: string;
      sectionName: string;
      semesterName: string;
      studentSemesterWiseMarksDetailsList: {
        backlog: boolean;
        currentSemesterName: string;
        getSessionStartDate: string;
        regForSessionName: string;
        semesterName: string;
        sgpa: any;
        studentMarksDetailsDTO: {
          backlog: boolean;
          courseCode: string;
          courseName: string;
          resultSort: string;
          sessionName: string;
          courseCompDTOList: {
            courseCompName: string;
            compSessionLevelMarks: {
              grade: string;
              gradePoint: number;
              marksObtained: number;
              marksOutOf: number;
              percentageWith: string;
              regSessionName: string;
              registerType: string;
              result: string;
            }[];
          }[];
        }[];
      }[];
    }>
  >;
}) => {
  try {
    const response = await Api.post(ApiPath.GHRUA.MAIN_TOKEN.FETCH_CGPA, {
      data: {
        token: token,
      },
    });
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

export default CgpaDataApi;
