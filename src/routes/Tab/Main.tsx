import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Main from 'app/src/components/pages/Main';
import Sub from 'app/src/components/pages/Sub';

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Main" component={Main} />
      <Tab.Screen name="Sub" component={Sub} />
    </Tab.Navigator>
  );
}
