import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Header from 'app/src/components/molecule/Header';
import Tweet from 'app/src/components/molecule/Tweet';
import { retrieveData } from 'app/src/lib/localStorage';

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

  if (!auth) {
    retrieveData('TWITTER_TOKEN').then(result => {
      if (!result) {
        navigate('Login');
      }
      setAuth(result);
    });
  }

  return (
    <View style={styles.container}>
      <Header />
      <Tweet />
    </View>
  );
}
