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
    retrieveData('TWITTER_TOKEN').then(result => {
      setAuth(result);
    });
  }

  // FIXME: これなんか微妙。
  useEffect(() => {
    console.log('useEffect', { auth });
  }, [auth]);

  //  authorization: OAuth oauth_consumer_key="CONSUMER_API_KEY",
  //  oauth_nonce="OAUTH_NONCE",
  //  oauth_signature="OAUTH_SIGNATURE",
  //  oauth_signature_method="HMAC-SHA1",
  //  oauth_timestamp="OAUTH_TIMESTAMP",
  //  oauth_token="ACCESS_TOKEN",
  //  oauth_version="1.0"

  // // TODO: ここからバックエンドに置かなあかんかも？
  // fetch('https://api.twitter.com/1.1/users/show.json?screen_name=hippohack', {
  //   headers: {
  //     // Authorization: `Bearer ${auth.oauth_token}`,
  //     oauth_consumer_key: "CONSUMER_API_KEY",
  //     oauth_nonce: (() => {
  //       const date = new Date();
  //       return date.getTime();
  //     })(),
  //     oauth_signature: "OAUTH_SIGNATURE",
  //     oauth_signature_method: "HMAC-SHA1",
  //     oauth_timestamp: (() => {
  //       const date = new Date();
  //       return Math.floor(date.getTime() / 1000);
  //     })(),
  //     oauth_token: auth.oauth_token,
  //     oauth_version: "1.0"
  //   },
  // })
  //   .then((response) => response.json())
  //   .then((responseJson) => {
  //     console.log({ responseJson });
  //   });

  return (
    <View style={styles.container}>
      <Text>{auth ? auth.screen_name : ''}</Text>
      <Button
        title="Logout"
        onPress={() =>
          removeData('TWITTER_TOKEN').then(() => {
            setAuth(null);
            navigate('Login');
          })
        }
      />
    </View>
  );
}
