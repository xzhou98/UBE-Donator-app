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
import {getUserInfoByEmail, deleteUser} from '../utils/database';

const UserDonationsScreen = ({navigation}) => {
  const [render, setRender] = useState(false);
  const [userEmail, setUserEmail] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    // Async function declared inside the useEffect
    const fetchData = async () => {
      try {
        const userAuth = auth().currentUser;
        if (userAuth) {
          setUserEmail(userAuth.email);
          const userInfo = await getUserInfoByEmail(userAuth.email);
        //   console.log(userInfo);
          setUser(userInfo);
        } else {
          console.log('User is not logged in');
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    // Call the async function
    fetchData();
  
    // Setup the subscriber for auth state changes
    const subscriber = auth().onAuthStateChanged(user => {
      if (user) {
        setUserEmail(user.email);
      } else {
        console.log('User is not logged in');
      }
    });
    setRender(true)
    // Cleanup function
    return () => {
      // Assuming subscriber() correctly removes the event listener
      // If `subscriber` itself is the cleanup function, just call it
      subscriber();
    };
  }, []);

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

  const deleteAccount = async (email, userId, password) => {
    try {
      await deleteUser(email, userId, password);
    } catch (error) {
      console.log(error);
    }
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
                      onPress: () =>
                        user && deleteAccount(userEmail, user.id, user.password),
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
