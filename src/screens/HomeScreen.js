import React, { useEffect, useState, useRef } from 'react';
import { Text, View, StyleSheet, Alert, TouchableOpacity, FlatList } from 'react-native'
import auth from '@react-native-firebase/auth';
import { getUserInfoByEmail, getAllQuestions, getAllSessions, getAllSessionsByUserId } from '../utils/database';
// import { EditScreen } from '../screens';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { createStackNavigator } from '@react-navigation/stack';
import { ReviewScreen, EditScreen, DonationScreen} from '../screens';
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
    <View style={styles.container}>
      <Text style={styles.mainTitle}>Welcome back to UBE</Text>
      <Text style={styles.secondTitle}>Before you begin data donation, please proceed to the Help section.</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() =>{navigation.navigate('Donation')}}>
          <Text style={styles.buttonText}>Start donating</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.secondTitle}>If you want to review your donation data, please go to review Screen or click the button here</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() =>{navigation.navigate('Review')}}>
          <Text style={styles.buttonText}>Review</Text>
        </TouchableOpacity>
      </View>
    </View>
  ) : (
    <View style={[styles.container, styles.center]}>
      <Text style={styles.title}>Please login first</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mainTitle:{
    padding: 30,
    fontSize:28,
    fontWeight: 'bold',
    color: '#455d60'
  },
  secondTitle:{
    marginHorizontal:'5%',
    fontSize:18,
    color: '#838f91'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2f5f8'
  },
  buttonContainer: {
    margin: 20,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#7db1b7',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  center: {
    justifyContent: 'center',
  },
})



export default HomeScreen;
