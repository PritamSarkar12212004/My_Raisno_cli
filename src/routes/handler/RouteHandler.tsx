import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashNavigation from '../../navigation/splash/SplashNavigation';
import AuthNavigation from '../../navigation/auth/AuthNavigation';
import MainLoader from '../../components/global/Loader/MainLoader';
const Stack = createNativeStackNavigator();


const RouteHandler = ({ route }: any) => {
    if (!route) {
        return <MainLoader />
    }
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName={route}
        >
            <Stack.Screen name="splash" component={SplashNavigation} />
            <Stack.Screen name="auth" component={AuthNavigation} />
        </Stack.Navigator>
    )
}

export default RouteHandler