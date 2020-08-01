import React, { useState } from 'react';
import { Text } from 'react-native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';


// import Main from 'app/src/routes/Tab/Main';
import Main from 'app/src/components/pages/Main';
import Sub from 'app/src/components/pages/Sub';
import Login from 'app/src/components/pages/Login';
import { COLOR } from 'app/src/constants/theme';

const Stack = createStackNavigator();
// const NestedStack = createStackNavigator();

const Tab = createBottomTabNavigator();

function MainTabNavigator() {
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

export default function SubNavigator() {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="Main">
      <Stack.Screen
        name="Main"
        component={MainTabNavigator}
        options={{
          // TODO: 画面遷移はできたけどこれだとTab表示できない。
          headerShown: false,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: COLOR.MAIN,
          },
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="Sub"
        component={Sub}
        options={({ navigation }) => ({
          headerTitleAlign: 'center',
          headerLeft: () => <HeaderBackButton onPress={() => navigation.navigate('Main')} />,
          headerStyle: {
            backgroundColor: COLOR.MAIN,
          },
          headerTintColor: '#fff',
          // headerTitleStyle: { alignSelf: 'center', width: '33.33%' },
        })}
      />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}
