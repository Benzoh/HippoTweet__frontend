import * as React from 'react';
import { Image, View, Button, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import * as Picker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { COLOR } from 'app/src/constants/theme';

const styles = StyleSheet.create({
  icon: {
    marginTop: 10,
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 25,
    borderRadius: 10,
  },
});

interface Props {
  callback: () => void;
}

export default class ImagePicker extends React.Component {
  constructor(props: Props) {
    super(props);

    console.log({ props });

    this.state = {
      image: null,
    };
  }

  render() {
    let { image } = this.state;
    const iconName = 'md-images';

    return (
      <View style={{ marginTop: -2 }}>
        {image && <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />}
        <TouchableOpacity onPress={this._pickImage} style={styles.button}>
          <Ionicons name={iconName} size={32} color={COLOR.MAIN} style={styles.icon} />
        </TouchableOpacity>
      </View>
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  _pickImage = async () => {
    try {
      let result = await Picker.launchImageLibraryAsync({
        mediaTypes: Picker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });

      if (!result.cancelled) {
        this.setState({ image: result.uri });
        this.props.callback(true);
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };
}
