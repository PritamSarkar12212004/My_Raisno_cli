import { View, Text, KeyboardAvoidingView, Platform } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ColorConst from '../../../constants/color/ColorConst';

const RootWraper = ({ children }: any) => {
    const { bottom, top } = useSafeAreaInsets();
    return (
        <View className='flex-1' style={{
            paddingTop: top,
            paddingBottom: bottom,
            backgroundColor: ColorConst.ROOT_COLOR
        }}>
            {
                children
            }
        </View>
    )
}

export default RootWraper