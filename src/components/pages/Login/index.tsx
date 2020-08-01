import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CONFIG } from 'app/src/constants/config';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function Login() {
  const { navigate } = useNavigation();

  return (
    <View style={styles.container}>
      <Text>{CONFIG.APP_NAME}</Text>
    </View>
  );
}
