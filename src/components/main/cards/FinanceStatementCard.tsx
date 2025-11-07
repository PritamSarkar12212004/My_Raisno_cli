import { View, Text } from 'react-native'
import React from 'react'

const FinanceReceiptCard = ({ data }: {
  data: {
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
  };
}) => {
  return (
    <View>
      <Text className="text-zinc-300  font-semibold">
        {data.academicYearName}
      </Text>
      
    </View>
  )
}

export default FinanceReceiptCard