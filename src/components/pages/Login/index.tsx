/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable no-catch-shadow */
/* eslint-disable react-native/no-color-literals */
import React, { useState, useCallback } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, Button, AsyncStorage } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import { CONFIG } from 'app/src/constants/config';
import * as AuthSession from 'expo-auth-session';
import Constants from 'expo-constants';

import { storeData } from 'app/src/lib/localStorage';

const accessTokenURL = Constants.manifest.extra.accessTokenUrl;
const requestTokenURL = Constants.manifest.extra.requestTokenUrl;
const getUserObjectURL = Constants.manifest.extra.getUserObjectUrl;
// const accessTokenURL = "http://localhost:3000/access-token";
// const requestTokenURL = "http://localhost:3000/request-token";

// FIXME: ローカルIPじゃだめでしょ？？
// const redirect = AuthSession.makeRedirectUri();
const redirect = AuthSession.getRedirectUrl('redirect');

// This is the callback or redirect URL you need to whitelist in your Twitter app
// console.log(`Callback URL: ${redirect}`);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loading: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
  },
});

/**
 * Converts an object to a query string.
 */
function toQueryString(params) {
  return (
    '?' +
    Object.entries(params)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&')
  );
}

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const { navigate } = useNavigation();

  const onLogin = useCallback(async () => {
    setLoading(true);

    try {
      // Step #1 - first we need to fetch a request token to start the browser-based authentication flow
      const requestParams = toQueryString({ callback_url: redirect });
      const requestTokens = await fetch(requestTokenURL + requestParams).then(res => res.json());

      console.log('Request tokens fetched!', requestTokens);

      // Step #2 - after we received the request tokens, we can start the auth session flow using these tokens
      const authResponse = await AuthSession.startAsync({
        authUrl: 'https://api.twitter.com/oauth/authenticate' + toQueryString(requestTokens),
      });

      console.log('Auth response received!', authResponse);

      // Validate if the auth session response is successful
      // Note, we still receive a `authResponse.type = 'success'`, thats why we need to check on the params itself
      if (authResponse.params && authResponse.params.denied) {
        return setError('AuthSession failed, user did not authorize the app');
      }

      // Step #3 - when the user (successfully) authorized the app, we will receive a verification code.
      // With this code we can request an access token and finish the auth flow.
      const accessParams = toQueryString({
        oauth_token: requestTokens.oauth_token,
        oauth_token_secret: requestTokens.oauth_token_secret,
        oauth_verifier: authResponse.params.oauth_verifier,
      });
      const accessTokens = await fetch(accessTokenURL + accessParams).then(res => res.json());
      console.log('Access tokens fetched!', accessTokens);

      storeData('TWITTER_TOKEN', accessTokens);

      const accessParams2 = toQueryString({
        access_token: accessTokens.oauth_token,
        access_token_secret: accessTokens.oauth_token_secret,
        screen_name: accessTokens.screen_name,
      });
      const userObject = await fetch(getUserObjectURL + accessParams2).then(res => res.json());
      console.log('User info fetched!', userObject);

      storeData('TWITTER_USER_INFO', userObject);

      // navigate to home
      navigate('Main');
    } catch (error) {
      console.log('Something went wrong...', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Button title="Login with Twitter" onPress={onLogin} />
      </View>

      {error !== undefined && <Text style={styles.error}>Error: {error}</Text>}

      {loading && (
        <View style={[StyleSheet.absoluteFill, styles.loading]}>
          <ActivityIndicator color="#fff" size="large" animating />
        </View>
      )}
    </View>
  );
}
