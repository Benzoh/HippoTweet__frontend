import 'dotenv/config';

export default {
  name: 'HippoTweet!',
  slug: 'hippotweet',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/hippo.png',
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
    buildNumber: '1.0.0',
  },
  android: {
    package: 'me.hippohack.hippotweet',
    versionCode: 1,
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
