import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Header from 'app/src/components/molecule/Header';
import Tweet from 'app/src/components/molecule/Tweet';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});

export default function Main() {
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

  if (!auth) {
    // console.log('auth', { auth });
    _retrieveData();
  }

  return (
    <View style={styles.container}>
      <Header />
      <Tweet />
    </View>
  );
}
