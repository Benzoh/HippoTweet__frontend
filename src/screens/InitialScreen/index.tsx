import * as React from 'react';
import { View, StyleSheet, TouchableNativeFeedback } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TextField, dismiss } from 'app/src/components/atoms/TextField';
import Button from 'app/src/components/atoms/Button';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  text: {
    marginVertical: 20,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#6cf',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
});

function useControlledComponent(initialValue: string) {
  const [value, setValue] = React.useState(initialValue);

  function handleChange(newValue: string) {
    setValue(newValue);
  }

  return {
    value,
    onChangeText: handleChange,
  };
}

export default function InitialScreen() {
  const mailAddress = useControlledComponent('');
  const password = useControlledComponent('');

  return (
    <TouchableNativeFeedback onPress={dismiss}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <TextField
            label="email"
            value={mailAddress.value}
            onChangeText={mailAddress.onChangeText}
            style={styles.text}
            autoCompleteType="email"
          />
          <TextField
            label="password"
            value={password.value}
            onChangeText={password.onChangeText}
            style={styles.text}
            autoCompleteType="password"
            secureTextEntry={true}
          />
          <View style={styles.buttonContainer}>
            <Button
              onPress={() => {
                console.log({ message: 'TODO: login' });
              }}
              style={styles.button}
              label="SignIn"
            />
          </View>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
}
