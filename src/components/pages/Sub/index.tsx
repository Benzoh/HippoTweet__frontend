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
  const [user, setUser] = useState();

  useEffect(() => {
    retrieveData('TWITTER_USER_INFO').then(result => {
      console.log('__debug__', { result });
      if (!result) {
        navigate('Login');
      }
      setUser(result);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text>{user ? '@' + user.screen_name : 'unknown'}</Text>
      <Button
        title="Logout"
        onPress={() =>
          removeData('TWITTER_TOKEN').then(() => {
            setUser(undefined);
            navigate('Login');
          })
        }
      />
    </View>
  );
}
