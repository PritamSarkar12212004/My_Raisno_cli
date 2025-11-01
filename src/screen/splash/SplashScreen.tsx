import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import ColorConst from '../../constants/color/ColorConst'
import AnimationLotti from '../../components/global/Animation/AnimationLotti'
import AnimationConst from '../../constants/animation/AnimationConst'
import PageDataSave from '../../functions/data/PageDataSave'
import StorageToken from '../../constants/token/StorageToken'
import FullPageReloader from '../../functions/page/FullPageReloader'
import { useNavigation, CommonActions } from '@react-navigation/native'

const SplashScreen = () => {
    const navigation = useNavigation()
    const [loading, setLoading] = useState<Boolean>()
    const handlePageFunc = async () => {
        setLoading(true)
        await PageDataSave({
            key: StorageToken.SPLASH_TOKEN.DATA
        })
        FullPageReloader({
            navigation: navigation,
            CommonActions: CommonActions
        })
        setLoading(false)
    }
    return (
        <View className='flex-1 w-full bg-red-500 flex items-center justify-end py-20' style={{
            backgroundColor: ColorConst.ROOT_COLOR
        }}>
            <AnimationLotti bg={"transparent "} height={460} width={460} path={AnimationConst.Splash} />
            <View className='w-full flex px-16 gap-3 items-center justify-center'>
                <Text className='text-gray-400 text-xl font-bold text-center'>Wellcome To
                    <Text className='text-[#B44F7F] text-center'> My Raisoni </Text>
                    App</Text>
                <Text className='text-gray-400 text-sm text-wrap text-center tracking-widest leading-5'>
                    My Raisoni App Provide Best Expreance Access the Cyber Vidya Portal
                </Text>
            </View>
            <View className='w-full flex items-center justify-center px-8'>
                <TouchableOpacity activeOpacity={0.8} className='w-full h-14 bg-zinc-900/90 mt-20 rounded-3xl flex items-center justify-center' onPress={() => handlePageFunc()}>
                    {
                        loading ? <ActivityIndicator color={ColorConst.ROOT_COLOR} size={"large"} /> : <Text className='text-lg text-gray-400  font-semibold'>Continue</Text>
                    }
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SplashScreen