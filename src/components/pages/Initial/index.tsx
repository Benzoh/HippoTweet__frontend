import React from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { retrieveData } from 'app/src/lib/localStorage';
import { COLOR } from 'app/src/constants/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.GREEN,
  },
  appImage: {
    width: 100,
    height: 100,
    borderColor: COLOR.GREEN,
    borderWidth: 1,
  },
  appName: {
    fontWeight: 'bold',
    fontSize: 24,
    color: COLOR.WHITE,
  },
  startButton: {
    backgroundColor: COLOR.GREEN,
    borderColor: COLOR.WHITE,
    borderRadius: 5,
    borderWidth: 1,
    padding: 10,
    paddingHorizontal: 20,
  },
  startButtonText: {
    color: COLOR.WHITE,
  },
});

export default function Initial() {
  const { navigate } = useNavigation();

  retrieveData('TWITTER_USER_INFO').then(result => {
    if (result) {
      navigate('Main');
    }
  });

  // TODO: ファーストビュー画面
  return (
    <View style={styles.container}>
      <Text style={styles.appName}>HippoTweet!</Text>
      <Image style={styles.appImage} source={require('app/assets/images/app-icon.png')} />
      <TouchableOpacity
        onPress={() => {
          navigate('Login');
        }}
        style={styles.startButton}
      >
        <Text style={styles.startButtonText}>Start tweet</Text>
      </TouchableOpacity>
    </View>
  );
}
