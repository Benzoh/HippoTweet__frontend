import React, { useState, useEffect } from 'react';
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
import { retrieveData } from 'app/src/lib/localStorage';

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
  const [status, onChangeText] = React.useState('');
  const [auth, setAuth] = useState();
  const [params, setParams] = useState();
  // const iconName = 'ios-trash';
  const iconName = 'ios-close';

  // console.log({ auth });

  useEffect(() => {
    retrieveData('TWITTER_TOKEN').then(result => {
      console.log({ result });
      setAuth(result);
    });
  }, []);

  if (!auth) {
    return <Text>error!! you do not have authentication.</Text>;
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'position'} style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <TextField
            label="What's going on?"
            value={status}
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
            <Button
              style={styles.button}
              textStyle={styles.buttonText}
              label="Tweet"
              onPress={() => post({ auth, status })}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
