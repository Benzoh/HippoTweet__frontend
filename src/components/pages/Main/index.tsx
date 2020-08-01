import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
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

// TODO: 認証なければ
// const auth = true;
const auth = false;

export default function Main() {
  const { navigate } = useNavigation();

  if (!auth) {
    navigate('Login');
  }

  return (
    <View style={styles.container}>
      <Header />
      <Tweet />
    </View>
  );
}
