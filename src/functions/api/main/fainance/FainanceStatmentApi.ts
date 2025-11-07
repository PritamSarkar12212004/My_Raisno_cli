import ApiPath from '../../../../constants/api/ApiPath';
import Api from '../../../../utils/api/Api';

const FainanceStatmentApi = async ({
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
      studentFeesPaymentDtls: {
        academicYearId: number;
        academicYearName: string;
        configYearName: string;
        financialYearId: number;
        financialYearName: string;
        lastUpdatedTime: number;
        message: string;
        outstandingAmount: number;
        paymentStatus: string;
        studAcademicFeesDtlsList: {
          feesHeadName: string;
          paymentStatus: string;
          totalReceivablesAmt: number;
          totalCollectedAmt: number;
        }[];
        studReceivableDtlsList: {
          feesHeadName: string;
          totalReceivablesAmt: number;
          totalCollectedAmt: number;
        }[];
        studReceivableTotalAmtDtls: {
          totalCollectedAmt: number;
          totalReceivableAmt: number;
        }[];

        studentFeeTotalAmtDtls: {
          totalCollectedAmt: number;
          totalReceivableAmt: number;
        }[];
      }[];
    }>
  >;
}) => {
  try {
    const response = await Api.post(
      ApiPath.GHRUA.MAIN_TOKEN.FAINANCE.FETCH_FAINANCE,
      {
        data: { token, id },
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

export default FainanceStatmentApi;
