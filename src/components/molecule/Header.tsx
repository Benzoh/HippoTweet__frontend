import React from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';

import { COLOR } from 'app/src/constants/theme';
import Avatar from 'app/src/components/atoms/Avatar';

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: Platform.OS === 'ios' ? 80 : 60,
    backgroundColor: COLOR.MAIN,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },
  text: {
    textAlign: 'center',
    color: COLOR.WHITE,
    paddingLeft: 5,
  },
});

interface Props {
  user: {
    screen_name: string;
    profile_image_url_https: string;
  };
}

export default (props: Props) => {
  const source = props.user.profile_image_url_https
    ? { uri: props.user.profile_image_url_https }
    : React.useMemo(() => require('app/assets/images/dummy-avatar.png'), []);
  const name = props.user.screen_name ? props.user.screen_name : 'unknown';

  return (
    <View style={styles.header}>
      <Avatar size={40} source={source} />
      <Text style={styles.text}>@{name}</Text>
    </View>
  );
};
