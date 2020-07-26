import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { COLOR } from 'app/src/constants/theme';
import Avatar from 'app/src/components/atoms/Avatar';

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 60,
    backgroundColor: COLOR.MAIN,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
  },
  text: {
    textAlign: 'center',
    color: COLOR.WHITE,
    paddingLeft: 5,
  },
});

export default () => {
  // TODO: to twitter avatar
  const source = React.useMemo(() => require('app/assets/images/dummy-avatar.png'), []);

  return (
    <View style={styles.header}>
      <Avatar size={40} source={source} />
      <Text style={styles.text}>@hippohack</Text>
    </View>
  );
};
