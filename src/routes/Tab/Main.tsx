import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Main from 'app/src/components/pages/Main';
import Sub from 'app/src/components/pages/Sub';
import { COLOR } from 'app/src/constants/theme';

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = 'ios-home';

          if (route.name === 'Main') {
            iconName = focused ? 'ios-home' : 'ios-home';
          } else if (route.name === 'Sub') {
            iconName = focused ? 'ios-person' : 'ios-person';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: COLOR.MAIN,
        inactiveTintColor: '#ccc',
      }}
    >
      <Tab.Screen name="Main" component={Main} />
      <Tab.Screen name="Sub" component={Sub} />
    </Tab.Navigator>
  );
}
