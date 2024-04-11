import React, {useEffect, useState, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Pressable,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {resetPassword} from '../utils/auth';
import {getUserInfoByEmail, deleteUser, updateProlificId} from '../utils/database';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const UserDonationsScreen = ({navigation}) => {
  const [render, setRender] = useState(false);
  const [userEmail, setUserEmail] = useState();
  const [user, setUser] = useState();
  const [proId, setProId] = useState();
  const [proIdWindow, setProIdWindow] = useState(false);

  const fetchData = async () => {
    try {
      const userAuth = auth().currentUser;
      if (userAuth) {
        setUserEmail(userAuth.email);
        const userInfo = await getUserInfoByEmail(userAuth.email);
        //   console.log(userInfo);
        setUser(userInfo);
        setProId(userInfo.prolificId);
        setRender(true);
      } else {
        console.log('User is not logged in');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Async function declared inside the useEffect

    // Call the async function

    // Setup the subscriber for auth state changes
    const subscriber = auth().onAuthStateChanged(user => {
      if (user) {
        setUserEmail(user.email);
        fetchData();
      } else {
        console.log('User is not logged in');
      }
    });
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
    <View style={{height: '100%', width: '100%'}}>
      <ScrollView>
        <View style={styles.background}>
          <View
            style={{
              paddingTop: 10,
              width: '90%',
              alignItems: 'center',
            }}>
            {/* Email */}
            <View style={{flexDirection: 'row', marginVertical: 20}}>
              <Text style={styles.subTitle}>Email{':  '}</Text>

              <Text style={styles.text}> {userEmail} </Text>
            </View>

            {/* Prolific ID */}
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.subTitle}>Prolific ID{':  '}</Text>
              <Text style={styles.text}> {user.prolificId} </Text>
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
            {/* Update Prolific ID */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setProIdWindow(true);
                }}>
                <Text style={styles.buttonText}>Update Prolific ID</Text>
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
                          user &&
                          deleteAccount(userEmail, user.id, user.password),
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

      {proIdWindow ? (
        <View
          style={{
            position: 'absolute',
            top: 0, // Adjust position as needed
            left: 0,
            right: 0,
            bottom: 0,
            // height: 0, // Or adjust the height as needed
            backgroundColor: 'rgba(0, 0, 255, 0.1)',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              position: 'absolute',
              height: '50%',
              width: '80%',
              // height: 0, // Or adjust the height as needed
              backgroundColor: 'white',

              // flexDirection: 'column',
            }}>
            <TouchableOpacity
              style={{flex: 1}}
              onPress={() => {
                setProIdWindow(false);
              }}>
              <MaterialIcons
                style={{color: 'black', flex: 1, marginLeft: 20}}
                name="arrow-back"
                size={35}
              />
            </TouchableOpacity>
            <View style={{flex: 9, alignItems: 'center'}}>
              <Text style={{color: 'black', fontSize: 24, marginVertical: 30}}>
                Prolific ID
              </Text>
              <TextInput
                style={styles.searchBar}
                placeholder="Please input your prolific ID"
                placeholderTextColor="black"
                onChangeText={text => {
                  setProId(text);
                }}
                value={proId}
              />

              <Pressable
                style={({pressed}) => [
                  styles.submitButton,
                  {
                    opacity: pressed ? 0.6 : 1, // Lower the opacity if pressed
                  },
                ]}
                onPress={() => {
                  Alert.alert(
                    'Update Prolific ID',
                    'Are you sure you want to change your Prolific ID?',
                    [
                      {
                        text: 'Confirm',
                        onPress: () => {
                          updateProlificId(user.id, proId)
                          setProIdWindow(false);
                        },
                      },
                      {text: 'Cancel', style: 'cancel'},
                    ],
                  );
                }}>
                <Text style={{color: 'white', fontSize: 18}}>Submit</Text>
              </Pressable>
            </View>
          </View>
        </View>
      ) : (
        <></>
      )}
    </View>
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
    margin: 20,
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

  searchBar: {
    borderWidth: 1.3,
    height: 50,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
  },

  submitButton: {
    marginTop: 40,
    height: 50,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7BB2BA',
    borderRadius: 4,
  },
});

export default UserDonationsScreen;
