import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RoutesConst from '../../../constants/routes/RoutesConst';
import AttendanceScreen from '../../../screen/main/stack/AttendanceScreen';
import CgpaScreen from '../../../screen/main/stack/CgpaScreen';
import CgpaDetailScreen from '../../../screen/main/stack/CgpaDetailScreen';
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
        </Stack.Navigator>
    )
}

export default StackNavigation