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
  const [user, setUser] = useState();

  console.log('__debug__', { auth, user });
  if (!auth) {
    retrieveData('TWITTER_TOKEN').then(result => {
      setAuth(result);
    });
  }

  if (auth && !user) {
    console.log('__debug__');
    retrieveData('TWITTER_USER_INFO').then(result => {
      setUser(result);
    });
  }

  // FIXME: これなんか微妙。
  useEffect(() => {
    console.log('useEffect', { auth, user });

    if (!auth || !user) {
      removeData('TWITTER_USER_INFO').then(() => {
        setUser(undefined);
        navigate('Login');
      });
    }
  }, [auth, navigate, user]);

  return (
    <View style={styles.container}>
      <Text>{user ? user.screen_name : ''}</Text>
      <Button
        title="Logout"
        onPress={() =>
          removeData('TWITTER_TOKEN').then(() => {
            setAuth(undefined);
            navigate('Login');
          })
        }
      />
    </View>
  );
}
