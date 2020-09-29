import React, { useState, useEffect } from 'react';
import { Text as TextField, View, StyleSheet, ScrollView, Keyboard, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native-paper/lib/typescript/src/components/Avatar/Avatar';

import Header from 'app/src/components/molecule/Header';
import Tweet from 'app/src/components/molecule/Tweet';
import BannerAd from 'app/src/components/atoms/BannerAd';
import { retrieveData } from 'app/src/lib/localStorage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function Main() {
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
        // console.log('__result__', { result });
        setUser(result);
      })
      .then(() => {
        setLoading(false);
        // console.log('hoge!!!');
        // console.log({ loading });
      });
  }, []);

  // FIXME: ここが問題ぽい。
  if (!user || loading) {
    return (
      <View style={styles.loading}>
        <TextField> Loading... </TextField>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header user={user} />
      <ScrollView>
        <Tweet />
        <BannerAd />
      </ScrollView>
    </View>
  );
}
