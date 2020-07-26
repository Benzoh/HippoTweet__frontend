import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { TextField } from 'app/src/components/atoms/TextField';
import Button from 'app/src/components/atoms/Button';
import { COLOR } from 'app/src/constants/theme';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  textField: {
    height: 160,
    textAlignVertical: 'top',
    borderColor: COLOR.MAIN,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  buttonWrap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  button: {
    height: 40,
    width: 100,
  },
  bottonText: {
    fontSize: 18,
  },
});

export default () => {
  const [tweet, setTweet] = useState();
  // const iconName = 'ios-trash';
  const iconName = 'ios-close';

  return (
    <View style={styles.container}>
      <TextField
        label="What's going on?"
        value={tweet}
        style={styles.textField}
        onChangeText={tweet => setTweet({ tweet })}
      />
      <View>
        {/* TODO: Count */}
        <Text style={{ textAlign: 'right' }}>0/140</Text>
      </View>
      <View style={styles.buttonWrap}>
        <View style={{ paddingLeft: 5 }}>
          <Ionicons name={iconName} size={36} color={COLOR.MAIN} />
        </View>
        <Button
          style={styles.button}
          textStyle={styles.bottonText}
          label="Tweet"
          onPress={() => console.log('TODO: Post')}
        />
      </View>
    </View>
  );
};
