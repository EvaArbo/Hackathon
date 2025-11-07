import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

export const requestCameraPermission = async () => {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('Permission needed', 'Camera permission is required to take photos');
    return false;
  }
  return true;
};

export const takePhoto = async () => {
  try {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) return null;

    const result = await ImagePicker.launchCameraAsync({
      quality: 0.8,
    });

    if (!result.canceled) {
      return result.assets?.[0] || result;
    }
    return null;
  } catch (error) {
    console.error('Camera error:', error);
    Alert.alert('Error', `Camera failed: ${error.message}`);
    return null;
  }
};