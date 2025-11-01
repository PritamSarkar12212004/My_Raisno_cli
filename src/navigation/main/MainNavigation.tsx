

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabbarProp from '../../components/main/navigation/TabbarProp';
import MainScreen from '../../screen/main/HomeScreen';
import AnalizeScreen from './AnalizeScreen';
import NotificationScreen from './NotificationScreen';
import ProfileScreen from './ProfileScreen';
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