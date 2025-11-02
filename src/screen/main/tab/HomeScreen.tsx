import React, { Fragment } from 'react'
import MainWraper from '../../../layouts/wraper/main/MainWraper'
import MainHeader from '../../../components/main/Header/MainHeader'
import { userContext } from '../../../utils/provider/ContextProvider'
import DashCard from '../../../components/main/cards/DashCard'
import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import RoutesConst from '../../../constants/routes/RoutesConst'


const MainScreen = () => {
    const navigation = useNavigation()
    const { userData } = userContext()
    return (
        <MainWraper>
            {userData && (
                <Fragment>
                    <MainHeader
                        profileImage={userData?.profileImage}
                        userDetails={userData?.userDetilesData}
                    />
                    <View className='flex-1 flex gap-3 pt-2'>
                        <DashCard percentage={userData?.attendanceData.presentPerc} range={["0%", "50%", "100%"]} title={"Attendance"} type={""} navigation={navigation} path={RoutesConst.STACK_SCREEN.ATTENDANCE} />
                        <DashCard percentage={parseFloat(
                            ((parseFloat(userData.corseData.cgpaData) / 10) * 10).toFixed(2)
                        )} range={["0%", "5%", "10%"]} title={"CGPA"} type={"cgpa"} navigation={navigation} path={RoutesConst.STACK_SCREEN.ATTENDANCE} />
                    </View>
                </Fragment>
            )}
        </MainWraper>
    )
}


export default MainScreen