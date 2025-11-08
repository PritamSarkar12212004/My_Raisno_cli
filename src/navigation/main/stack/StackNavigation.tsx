import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RoutesConst from '../../../constants/routes/RoutesConst';
import AttendanceScreen from '../../../screen/main/stack/AttendanceScreen';
import CgpaScreen from '../../../screen/main/stack/cgpa/CgpaScreen';
import CgpaDetailScreen from '../../../screen/main/stack/cgpa/CgpaDetailScreen';
import ExamScoreScreen from '../../../screen/main/stack/Receipt/ExamScoreScreen';
import FainanceReceiptScreen from '../../../screen/main/stack/Receipt/FainanceReceiptScreen';
import PhoneNumberLink from '../../../screen/main/stack/Link/PhoneNumberLink';
import OtpBarifyScreen from '../../../screen/main/stack/Link/OtpBarifyScreen';
const Stack = createNativeStackNavigator()

const StackNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
            animation: "ios_from_right"
        }}>
            <Stack.Screen name={RoutesConst.STACK_SCREEN.ATTENDANCE} options={{
                animation: "ios_from_right"
            }} component={AttendanceScreen} />
            <Stack.Screen name={RoutesConst.STACK_SCREEN.CGPA} options={{
                animation: "ios_from_right"
            }} component={CgpaScreen} />
            <Stack.Screen name={RoutesConst.STACK_SCREEN.CGPA_DETILES} options={{
                animation: "ios_from_right"
            }} component={CgpaDetailScreen} />
            <Stack.Screen name={RoutesConst.STACK_SCREEN.EXAM_SCORE} options={{
                animation: "ios_from_right"
            }} component={ExamScoreScreen} />
            <Stack.Screen name={RoutesConst.STACK_SCREEN.FAINANCE_RECEIPT} options={{
                animation: "ios_from_right"
            }} component={FainanceReceiptScreen} />
            <Stack.Screen name={RoutesConst.STACK_SCREEN.PHONE_NUMBER_LINK} options={{
                animation: "ios_from_right"
            }} component={PhoneNumberLink} />
            <Stack.Screen name={RoutesConst.STACK_SCREEN.PHONE_NUMBER_VARIFY_OTP} options={{
                animation: "ios_from_right"
            }} component={OtpBarifyScreen} />

        </Stack.Navigator>
    )
}

export default StackNavigation