import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RoutesConst from '../../../constants/routes/RoutesConst';
import AttendanceScreen from '../../../screen/main/stack/AttendanceScreen';
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
        </Stack.Navigator>
    )
}

export default StackNavigation