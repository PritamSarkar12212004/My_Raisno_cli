import React, { Fragment } from 'react'
import MainWraper from '../../../layouts/wraper/main/MainWraper'
import MainHeader from '../../../components/main/Header/MainHeader'
import { userContext } from '../../../utils/provider/ContextProvider'
import DashCard from '../../../components/main/cards/DashCard'
import { Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import RoutesConst from '../../../constants/routes/RoutesConst'
import Carshol from '../../../components/global/carshol/Carshol'
import MainInfoCard from '../../../components/main/cards/MainInfoCard'


const MainScreen = () => {
    const navigation = useNavigation<any>()
    const { userData } = userContext()

    return (
        <MainWraper>
            {userData && (
                <Fragment>
                    <MainHeader
                        profileImage={userData?.profileImage}
                        userDetails={userData?.userDetilesData}
                    />
                    <View className='flex-1 flex gap-4 pt-2'>
                        <Carshol />
                        <DashCard percentage={userData?.attendanceData.presentPerc} range={["0%", "50%", "100%"]} title={"Attendance"} type={""} navigation={navigation} path={RoutesConst.STACK_SCREEN.ATTENDANCE} />
                        <DashCard percentage={parseFloat(
                            ((parseFloat(userData.corseData.cgpaData) / 10) * 10).toFixed(2)
                        )} range={["0%", "5%", "10%"]} title={"CGPA"} type={"cgpa"} navigation={navigation} path={RoutesConst.STACK_SCREEN.CGPA} />
                        <View className='w-full flex mt-3 gap-3'>
                            <View className='flex gap-2'>
                                <Text className='text-lg font-bold text-white'>
                                    Academic Receipt
                                </Text>
                                <View className='flex w-full  flex-row  items-center justify-between '>
                                    <MainInfoCard title='Exam' color='#799EFF' disc='download exam score card' subTitle='Score Card ' func={() => navigation.navigate("stack", {
                                        screen: RoutesConst.STACK_SCREEN.EXAM_SCORE,
                                    })} />
                                    <MainInfoCard title='Fainance' color='#799EFF' disc='download fainance receipt' func={() => { }} subTitle='Fainance Receipt' />
                                </View>
                            </View>
                            <View className='flex gap-2'>
                                <Text className='text-lg font-bold text-white'>
                                    Academic Receipt
                                </Text>
                                <View className='flex w-full  flex-row  items-center justify-between '>
                                    <MainInfoCard title='Exam' color='#799EFF' disc='download exam score card' subTitle='Score Card ' func={() => navigation.navigate("stack", {
                                        screen: RoutesConst.STACK_SCREEN.EXAM_SCORE,
                                    })} />
                                    <MainInfoCard title='Fainance' color='#799EFF' disc='download fainance receipt' func={() => { }} subTitle='Fainance Receipt' />
                                </View>
                            </View>
                        </View>
                    </View>
                </Fragment>
            )}
        </MainWraper>
    )
}


export default MainScreen