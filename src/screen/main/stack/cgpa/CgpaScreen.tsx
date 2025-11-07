import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import SubHeader from '../../../../components/main/Header/SubHeader'
import { userContext } from '../../../../utils/provider/ContextProvider'
import SubWraper from '../../../../layouts/wraper/main/SubWraper'
import DataLoading from '../../../../components/main/Loading/DataLoading'
import CgpaCard from '../../../../components/main/cards/CgpaCard'
import CgpaDataApi from '../../../../functions/api/main/main/CgpaDataApi'

const CgpaScreen = () => {
    const { params } = useRoute()
    const path = params?.title
    const { univarsalTokenData } = userContext()
    const [loading, setLoading] = useState<boolean | any | {
        status: boolean,
        load: boolean
    }>({
        status: true,
        load: true
    })
    const [data, setData] = useState<any>(null);

    const func = () => {
        CgpaDataApi({
            token: univarsalTokenData?.Token,
            setData: setData,
            setloading: setLoading
        })
    }

    useEffect(() => {
        func();
    }, [])

    return (
        <SubWraper>
            <SubHeader path={path} />
            <View className='flex-1 '>
                {
                    loading.load ? (
                        <DataLoading
                            status={loading.status}
                            func={func}
                            loading={loading}
                        />
                    ) : data ? (
                        <CgpaCard data={data} />
                    ) : (
                        <View className="flex-1 justify-center items-center">
                            <View className="bg-gray-800 rounded-2xl p-8 mx-6">
                                <Text className="text-white text-xl font-bold text-center mb-2">
                                    No Data Available
                                </Text>
                                <Text className="text-gray-400 text-center mb-4">
                                    Could not load your CGPA information
                                </Text>

                            </View>
                        </View>
                    )
                }
            </View>
        </SubWraper>
    )
}

export default CgpaScreen