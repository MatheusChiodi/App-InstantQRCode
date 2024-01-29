import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';

import scaleFactor from '../functions/ScaleFactor';

import Home from '../screens/Home';
import Historic from '../screens/Historic';

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#44475A',
        tabBarInactiveTintColor: '#e6e6e6',
        tabBarStyle: {
          backgroundColor: '#fff',
          height: 60 * scaleFactor,
          paddingBottom: 10 * scaleFactor,
          paddingTop: 10 * scaleFactor,
          marginLeft: 0,
          marginRight: 0,
          paddingRight: 10 * scaleFactor,
          elevation: 10 * scaleFactor,
        },
        tabBarLabelStyle: {
          fontSize: 10 * scaleFactor,
          fontWeight: 'bold',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="qrcode" size={24 * scaleFactor} color={color} />
          ),
          tabBarLabel: 'QR Code',
          fontSize: 20 * scaleFactor,
        }}
      />
      <Tab.Screen
        name="Historic"
        component={Historic}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="history" size={24 * scaleFactor} color={color} />
          ),
          tabBarLabel: 'Histórico',
          fontSize: 20 * scaleFactor,
        }}
      />
    </Tab.Navigator>
  );
}
