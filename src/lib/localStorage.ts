import { AsyncStorage } from 'react-native';

// TODO: set
export const storeData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log('storeDate', { error });
  }
};

// TODO: get
export const retrieveData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (error) {
    console.log({ error });
  }
};

export const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log('removeDate', { error });
  }
};
