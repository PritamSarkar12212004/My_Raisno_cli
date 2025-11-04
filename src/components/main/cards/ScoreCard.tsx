import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from '../../global/icon/Icon'

const ScoreCard = ({ item, index }: {
    item: {
        semesterId: string
        semesterName: number
        dataList: {
            sessionId: number
            sessionName: string
            sessionStartDate: string
        }[]
    }
    index: number
}) => {
    const handleDownload = (sessionId: number, sessionName: string) => {
        console.log(`Downloading ${sessionName} - ID: ${sessionId}`)
    }

    return (
        <View
            className={`rounded-2xl p-5 mb-4  bg-gray-900/90`}
            style={{
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 4,
                },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 8,
            }}
        >
            <View className="flex-row justify-between items-start mb-4">
                <View className="flex-1">
                    <View className="flex-row items-center mb-2">
                        <View className="bg-blue-500/20 p-2 rounded-lg mr-3">
                            <Icon name="file" size={20} color="#3B82F6" />
                        </View>
                        <View>
                            <Text className="text-white text-lg font-bold">
                                {item?.dataList[0]?.sessionName || 'Session Name'}
                            </Text>
                            <Text className="text-gray-400 text-xs font-medium">
                                Semester {item?.semesterName} • ID: {item?.semesterId}
                            </Text>
                        </View>
                    </View>
                </View>
                <View className="bg-green-500/20 px-3 py-1 rounded-full">
                    <Text className="text-green-400 text-xs font-semibold">
                        Available
                    </Text>
                </View>
            </View>
            <View className="flex-row justify-between items-center mb-4">
                <View className="flex-row items-center">
                    <Icon name="calendar" size={16} color="#9CA3AF" />
                    <Text className="text-gray-400 text-sm ml-2">
                        {item?.dataList[0]?.sessionStartDate ?
                            new Date(item.dataList[0].sessionStartDate).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                            }) : 'N/A'
                        }
                    </Text>
                </View>
                <View className="flex-row items-center">
                    <Icon name="identifier" size={16} color="#9CA3AF" />
                    <Text className="text-gray-400 text-sm ml-2">
                        ID: {item?.dataList[0]?.sessionId || 'N/A'}
                    </Text>
                </View>
            </View>
            <View className="border-t border-gray-700 mb-4" />
            <View className="flex-row justify-between items-center">
                <View className="flex-row items-center">
                    <Text className="text-gray-300 text-sm font-medium">
                        PDF Document
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={() => handleDownload(
                        item?.dataList[0]?.sessionId,
                        item?.dataList[0]?.sessionName
                    )}
                    className=" flex-row items-center px-4 py-3 rounded-xl bg-blue-500/20"
                    activeOpacity={0.8}
                >
                    <Icon name="download" size={18} color="white" />
                    <Text className="text-white font-semibold ml-2">Download</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ScoreCard