import React from 'react';
import { Constants } from 'expo';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from 'app/src/screens/HomeScreen';
import UserScreen from 'app/src/screens/UserScreen';
import { HomeTabIcon, MeTabIcon, SearchTabIcon, TabBar } from 'app/src/components/Tab';
import { TabActionHelpers } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName={HomeTab}
      tabBarOptions={{
        showLabel: false,
        activeTintColor: '#333',
        inactiveTintColor: '#bbb',
        style: {
          backgroundColor: Constants.manifest.extra.backgroundColor,
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{ tabBarIcon: SearchTabIcon({ tintColor: '#333' }) }}
      />
      <Tab.Screen name="MeTab" component={UserScreen} options={{ tabBarIcon: MeTabIcon({ tintColor: '#333' }) }} />
    </Tab.Navigator>
  );
}
