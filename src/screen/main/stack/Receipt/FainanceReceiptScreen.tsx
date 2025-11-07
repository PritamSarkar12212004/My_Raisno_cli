import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import SubWraper from '../../../../layouts/wraper/main/SubWraper'
import SubHeader from '../../../../components/main/Header/SubHeader'
import DataLoading from '../../../../components/main/Loading/DataLoading'
import { userContext } from '../../../../utils/provider/ContextProvider'
import FainanceReceiptApi from '../../../../functions/api/main/fainance/FainanceReceiptApi'
import FainanceReceiptCard from '../../../../components/main/cards/FainanceReceiptCard'

const FainanceReceiptScreen = () => {
    const { univarsalTokenData } = userContext()
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
            data: {
                data: {
                    bankRefNo: string
                    paymentDate: string
                    paymentHdrId: number
                    paymentType: string
                    paymentTypeName: string
                    remark: string
                    totalCollectedAmt: string
                    transactionType: string
                    voucherNo: string
                    voucherType: string
                    feesHeadDetailsDTOList: {
                        debitCredit: string
                        feesHeadName: string
                        feesType: string
                    }[]
                    paymentOnlineHistoryDTO: {
                        bankRefNo: string
                        id: string
                        name: string
                        orderId: string
                        status: string
                    }[]
                }[]
            },
            data2: {
                data: {
                    bankRefNo: string
                    paymentDate: string
                    paymentHdrId: number
                    paymentType: string
                    paymentTypeName: string
                    remark: string
                    totalCollectedAmt: string
                    transactionType: string
                    voucherNo: string
                    voucherType: string
                    feesHeadDetailsDTOList: {
                        debitCredit: string
                        feesHeadName: string
                        feesType: string
                    }[]
                    paymentOnlineHistoryDTO: {
                        bankRefNo: string
                        id: string
                        name: string
                        orderId: string
                        status: string
                    }[]
                }[]
            },
            data3: {
                data: {
                    bankRefNo: string
                    paymentDate: string
                    paymentHdrId: number
                    paymentType: string
                    paymentTypeName: string
                    remark: string
                    totalCollectedAmt: string
                    transactionType: string
                    voucherNo: string
                    voucherType: string
                    feesHeadDetailsDTOList: {
                        debitCredit: string
                        feesHeadName: string
                        feesType: string
                    }[]
                    paymentOnlineHistoryDTO: {
                        bankRefNo: string
                        id: string
                        name: string
                        orderId: string
                        status: string
                    }[]
                }[]
            },
        }

    >(null);

    const func = () => {

    }
    useEffect(() => {
        FainanceReceiptApi({
            token: univarsalTokenData?.Token,
            setData: setData,
            setloading: setLoading
        })
    }, [null])
    const tabPath = [
        {
            id: 1,
            item: "First year"
        },
        {
            id: 2,
            item: "Secound Year"
        },
        {
            id: 3,
            item: "Third Year"
        },
    ]
    const [tabData, setTabData] = useState(tabPath[0])
    return (
        <SubWraper>
            <SubHeader path={"Fainance Receipt"} />
            <View className='flex-1'>
                {
                    loading.load ? <DataLoading
                        status={loading.status}
                        func={func}
                        loading={loading}
                    /> : <View className='flex-1 '>
                        <View className='flex w-full mb-4'>
                            <View className='flex w-full flex-row items-center justify-between  '>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                                    {
                                        tabPath.map((item: {
                                            id: number
                                            item: string
                                        }, index: any) => {
                                            return <TouchableOpacity onPress={() => {
                                                setTabData(item)
                                            }} activeOpacity={0.9} key={index} className="px-6 mr-3 py-2 rounded-lg flex items-center justify-center" style={{
                                                backgroundColor: item.id == tabData.id ? "#2973B2" : "#7F8CAA"
                                            }} >
                                                <Text className='font-semibold' style={{
                                                    color: item.id == tabData.id ? "white" : "white"
                                                }}>
                                                    {
                                                        item.item
                                                    }
                                                </Text>
                                            </TouchableOpacity>
                                        })
                                    }
                                </ScrollView>
                            </View>
                        </View>
                        <View className='w-full flex-1'>
                            {
                                tabData.id == 1 ?
                                    data?.data != null ?
                                        data?.data.data?.length > 0 ?
                                            data.data.data.map((item, index) => (
                                                <FainanceReceiptCard key={index} item={item} />
                                            ))
                                            : (
                                                <NoDataView
                                                    message="No receipts found"
                                                    description="There are no finance receipts available for this period"
                                                    icon="📄"
                                                />
                                            )
                                        : (
                                            <NoDataView
                                                message="No data available"
                                                description="Unable to load finance receipts data"
                                                icon="❌"
                                            />
                                        )
                                    : tabData.id == 2 ?
                                        data?.data2 != null ?
                                            data?.data2.data?.length > 0 ?
                                                data.data2.data.map((item, index) => (
                                                    <FainanceReceiptCard key={index} item={item} />
                                                ))
                                                : (
                                                    <NoDataView
                                                        message="No pending receipts"
                                                        description="All finance receipts have been processed"
                                                        icon="⏳"
                                                    />
                                                )
                                            : (
                                                <NoDataView
                                                    message="Data unavailable"
                                                    description="Failed to load pending receipts"
                                                    icon="⚠️"
                                                />
                                            )
                                        : tabData.id == 3 ?
                                            data?.data3 != null ?
                                                data?.data3.data?.length > 0 ?
                                                    data.data3.data.map((item, index) => (
                                                        <FainanceReceiptCard key={index} item={item} />
                                                    ))
                                                    : (
                                                        <NoDataView
                                                            message="No completed receipts"
                                                            description="No finance receipts have been completed yet"
                                                            icon="✅"
                                                        />
                                                    )
                                                : (
                                                    <NoDataView
                                                        message="Data not loaded"
                                                        description="Could not load completed receipts"
                                                        icon="🔍"
                                                    />
                                                )
                                            : null
                            }
                        </View>
                    </View>
                }
            </View >
        </SubWraper >
    )
}
export default FainanceReceiptScreen
export const NoDataView = ({ message, description, icon }: any) => (
    <View className='flex-1 flex items-center justify-center py-12 px-6'>
        <View className='items-center'>
            <Text className='text-6xl mb-4'>{icon}</Text>
            <Text className='text-lg font-semibold text-gray-800 dark:text-gray-200 text-center mb-2'>
                {message}
            </Text>
            <Text className='text-sm text-gray-500 dark:text-gray-400 text-center mb-6'>
                {description}
            </Text>
            <View className='flex-row space-x-3'>
                <TouchableOpacity className='bg-blue-500 px-4 py-2 rounded-lg'>
                    <Text className='text-white text-sm font-medium'>Refresh</Text>
                </TouchableOpacity>
                <TouchableOpacity className='border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-lg'>
                    <Text className='text-gray-600 dark:text-gray-300 text-sm font-medium'>
                        Contact Support
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
)