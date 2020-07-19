import React from 'react';
import { View } from 'react-native';
import { BottomTabBar } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';

import styles from './styles';

export const HomeTabIcon = ({ tintColor }) =>
  <Ionicons name="md-home" size={26} style={styles.icon} color={tintColor} />;

export const MeTabIcon = ({ tintColor }) =>
  <Ionicons name="md-person" size={26} style={styles.icon} color={tintColor} />;

export const TabBar = BottomTabBar;
