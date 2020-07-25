import React, { useState } from 'react';
import { Text } from 'react-native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';

import Main from 'app/src/components/pages/Main';
import Sub from 'app/src/components/pages/Sub';
import { COLOR } from 'app/src/constants/theme';

const Stack = createStackNavigator();

export default function SubNavigator() {
  return (
    <Stack.Navigator headerMode="screen" initialRouteName="Sub">
      {/* FIXME: mainいらないかも */}
      <Stack.Screen
        name="Main"
        component={Main}
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
    </Stack.Navigator>
  );
}
