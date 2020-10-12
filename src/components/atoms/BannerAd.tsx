import React from 'react';
import { Platform, View } from 'react-native';
import { AdMobBanner } from 'expo-ads-admob';
import Constants from 'expo-constants';

const styles = {
  container: {
    flex: 1,
    marginTop: '75%',
  },
};

export default function BannerAd() {
  function bannerError() {
    console.log('Ad Fail error!!');
  }

  return (
    <View style={styles.container}>
      <AdMobBanner
        adUnitID={
          __DEV__
            ? 'ca-app-pub-3940256099942544/6300978111' // テスト広告
            : Platform.select({
              ios: 'ca-app-pub-7815961604338808/9433633783',
              android: 'ca-app-pub-7815961604338808/9884882312',
            })
        }
        onDidFailToReceiveAdWithError={bannerError}
      />
    </View>
  );
}
