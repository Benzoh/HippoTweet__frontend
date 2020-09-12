import Constants from 'expo-constants';

const verifyCredentialsURL = Constants.manifest.extra.verifyCredentialsUrl;
// const verifyCredentialsURL = 'http://localhost:5001/thetweet-5b342/us-central1/verifyCredentials';

interface Props {
  auth: {
    access_token: string;
    access_token_secret: string;
  };
}

/**
 * Converts an object to a query string.
 */
function toQueryString(params) {
  return '?oauth_token=' + params.auth.oauth_token + '&oauth_token_secret=' + params.auth.oauth_token_secret;
}

export default async function verifyCredentials(props: Props) {
  // console.log({ props });
  // console.log('url', verifyCredentialsURL + toQueryString(props));
  return await fetch(verifyCredentialsURL + toQueryString(props)).then(response => response.json());
}
