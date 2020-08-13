import Constants from 'expo-constants';

const tweetURL = Constants.manifest.extra.tweetUrl;
// const tweetURL = 'http://localhost:5001/thetweet-5b342/us-central1/tweetPost';

interface Props {
  auth: {
    access_token: string;
    access_token_secret: string;
  };
  status: string;
}

/**
 * Converts an object to a query string.
 */
function toQueryString(params) {
  return (
    '?oauth_token=' + params.auth.oauth_token +
    '&oauth_token_secret=' + params.auth.oauth_token_secret +
    '&status=' + params.status
  );
}

export default async function post(props: Props) {
  // console.log({ props });
  // console.log('url', tweetURL + toQueryString(props));

  return await fetch(tweetURL + toQueryString(props)).then(response => response.json());
}
