import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Hello Home Screen</Text>
    </View>
  );
}
