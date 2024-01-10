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
// import { showNotification, handle5SecNotification, handleCancel, handleScheduleNotification } from '../views/notification.android'
// import DatePicker from 'react-native-date-picker';
// import moment from 'moment';
// import Dialog from "react-native-dialog";

const HomeScreen = ({navigation}) => {
  const [user, setUser] = useState();
  // const [questions, setQuestions] = useState();
  const [render, setRender] = useState(false);
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
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.mainTitle}>Welcome back to UBE</Text>
        <Text style={styles.secondTitle}>
          Before you begin data donation, please proceed to the Help section.
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('Technical Support');
            }}>
            <Text style={styles.buttonText}>Using Ube</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.secondTitle}>
          If you're looking for some help.
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('Ube Help');
            }}>
            <Text style={styles.buttonText}>Ube Help</Text>
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
            <Text style={styles.buttonText}>Start donating</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.secondTitle}>
          If you want to review your donation data, please navigate to the
          review Screen.
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('Review');
            }}>
            <Text style={styles.buttonText}>Review</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
