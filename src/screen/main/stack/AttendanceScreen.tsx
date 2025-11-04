import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import SubWraper from '../../../layouts/wraper/main/SubWraper'
import SubHeader from '../../../components/main/Header/SubHeader'
import { useRoute } from '@react-navigation/native'
import DataLoading from '../../../components/main/Loading/DataLoading'
import AttendanceApi from '../../../functions/api/main/AttendanceApi'
import { userContext } from '../../../utils/provider/ContextProvider'
import AttendanceCard from '../../../components/main/cards/AttendanceCard'

const AttendanceScreen = () => {
    const { params } = useRoute()
    const path = params?.title
    const { univarsalTokenData } = userContext()
    const [loading, setLoading] = useState<boolean | any | {
        status: boolean,
        load: boolean
    }>({
        status: true,
        load: true
    })
    const [data, setData] = useState<
        | null
        | {
            attendanceData: {
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
                courseCode: any;
                courseId: number;
                courseName: string;
            }[];
            commenDetiles: {
                academicSessionName: string;
                degreeBranchSemesterName: string;
                degreeName: string;
                semesterName: string;
            };
        }
    >(null);

    const func = () => {

    }
    useEffect(() => {
        AttendanceApi({
            token: univarsalTokenData?.Token,
            id: univarsalTokenData?.Id,
            setData: setData,
            setloading: setLoading
        })
    }, [null])
    return (
        <SubWraper>
            <SubHeader path={path} />
            <View className='flex-1'>
                {
                    loading.load ? <DataLoading
                        status={loading.status}
                        func={func}
                        loading={loading}
                    /> : data?.attendanceData?.map((course, index) => (
                        <AttendanceCard
                            key={course.courseId || index}
                            course={course}
                        />
                    ))}

            </View>
        </SubWraper>
    )
}

export default AttendanceScreen