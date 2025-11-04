import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashNavigation from '../../navigation/splash/SplashNavigation';
import AuthNavigation from '../../navigation/auth/AuthNavigation';
import MainLoader from '../../components/global/Loader/MainLoader';
import MainNavigation from '../../navigation/main/tab/MainNavigation';
import StackNavigation from '../../navigation/main/stack/StackNavigation';
const Stack = createNativeStackNavigator();


const RouteHandler = ({ route }: any) => {
    if (!route) {
        return <MainLoader />
    }
    return (
        <Stack.Navigator
            key={route}
            screenOptions={{ headerShown: false }}
            initialRouteName={route}
        >
            <Stack.Screen name="splash" component={SplashNavigation} />
            <Stack.Screen name="auth" component={AuthNavigation} />
            <Stack.Screen name="main" component={MainNavigation} />
            <Stack.Screen name="stack" component={StackNavigation} />
        </Stack.Navigator>
    )
}

export default RouteHandler