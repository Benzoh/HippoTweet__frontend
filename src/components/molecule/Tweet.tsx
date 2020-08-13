import React, { useState, useEffect, useRef } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Animated,
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
  // eslint-disable-next-line react-native/no-color-literals
  alert: {
    borderWidth: 1,
    borderColor: '#b8daff',
    borderRadius: 3,
    padding: 5,
    marginTop: 15,
    textAlign: 'center',
    fontSize: 16,
    color: '#004085',
    backgroundColor: '#cce5ff',
  },
});

export default () => {
  const [status, onChangeText] = React.useState('');
  const [auth, setAuth] = useState();
  const [alert, setAlert] = useState();
  // const iconName = 'ios-trash';
  const iconName = 'ios-close';
  const fadeAnim = useRef(new Animated.Value(5)).current;
  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    retrieveData('TWITTER_TOKEN').then(result => {
      console.log({ result });
      setAuth(result);
    });
  }, []);

  if (alert) {
    setTimeout(() => {
      fadeOut();
      // setAlert(null);
    }, 2000);
  }

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
              onPress={() =>
                post({ auth, status }).then(res => {
                  console.log({ res });
                  setAlert('Tweeted.');
                  onChangeText('');
                })
              }
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
      <Animated.View style={{ opacity: fadeAnim }}>
        {alert && <Text style={styles.alert}>{alert}</Text>}
      </Animated.View>
    </KeyboardAvoidingView>
  );
};
