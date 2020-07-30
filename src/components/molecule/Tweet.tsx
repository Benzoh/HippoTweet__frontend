import React, { useState } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { TextField } from 'app/src/components/atoms/TextField';
import Button from 'app/src/components/atoms/Button';
import { COLOR } from 'app/src/constants/theme';
import post from 'app/src/lib/post';

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
    fontSize: 18,
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
  buttonText: {
    fontSize: 18,
    fontWeight: 'normal',
  },
});

export default () => {
  const [value, onChangeText] = React.useState('');
  // const iconName = 'ios-trash';
  const iconName = 'ios-close';

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'position'} style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <TextField
            label="What's going on?"
            value={value}
            style={styles.textField}
            onChangeText={text => onChangeText(text)}
          />
          <View>
            {/* TODO: Count */}
            <Text style={{ textAlign: 'right', marginTop: Platform.OS === 'ios' ? 5 : 0 }}>0/140</Text>
          </View>
          <View style={styles.buttonWrap}>
            <View style={{ paddingLeft: 5 }}>
              <Ionicons name={iconName} size={36} color={COLOR.MAIN} onPress={() => onChangeText('')} />
            </View>
            <Button style={styles.button} textStyle={styles.buttonText} label="Tweet" onPress={() => post(value)} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
