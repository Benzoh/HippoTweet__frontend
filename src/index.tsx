import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, StyleSheet, StatusBar, TouchableOpacity, ActivityIndicator, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { COLOR } from 'app/src/constants/theme';
import Routes from 'app/src/routes';

export default function App() {
  const [currentPage, setCurrentPage] = useState('Main');
  console.log({ currentPage });

  return (
    <NavigationContainer
      onStateChange={newState => {
        setCurrentPage(newState.routeNames[newState.index]);
      }}
    >
      <StatusBar backgroundColor={COLOR.MAIN} barStyle="light-content" />
      <Routes currentPage={currentPage} />
    </NavigationContainer>
  );
}
