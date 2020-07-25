import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function Main() {
  const { navigate } = useNavigation();

  return (
    <>
      <View style={styles.container}>
        <Text>main</Text>
        <TouchableOpacity
          onPress={() => {
            navigate('Sub');
          }}
        >
          <Text>go to sub</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
