import { View } from 'react-native'
import React, { useEffect } from 'react'
import ColorConst from '../../../constants/color/ColorConst'
import { userContext } from '../../../utils/provider/ContextProvider'
import MainDataFetcher from '../../../functions/api/main/main/MainDataFetcher'

export default function MainWraper({ children }: any) {
    const {
        userData,
        setUserDta,
        setDataLoading,
        dataLoading,
        setUnivarsalTokenData,
        setAppReady,
    } = userContext()

    useEffect(() => {
        if (!userData) {
            MainDataFetcher({
                setUserDta,
                setDataLoading,
                setUnivarsalTokenData,
            })
        }
    }, [])

    useEffect(() => {
        setAppReady(userData !== null && !dataLoading.loading)
    }, [userData, dataLoading.loading])

    return (
        <View
            style={{ backgroundColor: ColorConst.ROOT_COLOR, flex: 1 }}
            className="flex-1 pt-4 px-4"
        >
            {children}
        </View>
    )
}
