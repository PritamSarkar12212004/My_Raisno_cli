import { ScrollView, View } from 'react-native'
import React from 'react'
import ColorConst from '../../../constants/color/ColorConst'


export default function SubWraper({ children }: any) {
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: ColorConst.ROOT_COLOR, flex: 1 }}
        >
            <View
                className='flex-1 pt-4 px-3'
            >
                {
                    children
                }
            </View>
        </ScrollView>
    )
}
