import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, Platform } from 'react-native';

import HomeScreen from 'app/src/screens/HomeScreen';
import UserScreen from 'app/src/screens/UserScreen';

const styles = StyleSheet.create({
  icon: {
    marginBottom: -3,
  },
});
const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} style={styles.icon} />
          ),
        }}
      />
      <Tab.Screen
        name="MeTab"
        component={UserScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} style={styles.icon} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function () {
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
}
