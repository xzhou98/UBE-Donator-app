import auth from '@react-native-firebase/auth';
import {ToastAndroid, Alert} from 'react-native';

export const signIn = (email, password) => {
    // Alert.alert(password);
  auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      ToastAndroid.show('Logged in', ToastAndroid.SHORT);
    })
    .catch(err => {
        Alert.alert(err);
    });
};

export const signUp = (email, password) => {
  auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      // ToastAndroid.show('Signed up', ToastAndroid.SHORT);
    })
    .catch(err => {
        Alert.alert(err);
    });
};

export const signOut = () => {
  auth()
    .signOut()
    .then(() => {
      ToastAndroid.show('Signed Out', ToastAndroid.SHORT);
    });
};
