import Constants from 'expo-constants';

const uploadURL = 'http://localhost:5001/thetweet-5b342/us-central1/mediaUpload';
// const uploadURL = Constants.manifest.extra.uploadUrl;

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

  const fileObject = await fetch(props.fileUri).then(res => res.blob());
  // console.log({ fileObject });

  const formData = new FormData();

  formData.append('access_token_key', props.auth.oauth_token);
  formData.append('access_token_secret', props.auth.oauth_token_secret);
  formData.append('media', fileObject);

  return await fetch(uploadURL, {
    method: 'POST',
    body: formData,
  }).then(response => response.json());
}
