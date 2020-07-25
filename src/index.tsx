import React from 'react';
import { Text, View, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation, NavigationContainer } from '@react-navigation/native';

import { COLOR } from 'app/src/constants/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function Main() {
  const { navigate } = useNavigation();

  return (
    <View style={styles.container}>
      <Text>main</Text>
      <TouchableOpacity
        onPress={() => {
          navigate('sub');
        }}
      >
        <Text>go to sub</Text>
      </TouchableOpacity>
    </View>
  );
}

function Sub() {
  return (
    <View style={styles.container}>
      <Text>sub</Text>
    </View>
  );
}

const Stack = createStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen
        name="main"
        component={Main}
        options={{
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: COLOR.MAIN,
          },
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="sub"
        component={Sub}
        options={{
          headerTitleAlign: 'center',
          // headerLeft: () => {
          //   return <Text>Back</Text>;
          // },
          headerStyle: {
            backgroundColor: COLOR.MAIN,
          },
          headerTintColor: '#fff',
          // headerTitleStyle: { alignSelf: 'center', width: '33.33%' },
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer onStateChange={(newState) => console.log(newState)}>
      <StatusBar backgroundColor={COLOR.MAIN} barStyle="light-content" />
      <StackNavigator />
    </NavigationContainer>
  );
}
