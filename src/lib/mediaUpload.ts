/* eslint-disable @typescript-eslint/camelcase */
import Constants from 'expo-constants';
import * as Random from 'expo-random';
import * as ImageManipulator from 'expo-image-manipulator';
import HmacSHA1 from 'crypto-js/hmac-sha1';
import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';
import { delete } from 'request';

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
  media?: FormData;
  media_data?: string | FormData;
}

export default async function mediaUpload(props: Props) {
  const e = encodeURI;
  const esc = encodeURIComponent;

  // const base64res = await ImageManipulator.manipulateAsync(props.fileUri, [], { base64: true });
  const formData = new FormData();
  formData.append('media', {
    uri: props.fileUri,
    name: 'uploadImage.jpg',
    type: 'image/jpg'
  });
  // console.log({ data });
  const nonce = sha256(Math.random().toString(36).substring(2));
  const params: Params = {
    oauth_consumer_key: Constants.manifest.extra.apiKey,
    oauth_nonce: Base64.stringify(nonce),
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: Math.floor(Date.now() / 1000),
    oauth_token: props.auth.oauth_token,
    oauth_version: '1.0',
    media: formData,
    // media_data: base64res.base64,
  };

  const requestParams = Object.keys(params)
    .sort()
    .map(k => esc(k) + '=' + esc(params[k]))
    .join('&');

  /**
   * make signature
   **/
  const signatureKey = esc(Constants.manifest.extra.apiSecretKey) + '&' + esc(props.auth.oauth_token_secret);
  const encodedRequestMethod = esc('POST');
  const encodedRequestUrl = esc(uploadURL);
  const signatureData = encodedRequestMethod + '&' + encodedRequestUrl + '&' + esc(requestParams);

  // MEMO: ここあやしい。
  const hash = HmacSHA1(signatureData, signatureKey);
  // console.log({ hash });
  const signature = Base64.stringify(hash);
  // console.log({ signature });

  /**
   *  make headers
   **/
  params.oauth_signature = signature;
  delete params.media;
  // console.log({ params });
  // return;

  const headerParams = Object.keys(params)
    .sort()
    .map(k => `${esc(k)}="${esc(params[k])}"`)
    .join(', ');

  // eslint-disable-next-line no-undef
  const request = new Request(uploadURL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data;',
      authorization: 'OAuth ' + headerParams,
    },
    body: formData,
  });
  // console.log({ request });
  // return;

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
