import auth from '@react-native-firebase/auth';
import { ToastAndroid, Alert } from 'react-native';
// import { sendPasswordResetEmail } from "@react-native-firebase/auth";

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

export const resetPassword = (email) => {
  auth().sendPasswordResetEmail(email).then(() => {
  })
  .catch(err => {
    Alert.alert(err.code)
  })
}

export const signUp = (email, password) => {
  let success = false
  auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      // ToastAndroid.show('Signed up', ToastAndroid.SHORT);
      success =  true
    })
    .catch(err => {
      if (err.code === 'auth/email-already-in-use') {
        Alert.alert('That email address is already in use!');
      }
      if (err.code === 'auth/invalid-email') {
        Alert.alert('That email address is invalid!');
      }
      success = false
    });

    return success
};

export const signOut = () => {
  auth()
    .signOut()
    .then(() => {
      ToastAndroid.show('Signed Out', ToastAndroid.SHORT);
    });
};
