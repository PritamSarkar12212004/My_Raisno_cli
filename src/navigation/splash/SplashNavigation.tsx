import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../../screen/splash/SplashScreen';
const Stack = createNativeStackNavigator();

const SplashNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="main" component={SplashScreen} />
        </Stack.Navigator>
    )
}

export default SplashNavigation