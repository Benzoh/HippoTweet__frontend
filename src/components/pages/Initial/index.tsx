import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { retrieveData } from 'app/src/lib/localStorage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function Initial() {
  const { navigate } = useNavigation();

  retrieveData('TWITTER_USER_INFO').then(result => {
    if (result) {
      navigate('Main');
    }
  });

  return (
    <View style={styles.container}>
      <Text
        onPress={() => {
          navigate('Login');
        }}
      >
        initial
      </Text>
    </View>
  );
}
