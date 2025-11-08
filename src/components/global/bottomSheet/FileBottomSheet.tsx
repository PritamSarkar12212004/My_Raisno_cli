import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from '../icon/Icon'

const ActionButton = ({ icon, title, subtitle, onPress, color }: any) => (
    <TouchableOpacity
        onPress={onPress}
        className="flex-row items-center p-4 rounded-2xl mb-3 active:opacity-80"
        style={{ backgroundColor: `${color}15` }}
        activeOpacity={0.7}
    >
        <View
            className="w-12 h-12 rounded-xl justify-center items-center mr-4"
            style={{ backgroundColor: `${color}20` }}
        >
            <Icon name={icon} size={24} color={color} />
        </View>
        <View className="flex-1">
            <Text className="text-white font-semibold text-base">{title}</Text>
            <Text className="text-gray-400 text-sm mt-1">{subtitle}</Text>
        </View>
        <View
            className="w-10 h-10 rounded-lg justify-center items-center"
            style={{ backgroundColor: `${color}20` }}
        >
            <Icon name="chevron-right" size={16} color={color} />
        </View>
    </TouchableOpacity>
)
const FileBottomSheet = ({
    closeActionSheet,
    handleDownloadPDF,
    handleSharePDF

}: {
    closeActionSheet: any,
    handleDownloadPDF: any,
    handleSharePDF: any
}) => {
    return (
        <View className="flex-1 justify-end bg">
            <View className='bg-zinc-800 px-3 pt-3 rounded-t-[30px]'>

                <View className="items-center mb-6">
                    <View className="w-14 h-14 bg-blue-500/20 rounded-2xl justify-center items-center mb-3">
                        <Icon name="file" size={28} color="#3B82F6" />
                    </View>
                    <Text className="text-white text-xl font-bold text-center">
                        Download Score Card
                    </Text>
                    <Text className="text-gray-400 text-center mt-2">
                        Choose how you want to save your score card
                    </Text>
                </View>
                <ActionButton
                    icon="download"
                    title="Download PDF"
                    subtitle="Save to your device"
                    onPress={handleDownloadPDF}
                    color="#3B82F6"
                />
                <ActionButton
                    icon="share"
                    title="Share PDF"
                    subtitle="Share with others directly"
                    onPress={handleSharePDF}
                    color="#10B981"
                />
                <TouchableOpacity
                    onPress={closeActionSheet}
                    className="flex-row items-center justify-center p-4 rounded-2xl mt-2 border border-gray-600 active:opacity-80"
                    activeOpacity={0.7}
                >
                    <Text className="text-gray-300 font-semibold text-base">Cancel</Text>
                </TouchableOpacity>
                <View className="h-4" />
            </View >
        </View>

    )
}

export default FileBottomSheet