import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text } from 'react-native';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';

import fonts from 'app/src/fonts';
import images from 'app/src/images';
import useCachedResources from 'app/src/hooks/useCachedResources';
import useColorScheme from 'app/src/hooks/useColorScheme';
import Navigation from 'app/src/navigation';
import MainTabNavigator from 'app/src/navigation/MainTabNavigator';

import InitialScreen from 'app/src/screens/InitialScreen';
import * as UserContext from 'app/src/contexts/user';

interface Props {
  skipLoadingScreen: boolean;
}

export default function App(props: Props) {
  const [isReady, setIsReady] = React.useState(false);
  const isLoadingComplete = useCachedResources();
  const { skipLoadingScreen } = props;
  const colorScheme = useColorScheme();

  async function loadResourcesAsync() {
    // await Asset.loadAsync(Object.keys(images).map(key => images[key]));
    await Font.loadAsync(fonts);
  }

  if (!UserContext.Context) {
    return <InitialScreen />;
  }

  if (!isReady) {
    // if (!isLoadingComplete && !skipLoadingScreen) {
    return <AppLoading startAsync={loadResourcesAsync} onFinish={() => setIsReady(true)} onError={console.warn} />;
  } else {
    return <MainTabNavigator />;
  }
}

App.defaultProps = {
  skipLoadingScreen: false,
};
