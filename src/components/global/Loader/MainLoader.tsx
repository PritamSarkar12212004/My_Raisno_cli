import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import ColorConst from '../../../constants/color/ColorConst'

const MainLoader = () => {
    return (
        <View className='flex-1 flex items-center justify-center' style={{
            backgroundColor: ColorConst.ROOT_COLOR
        }}>
            <ActivityIndicator color={"gray"} size={40} />
        </View>
    )
}

export default MainLoader