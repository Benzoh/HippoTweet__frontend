import * as React from 'react';
import { Image, View, Button, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import * as Picker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { COLOR } from 'app/src/constants/theme';
import upload from 'app/src/lib/mediaUpload';

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
  pickButton: {
    width: 40,
    height: 40,
  },
  removeIcon: {
    //
  },
  removeIconButton: {
    width: 40,
    height: 40,
    top: -40,
    position: 'absolute',
  },
  removeIconWrap: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    position: 'relative',
  },
});

interface Props {
  action: () => void;
}

export default class ImagePicker extends React.Component {
  constructor(props: Props) {
    super(props);

    console.log({ props });

    this.state = {
      image: null,
    };
  }

  hasImage(image: string) {
    return (
      <View style={{ marginTop: -2 }}>
        <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
        <View style={styles.removeIconWrap}>
          <TouchableOpacity onPress={this._removeImage} style={styles.removeIconButton}>
            <Ionicons name={'md-remove-circle-outline'} size={32} color={COLOR.WHITE} style={styles.removeIcon} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={this._pickImage} style={styles.pickButton}>
          <Ionicons name={'md-images'} size={32} color={COLOR.MAIN} style={styles.icon} />
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    let { image } = this.state;

    if (image) {
      return this.hasImage(image);
    }

    return (
      <View style={{ marginTop: -2 }}>
        <TouchableOpacity onPress={this._pickImage} style={styles.pickButton}>
          <Ionicons name={'md-images'} size={32} color={COLOR.MAIN} style={styles.icon} />
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
      console.log(result);

      if (!result.cancelled) {
        this.setState({ image: result.uri });
        upload({ auth: this.props.auth, fileUri: result.uri });
        this.props.action();
      }
    } catch (E) {
      console.log(E);
    }
  };

  _removeImage = () => {
    this.setState({ image: null });
  };
}
