import 'dotenv/config';

export default {
  name: 'HippoTweet!',
  slug: 'hippotweet',
  version: '1.1.0',
  orientation: 'portrait',
  icon: './assets/images/app-icon.png',
  scheme: 'hippotweet',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './assets/images/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'me.hippohack.hippotweet',
    buildNumber: '1.1.0',
    config: {
      googleMobileAdsAppId: 'ca-app-pub-7815961604338808~7422370508',
    },
  },
  android: {
    package: 'me.hippohack.hippotweet',
    versionCode: 2,
    config: {
      googleMobileAdsAppId: 'ca-app-pub-7815961604338808~9030965647',
    },
  },
  web: {
    favicon: './assets/images/favicon.png',
  },
  extra: {
    accessTokenUrl: process.env.EXPO_ACCESS_TOKEN_URL,
    requestTokenUrl: process.env.EXPO_REQUEST_TOKEN_URL,
    getUserObjectUrl: process.env.EXPO_GET_USER_OBJECT_URL,
    tweetUrl: process.env.EXPO_TWEET_URL,
    verifyCredentialsUrl: process.env.EXPO_VERIFY_CREDENTIALS_URL,
    backgroundColor: '#fafafa',
  },
};
