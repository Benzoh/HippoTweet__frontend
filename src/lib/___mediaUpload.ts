/* eslint-disable @typescript-eslint/camelcase */
import Constants from 'expo-constants';
import * as ImageManipulator from 'expo-image-manipulator';
import HmacSHA1 from 'crypto-js/hmac-sha1';
import Base64 from 'crypto-js/enc-base64';
import * as FileSystem from 'expo-file-system';
import * as mime from 'react-native-mime-types';

const uploadURL = 'https://upload.twitter.com/1.1/media/upload.json';

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

// TODO: やっぱAuthenticationがいるよね？？
export default async function mediaUpload(props: Props) {
  const base64res = await ImageManipulator.manipulateAsync(props.fileUri, [], { base64: true });
  const fs = await FileSystem.getInfoAsync(props.fileUri, { size: true });
  const totalBytes = fs.size;
  const mimetype = mime.lookup(props.fileUri);

  return await fetch(`${uploadURL}?command=INIT&total_bytes=${totalBytes}&media_type=${mimetype}`)
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
