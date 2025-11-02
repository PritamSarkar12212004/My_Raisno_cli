

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabbarProp from '../../../components/main/navigation/TabbarProp';
import MainScreen from '../../../screen/main/tab/HomeScreen';
import AnalizeScreen from '../../../screen/main/tab/AnalizeScreen';
import NotificationScreen from '../../../screen/main/tab/NotificationScreen';
import ProfileScreen from '../../../screen/main/tab/ProfileScreen';

const Tab = createBottomTabNavigator();

const MainNavigation = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}
      tabBar={(props) => <TabbarProp     {...props} />
      }
    >
      <Tab.Screen name="HomeScreen" component={MainScreen} />
      <Tab.Screen name="AnalizeScreen" component={AnalizeScreen} />
      <Tab.Screen name="NotificationScreen" component={NotificationScreen} />
      <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
    </Tab.Navigator >
  )
}

export default MainNavigation