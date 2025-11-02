import { ScrollView, View } from 'react-native'
import React, { useEffect } from 'react'
import ColorConst from '../../../constants/color/ColorConst'
import { userContext } from '../../../utils/provider/ContextProvider'
import MainDataFetcher from '../../../functions/api/main/MainDataFetcher'
import DataLoading from '../../../components/main/Loading/DataLoading'

export default function MainWraper({ children }: any) {
    const { userData, setUserDta, setDataLoading, dataLoading,setUnivarsalTokenData } = userContext()

    const func = () => {
        setDataLoading(true)
    }

    useEffect(() => {
        if (userData == null) {
            MainDataFetcher({
                setUserDta,
                setDataLoading,
                setUnivarsalTokenData
            })
        }
    }, [])

    const isReady = userData !== null && !dataLoading.loading

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: ColorConst.ROOT_COLOR, flex: 1 }}
        >
            <View
                className='flex-1 pt-4 px-4'
            >
                {!isReady ? (
                    <DataLoading
                        status={dataLoading.status}
                        func={func}
                        loading={dataLoading}
                    />
                ) : (
                    children
                )}
            </View>
        </ScrollView>
    )
}
