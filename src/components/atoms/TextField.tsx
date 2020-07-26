import React from 'react';
import { ViewStyle, Keyboard } from 'react-native';
import { TextInput } from 'react-native';
import { COLOR } from 'app/src/constants/theme';

interface Props {
  label: string;
  value: string | undefined;
  onChangeText?: (str: string) => void;
  style?: ViewStyle;
  disabled?: boolean;
  testID?: string;
}

export function TextField(props: Props) {
  const { label, value, onChangeText = () => { }, style, disabled, testID } = props;

  return (
    <TextInput
      multiline={true}
      numberOfLines={4}
      label={label}
      value={value}
      disabled={disabled}
      onChangeText={onChangeText}
      style={style}
      testID={testID}
    />
  );
}

export function dismiss() {
  Keyboard.dismiss();
}
