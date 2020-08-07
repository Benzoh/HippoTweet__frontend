import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, AsyncStorage, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { retrieveData, removeData } from 'app/src/lib/localStorage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function Sub() {
  const { navigate } = useNavigation();
  const [auth, setAuth] = useState();

  // console.log('__auth__', { auth });
  if (!auth) {
    retrieveData('TWITTER_USER').then(result => {
      setAuth(result);
    });
  }

  // FIXME: これなんか微妙。
  useEffect(() => {
    console.log('useEffect', { auth });
  }, [auth]);

  return (
    <View style={styles.container}>
      <Text>{auth ? auth.screen_name : ''}</Text>
      <Button
        title="Logout"
        onPress={() =>
          removeData('TWITTER_USER').then(() => {
            setAuth(null);
            navigate('Login');
          })
        }
      />
    </View>
  );
}
