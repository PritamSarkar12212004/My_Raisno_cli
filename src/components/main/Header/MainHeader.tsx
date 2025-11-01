import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from '../../global/icon/Icon'

const MainHeader = () => {
    return (
        <View className='w-full flex flex-row items-center justify-between'>
            <View>
                <Text className='text-2xl font-bold text-[#ECEEF0]'>
                    My Raisoni
                </Text>
            </View>
            <View className='flex flex-row items-center justify-between gap-4'>
                <TouchableOpacity activeOpacity={0.8} className='h-12 w-12 bg-zinc-800/90 rounded-2xl flex items-center justify-center'>
                    <Icon name={"search"} color={"#ECEEF0"} size={23} />
                </TouchableOpacity>
                <View>
                    <TouchableOpacity activeOpacity={0.8} className='h-12 w-12 bg-zinc-800/90 rounded-2xl flex items-center justify-center'>
                        <Icon name={"bell"} color={"#ECEEF0"} size={23} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default MainHeader