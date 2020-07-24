import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

// import Routes from 'app/src/routes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function App() {
  return (
    <>
      <View style={styles.container}>
        <Text>hoge!!</Text>
      </View>
    </>
  );
}
