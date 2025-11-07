import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import SubWraper from '../../../../layouts/wraper/main/SubWraper'
import SubHeader from '../../../../components/main/Header/SubHeader'
import DataLoading from '../../../../components/main/Loading/DataLoading'
import FainanceReciptApi from '../../../../functions/api/main/fainance/FainanceStatmentApi'
import { userContext } from '../../../../utils/provider/ContextProvider'
import { useNavigation } from '@react-navigation/native'
import FinanceReceiptCard from '../../../../components/main/cards/FinanceStatementCard'

const FainanceStatementScreem = () => {
    const { univarsalTokenData } = userContext()
    const navigation = useNavigation()

    const [loading, setLoading] = useState<boolean | any | {
        status: boolean,
        load: boolean
    }>({
        status: true,
        load: true
    })
    const [data, setData] = useState<
        | null
        | {
            studentFeesPaymentDtls: {
                academicYearId: number
                academicYearName: string
                configYearName: string,
                financialYearId: number
                financialYearName: string
                lastUpdatedTime: number
                message: string
                outstandingAmount: number
                paymentStatus: string
                studAcademicFeesDtlsList: {
                    feesHeadName: string
                    paymentStatus: string
                    totalReceivablesAmt: number
                    totalCollectedAmt: number
                }[]
                studReceivableDtlsList: {
                    feesHeadName: string
                    totalReceivablesAmt: number
                    totalCollectedAmt: number
                }[]
                studReceivableTotalAmtDtls: {
                    totalCollectedAmt: number
                    totalReceivableAmt: number
                }[]
                studentFeeTotalAmtDtls: {
                    totalCollectedAmt: number
                    totalReceivableAmt: number
                }[]
            }[]
        }
    >(null);

    const func = () => {
        FainanceReciptApi({
            token: univarsalTokenData?.Token,
            id: univarsalTokenData?.Id,
            setData: setData,
            setloading: setLoading
        })
    }

    useEffect(() => {
        FainanceReciptApi({
            token: univarsalTokenData?.Token,
            id: univarsalTokenData?.Id,
            setData: setData,
            setloading: setLoading
        })
    }, [])
    return (
        <SubWraper>
            <SubHeader path='Finance Receipt' />
            <View className='flex-1'>
                {
                    loading.load ? <DataLoading
                        status={loading.status}
                        func={func}
                        loading={loading}
                    /> : data?.studentFeesPaymentDtls.map((item, index) => {
                        return <FinanceReceiptCard key={index} data={item} />
                    })
                }
            </View>
        </SubWraper>
    )
}

export default FainanceStatementScreem