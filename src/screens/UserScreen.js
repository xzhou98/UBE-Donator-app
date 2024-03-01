import React, {useEffect, useState, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {resetPassword} from '../utils/auth';
import {
    // getUserInfoByEmail,
  } from '../utils/database';

const UserDonationsScreen = ({navigation}) => {
  const [render, setRender] = useState(false);
  const [userEmail, setUserEmail] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(async user => {
      if (user) {
        setUserEmail(user.email);
        try {
          let userInfo = await getUserInfoByEmail(user.email);
          console.log(userInfo);
          setUser(userInfo);
        } catch (error) {
          console.log(error);
        }

        setRender(true);
      } else {
        console.log('User is not logged in');
      }
    });
    return subscriber; // Unsubscribe on unmount
  });

  const resetPasswordSubmit = () => {
    if (userEmail != '') {
      resetPassword(userEmail);
      Alert.alert(
        'Password reset email was sent to you. Please check your email box.',
      );
    } else {
      Alert.alert('Please enter your address.');
    }
  };

  const deleteAccount = () => {
    console.log(user);
    // console.log(1);
  };

  return render ? (
    <ScrollView>
      <View style={styles.background}>
        <View
          style={{
            paddingTop: 10,
            width: '90%',
            alignItems: 'center',
          }}>
          {/* Email */}
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.subTitle}>Email{':  '}</Text>

            <Text style={styles.text}> {userEmail} </Text>
          </View>
        </View>

        <View>
          {/* Reset Password */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                Alert.alert(
                  'Reset Password',
                  'Are you sure you want to reset your password?',
                  [
                    {
                      text: 'Confirm',
                      onPress: () => resetPasswordSubmit(),
                    },
                    {text: 'Cancel', style: 'cancel'},
                  ],
                );
              }}>
              <Text style={styles.buttonText}>Reset Password</Text>
            </TouchableOpacity>
          </View>

          {/* Delete account */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttonRed}
              onPress={() => {
                Alert.alert(
                  'Delete Account',
                  'Are you sure you want to delete your account and all of your donation data?',
                  [
                    {
                      text: 'Confirm',
                      onPress: () => deleteAccount(),
                    },
                    {text: 'Cancel', style: 'cancel'},
                  ],
                );
              }}>
              <Text style={styles.buttonText}>Delete Account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  ) : (
    <></>
  );
};

const styles = StyleSheet.create({
  background: {
    // backgroundColor: COLORS.white,
    padding: '3%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  subTitle: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },

  text: {
    color: 'black',
    paddingTop: 2,
    fontSize: 16,
  },

  buttonContainer: {
    margin: 30,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#7db1b7',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  buttonRed: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
  },
});

export default UserDonationsScreen;
