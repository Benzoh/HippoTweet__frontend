/* eslint-disable @typescript-eslint/camelcase */
import Constants from 'expo-constants';
import * as ImageManipulator from 'expo-image-manipulator';
import HmacSHA1 from 'crypto-js/hmac-sha1';
import Base64 from 'crypto-js/enc-base64';

// const uploadURL = 'http://localhost:5001/thetweet-5b342/us-central1/mediaUpload';
const uploadURL = 'https://upload.twitter.com/1.1/media/upload.json';
// const uploadURL = Constants.manifest.extra.uploadUrl;
const API_KEY = Constants.manifest.extra.apiKey;
const API_KEY_SECRET = Constants.manifest.extra.apiKeySecret;

interface Props {
  auth: {
    oauth_token: string;
    oauth_token_secret: string;
  };
  uri: string;
  fileUri: string;
}

export default async function mediaUpload(props: Props) {
  console.log('mediaUpload::', { props });

  const base64res = await ImageManipulator.manipulateAsync(props.fileUri, [], { base64: true });
  // console.log('base64res' + JSON.stringify(base64res));

  const formData = new FormData();

  formData.append('oauth_token', props.auth.oauth_token);
  formData.append('oauth_token_secret', props.auth.oauth_token_secret);
  formData.append('media_data', base64res.base64);
  // formData.append('media', { type: 'image/jpeg', uri: props.fileUri, name: props.fileUri.split('/').pop() });

  const params = {
    oauth_consumer_key: API_KEY,
    oauth_nonce: Math.random().toString(32).substring(2),
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: Math.floor(Date.now() / 1000),
    oauth_token: props.auth.oauth_token,
    oauth_version: '1.0',
  };

  const esc = encodeURIComponent;
  const requestParams = Object.keys(params)
    .map(k => esc(k) + '=' + esc(params[k]))
    .join('&');

  // make signature
  const signatureKey = encodeURI(API_KEY_SECRET) + '&' + encodeURI(props.auth.oauth_token_secret);
  const encodedRequestMethod = encodeURI('POST');
  const encodedRequestUrl = encodeURI(uploadURL);
  const signatureData = encodedRequestMethod + '&' + encodedRequestUrl + '&' + requestParams;
  const hash = HmacSHA1(signatureData, signatureKey);
  const signature = Base64.stringify(hash);

  params.oauth_signature = signature;

  const headerParams = Object.keys(params)
    .sort()
    .map(k => esc(k) + '=' + esc(params[k]))
    .join(', ');
  console.log({ headerParams });

  const bound_text = '------------------------1ae47d990b354d1b00a4eea60e6b5b72';
  const headers = {
    Accept: 'application/json',
    Authorization: 'OAuth ' + headerParams,
    // 'Content-Type': 'multipart/form-data; boundary=' + bound_text,
  };
  console.log({ headers });

  return await fetch(uploadURL, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(formData),
  })
    .then(response => {
      return response.json();
    })
    .then(resJson => {
      console.log({ resJson });
      return resJson;
    })
    .catch(error => {
      console.log(error);
    });
}
