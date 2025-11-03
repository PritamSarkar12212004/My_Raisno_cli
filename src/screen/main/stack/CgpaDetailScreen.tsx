import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import Icon from '../../../components/global/icon/Icon'
import SubWraper from '../../../layouts/wraper/main/SubWraper'
import SubHeader from '../../../components/main/Header/SubHeader'

const CgpaDetailScreen = () => {
    const navigation = useNavigation()
    const { params } = useRoute()
    const { semester } = params

    const [expandedCourse, setExpandedCourse] = useState<string | null>(null)

    const getGradeColor = (grade: string) => {
        const gradeMap: { [key: string]: string } = {
            'A+': 'text-green-400', 'A': 'text-green-400', 'A-': 'text-green-400',
            'B+': 'text-blue-400', 'B': 'text-blue-400', 'B-': 'text-yellow-400',
            'C+': 'text-yellow-400', 'C': 'text-orange-400', 'D': 'text-red-400', 'F': 'text-red-400'
        };
        return gradeMap[grade] || 'text-gray-400';
    };

    const getCgpaColor = (value: number) => {
        if (value >= 9.0) return 'text-green-400';
        if (value >= 8.0) return 'text-blue-400';
        if (value >= 7.0) return 'text-yellow-400';
        if (value >= 6.0) return 'text-orange-400';
        return 'text-red-400';
    };

    const sgpaValue = parseFloat(semester.sgpa) || 0;
    const semesterStats = {
        totalCourses: semester.studentMarksDetailsDTO.length,
        passedCourses: semester.studentMarksDetailsDTO.filter(course => !course.backlog).length,
        backlogs: semester.studentMarksDetailsDTO.filter(course => course.backlog).length,
        completionRate: ((semester.studentMarksDetailsDTO.filter(course => !course.backlog).length / semester.studentMarksDetailsDTO.length) * 100).toFixed(1)
    };

    return (
        <SubWraper>
            <SubHeader path='CGPA DETILES' />
            <View className=" pt-12 pb-6">

                <View className="flex-row justify-between items-center">
                    <View className="flex-1">
                        <Text className="text-white text-2xl font-bold mb-1">
                            {semester.semesterName}
                        </Text>
                        <Text className="text-blue-200 text-sm">
                            {semester.regForSessionName}
                        </Text>
                    </View>
                    <View className="items-end">
                        <Text className={`text-4xl font-black ${getCgpaColor(sgpaValue)}`}>
                            {sgpaValue.toFixed(2)}
                        </Text>
                        <Text className="text-blue-200 text-sm">SGPA</Text>
                    </View>
                </View>
            </View>

            <View className="flex-1 " >
                {/* Semester Statistics */}
                <View className="bg-gray-800 rounded-2xl p-5 mt-6">
                    <Text className="text-white text-xl font-bold mb-4">Semester Overview</Text>

                    <View className="flex-row justify-between mb-4">
                        <View className="items-center flex-1">
                            <Text className="text-white text-3xl font-bold">{semesterStats.totalCourses}</Text>
                            <Text className="text-gray-400 text-xs text-center">Total Courses</Text>
                        </View>
                        <View className="w-px h-12 bg-gray-600" />
                        <View className="items-center flex-1">
                            <Text className="text-green-400 text-3xl font-bold">{semesterStats.passedCourses}</Text>
                            <Text className="text-gray-400 text-xs text-center">Passed</Text>
                        </View>
                        <View className="w-px h-12 bg-gray-600" />
                        <View className="items-center flex-1">
                            <Text className="text-red-400 text-3xl font-bold">{semesterStats.backlogs}</Text>
                            <Text className="text-gray-400 text-xs text-center">Backlogs</Text>
                        </View>
                    </View>

                    <View className="bg-gray-700/30 rounded-xl p-4">
                        <Text className="text-white font-semibold text-center mb-2">
                            Completion Rate: <Text className="text-green-400">{semesterStats.completionRate}%</Text>
                        </Text>
                        <View className="w-full h-3 bg-gray-600 rounded-full overflow-hidden">
                            <View
                                className="h-3 bg-green-500 rounded-full"
                                style={{ width: `${semesterStats.completionRate}%` }}
                            />
                        </View>
                    </View>
                </View>

                {/* Courses List */}
                <View className="mt-6">
                    <Text className="text-white text-xl font-bold mb-4">Course Details</Text>

                    {semester.studentMarksDetailsDTO.map((course, courseIndex) => (
                        <View key={courseIndex} className="mb-4">
                            <TouchableOpacity
                                onPress={() => setExpandedCourse(expandedCourse === course.courseCode ? null : course.courseCode)}
                                className="bg-gray-800 rounded-2xl p-4 flex-row justify-between items-center"
                            >
                                <View className="flex-1">
                                    <Text className="text-white text-lg font-semibold mb-1">
                                        {course.courseName}
                                    </Text>
                                    <Text className="text-gray-400 text-sm">
                                        {course.courseCode}
                                    </Text>
                                </View>
                                <View className="flex-row items-center">
                                    <View className={`px-3 py-2 rounded-full ${course.backlog ? 'bg-red-500/20' : 'bg-green-500/20'
                                        } mr-3`}>
                                        <Text className={`text-sm font-bold ${course.backlog ? 'text-red-400' : 'text-green-400'
                                            }`}>
                                            {course.backlog ? 'Backlog' : 'Completed'}
                                        </Text>
                                    </View>
                                    <Icon
                                        name={expandedCourse === course.courseCode ? "chevron-up" : "chevron-down"}
                                        size={20}
                                        color="#9CA3AF"
                                    />
                                </View>
                            </TouchableOpacity>

                            {/* Expanded Course Details */}
                            {expandedCourse === course.courseCode && course.courseCompDTOList.length > 0 && (
                                <View className="bg-gray-700 rounded-b-2xl p-4 mt-1">
                                    <Text className="text-white font-semibold mb-3">Assessment Components</Text>

                                    {course.courseCompDTOList.map((comp, compIndex) => (
                                        <View key={compIndex} className="mb-4 last:mb-0">
                                            <Text className="text-gray-300 text-lg font-medium mb-3">
                                                {comp.courseCompName}
                                            </Text>

                                            {comp.compSessionLevelMarks.map((mark, markIndex) => (
                                                <View key={markIndex} className="bg-gray-600/30 rounded-xl p-4 mb-3">
                                                    <View className="flex-row justify-between items-start mb-3">
                                                        <View>
                                                            <Text className="text-white text-sm font-semibold">
                                                                Marks Obtained
                                                            </Text>
                                                            <Text className="text-white text-2xl font-bold">
                                                                {mark.marksObtained}<Text className="text-gray-400 text-lg">/{mark.marksOutOf}</Text>
                                                            </Text>
                                                        </View>
                                                        <View className="items-end">
                                                            <Text className={`text-2xl font-black ${getGradeColor(mark.grade)}`}>
                                                                {mark.grade}
                                                            </Text>
                                                            <Text className="text-gray-400 text-sm">
                                                                Grade Point: {mark.gradePoint}
                                                            </Text>
                                                        </View>
                                                    </View>

                                                    <View className="flex-row justify-between">
                                                        <View>
                                                            <Text className="text-gray-400 text-xs mb-1">Percentage</Text>
                                                            <Text className="text-white text-sm font-semibold">{mark.percentageWith}</Text>
                                                        </View>
                                                        <View className="items-end">
                                                            <Text className="text-gray-400 text-xs mb-1">Result</Text>
                                                            <Text className="text-white text-sm font-semibold">{mark.result}</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            ))}
                                        </View>
                                    ))}
                                </View>
                            )}
                        </View>
                    ))}
                </View>

                <View className="h-20" />
            </View>
        </SubWraper>
    )
}

export default CgpaDetailScreen