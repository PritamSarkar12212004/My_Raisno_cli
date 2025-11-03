import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import RoutesConst from '../../../constants/routes/RoutesConst';

const CgpaCard = ({
    data
}: {
    data: {
        academicSessionName: string;
        admissionBatchName: string;
        degreeName: string;
        cgpa: any;
        degreeBranchSemesterName: string;
        rollNumber: string;
        sectionName: string;
        semesterName: string;
        studentSemesterWiseMarksDetailsList: {
            backlog: boolean;
            currentSemesterName: string;
            getSessionStartDate: string;
            regForSessionName: string;
            semesterName: string;
            sgpa: any;
            studentMarksDetailsDTO: {
                backlog: boolean;
                courseCode: string;
                courseName: string;
                resultSort: string;
                sessionName: string;
                courseCompDTOList: {
                    courseCompName: string;
                    compSessionLevelMarks: {
                        grade: string;
                        gradePoint: number;
                        marksObtained: number;
                        marksOutOf: number;
                        percentageWith: string;
                        regSessionName: string;
                        registerType: string;
                        result: string;
                    }[]
                }[]
            }[]
        }[]
    }
}) => {
    const navigation = useNavigation();
    const cgpaValue = parseFloat(data.cgpa) || 0;

    // Calculate overall statistics
    const calculateOverallStats = () => {
        let totalCourses = 0;
        let totalBacklogs = 0;
        let totalCredits = 0;
        let highestSGPA = 0;
        let lowestSGPA = 10;

        data.studentSemesterWiseMarksDetailsList.forEach(semester => {
            const sgpa = parseFloat(semester.sgpa) || 0;
            highestSGPA = Math.max(highestSGPA, sgpa);
            lowestSGPA = Math.min(lowestSGPA, sgpa);

            semester.studentMarksDetailsDTO.forEach(course => {
                totalCourses++;
                if (course.backlog) totalBacklogs++;
                const courseCredits = 4;
                totalCredits += courseCredits;
            });
        });

        return {
            totalCourses,
            totalBacklogs,
            totalCredits,
            highestSGPA: highestSGPA.toFixed(2),
            lowestSGPA: lowestSGPA.toFixed(2),
            completionRate: ((totalCourses - totalBacklogs) / totalCourses * 100).toFixed(1)
        };
    };

    const overallStats = calculateOverallStats();

    const getCgpaColor = (value: number) => {
        if (value >= 9.0) return 'text-green-500';
        if (value >= 8.0) return 'text-blue-500';
        if (value >= 7.0) return 'text-yellow-500';
        if (value >= 6.0) return 'text-orange-500';
        return 'text-red-500';
    };

    const getCgpaBgColor = (value: number) => {
        if (value >= 9.0) return 'bg-green-500';
        if (value >= 8.0) return 'bg-blue-500';
        if (value >= 7.0) return 'bg-yellow-500';
        if (value >= 6.0) return 'bg-orange-500';
        return 'bg-red-500';
    };

    const getStatusText = (value: number) => {
        if (value >= 9.0) return 'Outstanding';
        if (value >= 8.0) return 'Excellent';
        if (value >= 7.0) return 'Very Good';
        if (value >= 6.0) return 'Good';
        return 'Needs Improvement';
    };

    const navigateToSemesterDetail = (semester: any, index: number) => {
        navigation.navigate(RoutesConst.STACK_SCREEN.CGPA_DETILES, {
            semester: semester,
        });
    };

    return (
        <View >
            <View className="bg-gray-800 rounded-2xl  mt-4 p-5">
                <View className="flex-row justify-between items-start mb-4">
                    <View>
                        <Text className="text-white text-lg font-bold">CGPA</Text>
                        <Text className="text-gray-400 text-sm">{data.degreeName}</Text>
                    </View>
                    <View className="bg-gray-700 rounded-lg px-3 py-1">
                        <Text className="text-white text-xs">{data.academicSessionName}</Text>
                    </View>
                </View>

                <View className="flex-row items-end justify-between mb-4">
                    <View className="flex-row items-end">
                        <Text className={`text-4xl font-bold ${getCgpaColor(cgpaValue)}`}>
                            {cgpaValue.toFixed(2)}
                        </Text>
                        <Text className="text-gray-400 text-lg ml-1 mb-1">/10</Text>
                    </View>
                    <View className="flex-row items-center">
                        <View className={`w-2 h-2 rounded-full ${getCgpaBgColor(cgpaValue)} mr-2`} />
                        <Text className="text-white text-sm">{getStatusText(cgpaValue)}</Text>
                    </View>
                </View>

                <View className="mb-2">
                    <View className="flex-row justify-between mb-1">
                        <Text className="text-gray-400 text-xs">0</Text>
                        <Text className="text-gray-400 text-xs">10</Text>
                    </View>
                    <View className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                        <View
                            className={`h-2 rounded-full ${getCgpaBgColor(cgpaValue)}`}
                            style={{ width: `${(cgpaValue / 10) * 100}%` }}
                        />
                    </View>
                </View>
            </View>

            {/* Quick Stats - Compact Grid */}
            <View className="flex-row  mt-4">
                <View className="flex-1 bg-gray-800 rounded-2xl p-4 mr-2">
                    <Text className="text-gray-400 text-sm mb-1">Courses</Text>
                    <Text className="text-white text-xl font-bold">{overallStats.totalCourses}</Text>
                </View>
                <View className="flex-1 bg-gray-800 rounded-2xl p-4 mx-2">
                    <Text className="text-gray-400 text-sm mb-1">Credits</Text>
                    <Text className="text-green-500 text-xl font-bold">{overallStats.totalCredits}</Text>
                </View>
                <View className="flex-1 bg-gray-800 rounded-2xl p-4 ml-2">
                    <Text className="text-gray-400 text-sm mb-1">Backlogs</Text>
                    <Text className="text-red-500 text-xl font-bold">{overallStats.totalBacklogs}</Text>
                </View>
            </View>

            {/* Student Info - Compact */}
            <View className="bg-gray-800 rounded-2xl  mt-3 p-4">
                <Text className="text-white font-bold mb-3">Student Info</Text>
                <View className="flex-row flex-wrap">
                    <View className="w-1/2 mb-3">
                        <Text className="text-gray-400 text-xs">Roll No</Text>
                        <Text className="text-white text-sm font-medium">{data.rollNumber}</Text>
                    </View>
                    <View className="w-1/2 mb-3">
                        <Text className="text-gray-400 text-xs">Section</Text>
                        <Text className="text-white text-sm font-medium">{data.sectionName}</Text>
                    </View>
                    <View className="w-1/2">
                        <Text className="text-gray-400 text-xs">Batch</Text>
                        <Text className="text-white text-sm font-medium">{data.admissionBatchName}</Text>
                    </View>
                    <View className="w-1/2">
                        <Text className="text-gray-400 text-xs">Program</Text>
                        <Text className="text-white text-sm font-medium" numberOfLines={1}>{data.degreeName}</Text>
                    </View>
                </View>
            </View>

            {/* Performance Overview - Compact */}
            <View className="bg-gray-800 rounded-2xl  mt-3 p-4">
                <Text className="text-white font-bold mb-3">Performance</Text>
                <View className="flex-row justify-between">
                    <View className="items-center flex-1">
                        <Text className="text-green-500 text-lg font-bold">{overallStats.highestSGPA}</Text>
                        <Text className="text-gray-400 text-xs mt-1">Highest</Text>
                    </View>
                    <View className="w-px h-8 bg-gray-600" />
                    <View className="items-center flex-1">
                        <Text className="text-yellow-500 text-lg font-bold">{overallStats.lowestSGPA}</Text>
                        <Text className="text-gray-400 text-xs mt-1">Lowest</Text>
                    </View>
                    <View className="w-px h-8 bg-gray-600" />
                    <View className="items-center flex-1">
                        <Text className="text-blue-500 text-lg font-bold">{overallStats.completionRate}%</Text>
                        <Text className="text-gray-400 text-xs mt-1">Complete</Text>
                    </View>
                </View>
            </View>

            {/* Semester Breakdown - Compact */}
            <View className=" mt-4 mb-6">
                <Text className="text-white font-bold mb-3 text-lg">Semesters</Text>

                {data.studentSemesterWiseMarksDetailsList.map((semester, semesterIndex) => {
                    const sgpaValue = parseFloat(semester.sgpa) || 0;
                    const semesterStats = {
                        totalCourses: semester.studentMarksDetailsDTO.length,
                        passedCourses: semester.studentMarksDetailsDTO.filter(course => !course.backlog).length,
                        backlogs: semester.studentMarksDetailsDTO.filter(course => course.backlog).length
                    };

                    return (
                        <TouchableOpacity
                            activeOpacity={0.8}
                            key={semesterIndex}
                            onPress={() => navigateToSemesterDetail(semester, semesterIndex)}
                            className="bg-gray-800 rounded-xl p-4 mb-3 active:opacity-70"
                        >
                            <View className="flex-row justify-between items-center">
                                <View className="flex-1">
                                    <Text className="text-white font-bold text-base mb-1">
                                        {semester.semesterName}
                                    </Text>
                                    <Text className="text-gray-400 text-xs mb-2">
                                        {semester.regForSessionName}
                                    </Text>

                                    <View className="flex-row">
                                        <View className="mr-4">
                                            <Text className="text-white text-sm">{semesterStats.totalCourses}</Text>
                                            <Text className="text-gray-400 text-xs">Courses</Text>
                                        </View>
                                        <View className="mr-4">
                                            <Text className="text-green-500 text-sm">{semesterStats.passedCourses}</Text>
                                            <Text className="text-gray-400 text-xs">Passed</Text>
                                        </View>
                                        <View>
                                            <Text className="text-red-500 text-sm">{semesterStats.backlogs}</Text>
                                            <Text className="text-gray-400 text-xs">Backlogs</Text>
                                        </View>
                                    </View>
                                </View>

                                <View className="items-end">
                                    <Text className={`text-2xl font-bold ${getCgpaColor(sgpaValue)}`}>
                                        {sgpaValue.toFixed(2)}
                                    </Text>
                                    <Text className="text-gray-400 text-xs">SGPA</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};

export default CgpaCard;