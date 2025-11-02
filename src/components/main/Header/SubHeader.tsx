import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from '../../global/icon/Icon'
import { useNavigation } from '@react-navigation/native'

const SubHeader = ({ path }: {
    path: string
}) => {
    const navigation = useNavigation()
    const naviFunc = () => {
        if (navigation.canGoBack()) {
            navigation.goBack()
        } else {
            console.log("no stack present")
        }
    }
    return (
        <View className='w-full flex flex-row items-center justify-between mb-3'>
            <TouchableOpacity className="h-12 w-12 rounded-full bg-zinc-800/80 flex items-center justify-center" activeOpacity={0.8} onPress={() => naviFunc()}
            >
                <Icon name={"arrow-left"} size={25} color={"gray"} />
            </TouchableOpacity>
            <Text className="text-white font-bold text-lg">
                {
                    path
                }
            </Text>
            <View className="h-12 w-12 rounded-full" />
        </View>
    )
}

export default SubHeader