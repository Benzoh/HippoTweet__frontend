import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  icon: {
    marginBottom: -3,
  },
  takeTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  takeTabIcon: {
    marginLeft: Platform.OS === 'ios' ? 1 : 0,
    marginTop: Platform.OS === 'ios' ? 1 : 0,
  }
})

export default styles;