import { View } from 'react-native'
import React from 'react'
import ColorConst from '../../../constants/color/ColorConst'

export default function MainWraper({ children }: any) {
    return (
        <View className='flex-1 pt-4 px-4' style={{
            backgroundColor: ColorConst.ROOT_COLOR
        }}>
            {
                children
            }
        </View>
    )
}