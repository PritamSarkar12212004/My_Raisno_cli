import { View, Text } from 'react-native'
import React from 'react'
import AnimationLotti from '../../global/Animation/AnimationLotti'
import AnimationConst from '../../../constants/animation/AnimationConst'

const DataLoading = () => {
    return (
        <View className='flex-1  flex items-center justify-center px-6'>
            <View className='items-center justify-center mb-8'>
                <AnimationLotti
                    path={AnimationConst.Auth_Loading}
                    bg={"transparent"}
                    height={200}
                    width={200}
                />
            </View>
            <Text className='text-2xl font-bold text-gray-800 dark:text-white text-center mb-3'>
                Preparing Your Dashboard
            </Text>
            <Text className='text-base text-gray-600 dark:text-gray-300 text-center mb-8 leading-6'>
                We're gathering your latest insights and data{'\n'}
                This will just take a moment...
            </Text>
            <View className='w-64 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-6'>
                <View className='bg-blue-500 dark:bg-blue-400 h-2 rounded-full w-3/4'></View>
            </View>
            <View className='flex-row justify-between w-full max-w-xs mb-8'>
                {[1, 2, 3].map((item) => (
                    <View key={item} className='items-center flex-1 mx-2'>
                        <View className='bg-gray-300 dark:bg-gray-600 h-4 rounded w-10 mb-2'></View>
                        <View className='bg-gray-200 dark:bg-gray-700 h-3 rounded w-8'></View>
                    </View>
                ))}
            </View>
            <View className='bg-blue-50 dark:bg-blue-900/20 p-4 rounded-2xl max-w-md'>
                <Text className='text-sm text-blue-800 dark:text-blue-200 text-center font-medium'>
                    💡 Tip: Your data is being processed in real-time for the most accurate insights
                </Text>
            </View>
        </View>
    )
}

export default DataLoading