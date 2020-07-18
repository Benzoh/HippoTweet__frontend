import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text } from 'react-native';
import { AppLoading, Asset, Font } from 'expo';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import fonts from 'app/src/fonts';
import images from 'app/src/images';
import useCachedResources from 'app/src/hooks/useCachedResources';
import useColorScheme from 'app/src/hooks/useColorScheme';
import Navigation from 'app/src/navigation';

interface Props {
  skipLoadingScreen: Boolean;
}

export default function App(props: Props) {
  const isLoadingComplete = useCachedResources();
  console.log({ isLoadingComplete });
  const { skipLoadingScreen } = props;
  const colorScheme = useColorScheme();

  async function loadResourcesAsync() {
    await Asset.loadAsync(Object.keys(images).map(key => images[key]));
    await Font.loadAsync(fonts);
  }

  if (!isLoadingComplete && !skipLoadingScreen) {
    return (
      <AppLoading startAsync={loadResourcesAsync} onError={error => console.warn(error)} />
    )
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}

App.defaultProps = {
  skipLoadingScreen: false,
}