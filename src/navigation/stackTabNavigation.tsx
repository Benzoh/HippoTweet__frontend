import React from 'react';
import { Text, View, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import HomeScreen from 'app/src/screens/HomeScreen';
import UserScreen from 'app/src/screens/UserScreen';

//Stack
const RootStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    User: UserScreen,
  },
  {
    initialRouteName: 'Home',
  },
);

RootStack.navigationOptions = {
  tabBarIcon: ({ tintColor }) => <Entypo size={24} name="home" color={tintColor} />,
}