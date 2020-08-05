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
        // We have data!!
        // console.log('user info ->', JSON.parse(value));
        setAuth(JSON.parse(value));
      } else {
        navigate('Login');
      }
    } catch (error) {
      // Error retrieving data
      console.log({ error });
    }
  };

  if (!auth) {
    console.log('auth', { auth });
    _retrieveData();
  }

  return (
    <View style={styles.container}>
      <Header />
      <Tweet />
    </View>
  );
}
