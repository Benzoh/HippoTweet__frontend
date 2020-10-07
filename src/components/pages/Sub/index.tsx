import React, { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, AsyncStorage, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { retrieveData, removeData } from 'app/src/lib/localStorage';
import { COLOR } from 'app/src/constants/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenName: {
    marginTop: 5,
    fontSize: 20,
  },
  button: {
    marginTop: 20,
    width: 120,
    height: 45,
    borderRadius: 5,
    backgroundColor: COLOR.MAIN,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLabel: {
    color: COLOR.WHITE,
    fontSize: 16,
  },
});

export default function Sub() {
  const { navigate } = useNavigation();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    retrieveData('TWITTER_USER_INFO')
      .then(result => {
        if (!result) {
          navigate('Login');
        }
        return result;
      })
      .then(result => {
        setUser(result);
      })
      .then(() => {
        setLoading(false);
        // console.log({ loading });
      });
  }, []);

  function largeProfileImage(string: string) {
    return string.replace('_normal', '');
  }

  if (!user || loading) {
    return (
      <View style={styles.loading}>
        <Text> Loading... </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image style={styles.profileImage} source={{ uri: largeProfileImage(user.profile_image_url_https) }} />
      <Text style={styles.screenName}>{user ? '@' + user.screen_name : 'unknown'}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          removeData('TWITTER_TOKEN').then(() => {
            // setUser(undefined);
            // navigate('Login');
            removeData('TWITTER_USER_INFO')
              .then(() => {
                setUser(undefined);
              })
              .then(() => {
                // navigate('Login');
                navigate('Initial');
              });
          })
        }
      >
        <Text style={styles.buttonLabel}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
