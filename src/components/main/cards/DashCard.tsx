import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const DashCard = ({
    percentage,
    title,
    range,
    type,
    navigation,
    path
}: {
    percentage: number
    title: string
    range: string[]
    type: 'cgpa' | 'attendance' | string
    navigation: any,
    path: any
}) => {
    const normalizedPercentage =
        type === 'cgpa' ? (percentage / 10) * 100 : percentage

    const getBarColor = () => {
        if (type === 'cgpa' ? percentage >= 8 : percentage >= 80) return 'bg-green-500'
        if (type === 'cgpa' ? percentage >= 6 : percentage >= 60) return 'bg-yellow-500'
        return 'bg-red-500'
    }

    const getStatusText = () => {
        if (type === 'cgpa' ? percentage >= 8 : percentage >= 80) return 'Excellent'
        if (type === 'cgpa' ? percentage >= 6 : percentage >= 60) return 'Good'
        return 'Needs Improvement'
    }

    const getStatusColor = () => {
        if (type === 'cgpa' ? percentage >= 8 : percentage >= 80) return 'text-green-400'
        if (type === 'cgpa' ? percentage >= 6 : percentage >= 60) return 'text-yellow-400'
        return 'text-red-400'
    }
    const navigatefUNC = (path: any) => {
        navigation.navigate("stack",
            {
                screen: path,
                params: {
                    title: title
                },
            }
        );
    }

    return (
        <TouchableOpacity activeOpacity={0.8} onPress={() => {
            navigatefUNC(path)
        }} className="w-full bg-gray-800 py-5 px-4 rounded-[20px] shadow-lg">
            <View className="flex-row justify-between items-center mb-4">
                <Text className="text-white text-lg font-bold">{title}</Text>
                <View className="flex-row items-center">
                    <View className={`w-2 h-2 rounded-full ${getBarColor()} mr-2`} />
                    <Text className={`text-sm font-medium ${getStatusColor()}`}>
                        {getStatusText()}
                    </Text>
                </View>
            </View>

            <View className="flex-row items-end mb-4">
                <Text className="text-3xl font-bold text-white">
                    {percentage.toFixed(2)}
                </Text>
                <Text className="text-gray-400 text-sm ml-2 mb-1">
                    {type === 'cgpa' ? 'CGPA' : 'Overall'}
                </Text>
            </View>

            <View className="mb-2">
                <View className="flex-row justify-between mb-1">
                    {range.map((r, i) => (
                        <Text key={i} className="text-gray-400 text-xs">
                            {r}
                        </Text>
                    ))}
                </View>

                <View className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
                    <View
                        className={`h-3 rounded-full ${getBarColor()}`}
                        style={{ width: `${normalizedPercentage}%` }}
                    />
                </View>
            </View>

            <View className="flex-row justify-between">
                <Text className="text-gray-400 text-xs">Current</Text>
                <Text className="text-white text-xs font-medium">
                    {percentage.toFixed(2)} ({getStatusText()})
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default DashCard
