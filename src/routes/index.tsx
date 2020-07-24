import React from 'react';
import { Text, View, Button } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Entypo, Ionicons, Feather, FontAwesome } from '@expo/vector-icons';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home</Text>
        <Button
          title='Link to About'
          onPress={() => this.props.navigation.navigate('About')}
        />
      </View>
    );
  }
}

class UserScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>User</Text>
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    User: UserScreen,
  }
  ,
  {
    initialRouteName: 'Home',
  }
);

RootStack.navigationOptions = {
  tabBarIcon: ({ tintColor }) => <Entypo size={24} name="home" color={tintColor} />,
}

UserScreen.navigationOptions = {
  tabBarIcon: ({ tintColor }) => <Ionicons size={24} name="md-acount" color={tintColor} />,
}

export default createBottomTabNavigator({
  Home: RootStack,
  User: UserScreen,
});
