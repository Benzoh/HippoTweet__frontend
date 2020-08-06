import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, AsyncStorage, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function Sub() {
  const { navigate } = useNavigation();
  const [auth, setAuth] = useState();

  const _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
        const user = JSON.parse(value);
        setAuth(user);
      } else {
        navigate('Login');
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const _removeData = async () => {
    try {
      await AsyncStorage.removeItem('user');
      navigate('Login');
    } catch (error) {
      console.log('_removeDate', { error });
    }
  };

  // console.log('__auth__', { auth });
  if (!auth) {
    _retrieveData();
  }

  return (
    <View style={styles.container}>
      <Text>User: @{auth.screen_name}</Text>
      <Button title="Logout" onPress={_removeData} />
    </View>
  );
}
