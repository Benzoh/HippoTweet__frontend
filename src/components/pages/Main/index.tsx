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

export default function Main() {
  const { navigate } = useNavigation();

  return (
    <View style={styles.container}>
      <Header />
      <Tweet />
    </View>
  );
}
