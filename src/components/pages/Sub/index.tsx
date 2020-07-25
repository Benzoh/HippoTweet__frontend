import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function Sub() {
  return (
    <View style={styles.container}>
      <Text>sub</Text>
    </View>
  );
}
