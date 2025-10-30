import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import RoutesConst from '../../constants/routes/RoutesConst'
import AuthScreen from '../../screen/auth/AuthScreen'
import AutrhPhoneScreen from '../../screen/auth/AutrhPhoneScreen';

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName={RoutesConst.AUTH_ROUTE.AUTH_SCREEN}

        >
            <Stack.Screen name={RoutesConst.AUTH_ROUTE.AUTH_SCREEN} component={AuthScreen} options={{
                animation: 'slide_from_right'
            }} />
            <Stack.Screen name={RoutesConst.AUTH_ROUTE.PHONE_SCREEN} component={AutrhPhoneScreen} options={{
                animation: 'slide_from_right'
            }} />
        </Stack.Navigator>
    )
}

export default AuthNavigation