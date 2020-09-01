/* eslint-disable @typescript-eslint/camelcase */
import Constants from 'expo-constants';
import * as ImageManipulator from 'expo-image-manipulator';
import HmacSHA1 from 'crypto-js/hmac-sha1';
import Base64 from 'crypto-js/enc-base64';

// const uploadURL = 'http://localhost:5001/thetweet-5b342/us-central1/mediaUpload';
const uploadURL = 'https://upload.twitter.com/1.1/media/upload.json';
// const uploadURL = Constants.manifest.extra.uploadUrl;

interface Props {
  auth: {
    oauth_token: string;
    oauth_token_secret: string;
  };
  uri: string;
  fileUri: string;
}
interface Params {
  oauth_consumer_key: string;
  oauth_nonce: string;
  oauth_signature?: string;
  oauth_signature_method: 'HMAC-SHA1';
  oauth_timestamp: number;
  oauth_token: string;
  oauth_version: '1.0';
  media_data?: string;
}

export default async function mediaUpload(props: Props) {
  const base64res = await ImageManipulator.manipulateAsync(props.fileUri, [], { base64: true });
  // const oauth = {
  //   consumer_key: Constants.manifest.extra.apiKey,
  //   consumer_secret: Constants.manifest.extra.apiKeySecret,
  //   token: props.auth.oauth_token,
  //   token_secret: props.auth.oauth_token_secret,
  // };
  const params: Params = {
    oauth_consumer_key: Constants.manifest.extra.apiKey,
    oauth_nonce: Math.random().toString(32).substring(2),
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: Math.floor(Date.now() / 1000),
    oauth_token: props.auth.oauth_token,
    oauth_version: '1.0',
  };

  const e = encodeURI;
  const esc = encodeURIComponent;
  const requestParams = Object.keys(params)
    .map(k => k + '=' + params[k])
    .join('&');

  // make signature
  const signatureKey = esc(Constants.manifest.extra.apiKeySecret) + '&' + esc(props.auth.oauth_token_secret);
  const encodedRequestMethod = esc('POST');
  const encodedRequestUrl = esc(uploadURL);
  const signatureData = encodedRequestMethod + '&' + encodedRequestUrl + '&' + esc(requestParams);
  console.log({ signatureData });
  const hash = HmacSHA1(signatureData, signatureKey);
  const signature = Base64.stringify(hash);

  params.oauth_signature = esc(signature);
  console.log({ params });

  // make headers
  const headerParams = Object.keys(params)
    .sort()
    .map(k => `${e(k)}="${e(params[k])}"`)
    .join(', ');
  console.log({ headerParams });

  // eslint-disable-next-line no-undef
  const request = new Request(uploadURL, {
    method: 'POST',
    headers: {
      authorization: 'OAuth ' + headerParams,
      'Content-Type': 'multipart/form-data; boundary=--hippohack--',
    },
    body: 'media_data=',
    // body: 'media_data=' + base64res.base64,
  });
  console.log({ request });

  return await fetch(request)
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
