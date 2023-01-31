import auth from '@react-native-firebase/auth';
import { ToastAndroid, Alert } from 'react-native';

export const signIn = (email, password) => {
  // Alert.alert(password);
  auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      ToastAndroid.show('Logged in', ToastAndroid.SHORT);
    })
    .catch(err => {
      if (err.code === 'auth/invalid-email') {
        Alert.alert('That email address is invalid!');
      }
      if (err.code === 'auth/user-not-found') {
        Alert.alert('User not found!');
      }
      if (err.code === 'auth/wrong-password') {
        Alert.alert('That password is not correct!');
      }
    });
};

export const signUp = (email, password) => {
  auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      // ToastAndroid.show('Signed up', ToastAndroid.SHORT);
    })
    .catch(err => {
      if (err.code === 'auth/email-already-in-use') {
        Alert.alert('That email address is already in use!');
      }
      if (err.code === 'auth/invalid-email') {
        Alert.alert('That email address is invalid!');
      }
    });
};

export const signOut = () => {
  auth()
    .signOut()
    .then(() => {
      ToastAndroid.show('Signed Out', ToastAndroid.SHORT);
    });
};
