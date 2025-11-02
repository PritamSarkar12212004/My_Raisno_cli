import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const AttendanceCard = ({
    course,
}: {
    course: {
        courseCode: any;
        courseId: number;
        courseName: string;
        attendanceCourseComponentNameInfoList: {
            courseComponentId: number;
            courseRegisterDate: string;
            courseVariant: string;
            numberOfExtraAttendance: number;
            numberOfPeriods: number;
            numberOfPresent: number;
            presentPercentage: number;
            presentPercentageWith: string;
        }[];
    };
}) => {
    const calculateOverallAttendance = () => {
        let totalPeriods = 0;
        let totalPresent = 0;

        course.attendanceCourseComponentNameInfoList.forEach(component => {
            totalPeriods += component.numberOfPeriods;
            totalPresent += component.numberOfPresent;
        });

        const overallPercentage = totalPeriods > 0 ? (totalPresent / totalPeriods) * 100 : 0;
        return {
            totalPeriods,
            totalPresent,
            percentage: overallPercentage,
            totalComponents: course.attendanceCourseComponentNameInfoList.length
        };
    };

    const attendance = calculateOverallAttendance();

    const getBarColor = () => {
        if (attendance.percentage >= 75) return 'bg-green-500';
        if (attendance.percentage >= 60) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    const getStatusText = () => {
        if (attendance.percentage >= 75) return 'Safe';
        if (attendance.percentage >= 60) return 'Warning';
        return 'Danger';
    };

    const getStatusColor = () => {
        if (attendance.percentage >= 75) return 'text-green-400';
        if (attendance.percentage >= 60) return 'text-yellow-400';
        return 'text-red-400';
    };
    return (
        <View
            className="w-full bg-gray-800 py-5 px-4 rounded-[20px] shadow-lg mb-4 border-l-4 border-blue-500"
        >
            <View className="flex-row justify-between items-start mb-4">
                <View className="flex-1">
                    <Text className="text-white text-lg font-bold mb-1" numberOfLines={2}>
                        {course.courseName}
                    </Text>
                    <Text className="text-gray-400 text-sm">
                        {course.courseCode}
                    </Text>
                </View>
                <View className="flex-row items-center">
                    <View className={`w-2 h-2 rounded-full ${getBarColor()} mr-2`} />
                    <Text className={`text-sm font-medium ${getStatusColor()}`}>
                        {getStatusText()}
                    </Text>
                </View>
            </View>
            <View className="flex-row items-end justify-between mb-4">
                <View className="flex-row items-end">
                    <Text className="text-3xl font-bold text-white">
                        {attendance.percentage.toFixed(1)}%
                    </Text>
                    <Text className="text-gray-400 text-sm ml-2 mb-1">
                        Overall
                    </Text>
                </View>
                <View className="items-end">
                    <Text className="text-white text-sm font-bold">
                        {attendance.totalPresent} / {attendance.totalPeriods}
                    </Text>
                    <Text className="text-gray-400 text-xs">
                        Present / Total
                    </Text>
                </View>
            </View>
            <View className="mb-4">
                <View className="flex-row justify-between mb-2">
                    <Text className="text-gray-400 text-xs">0%</Text>
                    <Text className="text-gray-400 text-xs">75%</Text>
                    <Text className="text-gray-400 text-xs">100%</Text>
                </View>
                <View className="w-full h-4 bg-gray-700 rounded-full overflow-hidden">
                    <View
                        className={`h-4 rounded-full ${getBarColor()}`}
                        style={{ width: `${Math.min(attendance.percentage, 100)}%` }}
                    />
                </View>
            </View>
        </View>
    )
}

export default AttendanceCard