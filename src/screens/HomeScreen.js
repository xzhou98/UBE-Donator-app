import React, {useEffect, useState, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {
  getUserInfoByEmail,
  getAllQuestions,
  getAllSessions,
  getAllSessionsByUserId,
} from '../utils/database';
// import { EditScreen } from '../screens';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {createStackNavigator} from '@react-navigation/stack';
import {ReviewScreen, EditScreen, DonationScreen} from '../screens';
import {ScrollView} from 'react-native-gesture-handler';
import {WebView} from 'react-native-webview';

// import { showNotification, handle5SecNotification, handleCancel, handleScheduleNotification } from '../views/notification.android'
// import DatePicker from 'react-native-date-picker';
// import moment from 'moment';
// import Dialog from "react-native-dialog";

const HomeScreen = ({navigation}) => {
  const source = Platform.select({
    ios: require('./example.html'),
    android: { uri: 'file:///android_asset/message.html' },
  });
  const [user, setUser] = useState();
  // const [questions, setQuestions] = useState();
  const [render, setRender] = useState(false);
  const [webViewDisplay, setWebViewDisplay] = useState(false);
  // const [sessions, setSessions] = useState(false);
  // const [controler, setControler] = useState(true);
  // const [sessionId, setSessionId] = useState();
  // const [answerId, setAnswersId] = useState();
  // const [allAnswers, setAllAnswers] = useState();

  const Stack = createStackNavigator();

  const onAuthStateChanged = async user => {
    try {
      let userInfo = await getUserInfoByEmail(user.email);
      setUser(userInfo);
      // let allSessions = await getAllSessions(userInfo.id)
      // setSessions(allSessions);
      // let allAnswers = await getAllSessionsByUserId(userInfo.id)
      // setAllAnswers(allAnswers)

      setRender(true);
    } catch (error) {
      Alert.alert(error);
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return render ? (
    // <Stack.Navigator
    //   screenOptions={{
    //     headerShown: false,
    //   }}>
    //   <Stack.Screen name="ReviewScreen" component={ReviewScreen} />
    //   <Stack.Screen name="EditScreen" component={EditScreen} />
    // </Stack.Navigator>

    <View style={{position: 'relative', flex: 1}}>
      {/* Bottom layer */}
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}>
        <View style={{flex: 1, flexDirection: 'column'}}>
          <View style={{flex: 10}}>
            <ScrollView>
              <View style={styles.container}>
                <Text style={styles.mainTitle}>Welcome to UBE</Text>
                <Text style={styles.secondTitle}>
                  For questions regarding how to use UBE, head to TECHNICAL
                  SUPPORT section
                </Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      navigation.navigate('Technical Support');
                    }}>
                    <Text style={styles.buttonText}>TECHNICAL SUPPORT</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.secondTitle}>
                  If you need to contact someone with questions about the study
                  or seek support services, head to HELP page
                </Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      navigation.navigate('Help');
                    }}>
                    <Text style={styles.buttonText}>HELP</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.secondTitle}>
                  Please start the session, when you feel comfortable.
                </Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      navigation.navigate('Donation');
                    }}>
                    <Text style={styles.buttonText}>START DONATING</Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.secondTitle}>
                  If you want to review your donation data, please navigate to
                  the review Screen.
                </Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      navigation.navigate('Review');
                    }}>
                    <Text style={styles.buttonText}>REVIEW</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>

          <View
            style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
            <TouchableOpacity
              onPress={() => {
                setWebViewDisplay(true);
              }}>
              <Text style={{fontSize: 16, color: 'black'}}>Privacy Policy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Top layer */}
      {webViewDisplay ? (
        <View
          style={{
            position: 'absolute',
            top: 0, // Adjust position as needed
            left: 0,
            right: 0,
            bottom: 0,
          }}>
          <TouchableOpacity
            onPress={() => {
              setWebViewDisplay(false);
            }}>
            <Text style={{fontSize: 20, color: 'black', marginLeft:10}}>Back</Text>
          </TouchableOpacity>
          <WebView
            source={source}
            style={{margin: 10}} // Adjusts the margin if needed
          />
        </View>
      ) : null}
    </View>
  ) : (
    <View style={[styles.container, styles.center]}>
      <Text style={styles.title}>Please login first</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainTitle: {
    textAlign: 'center',
    padding: 30,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#455d60',
  },
  secondTitle: {
    textAlign: 'center',
    marginHorizontal: '5%',
    fontSize: 15,
    color: '#838f91',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2f5f8',
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
  buttonText: {
    color: 'white',
    fontSize: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  center: {
    justifyContent: 'center',
  },
});

export default HomeScreen;
