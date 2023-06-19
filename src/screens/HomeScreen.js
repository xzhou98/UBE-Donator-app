import React, { useEffect, useState, useRef } from 'react';
import { Text, View, StyleSheet, Alert, TouchableOpacity, FlatList } from 'react-native'
import auth from '@react-native-firebase/auth';
import { getUserInfoByEmail, getAllQuestions, getAllSessions, getAllSessionsByUserId } from '../utils/database';
// import { EditScreen } from '../screens';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { createStackNavigator } from '@react-navigation/stack';
import { ReviewScreen, EditScreen, } from '../screens';
// import { showNotification, handle5SecNotification, handleCancel, handleScheduleNotification } from '../views/notification.android'
// import DatePicker from 'react-native-date-picker';
// import moment from 'moment';
// import Dialog from "react-native-dialog";



const HomeScreen = () => {
  const [user, setUser] = useState();
  const [refresh, setRefresh] = useState(false);
  // const [questions, setQuestions] = useState();
  const [render, setRender] = useState(false);
  const [sessions, setSessions] = useState(false);
  const [controler, setControler] = useState(true);
  const [sessionId, setSessionId] = useState();
  const [answerId, setAnswersId] = useState();
  const [allAnswers, setAllAnswers] = useState();


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
  }, [refresh]);

  return render ? (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ReviewScreen" component={ReviewScreen} />
      <Stack.Screen name="EditScreen" component={EditScreen} />
    </Stack.Navigator>)
    : (<View style={{ alignItems: "center" }}>
      <Text style={styles.title}>Please login first</Text>
    </View>)
}

const styles = StyleSheet.create({
  title: {
    color: "#161924",
    fontSize: 22,
    fontWeight: "bold",
  },
  back: {
    color: "#161924",
    fontSize: 18,
    fontWeight: "bold",
  },
  basetext: {
    color: "#161924",
    fontSize: 16,
    fontWeight: "400",
    paddingTop: 10,
  },
  boldtext: {
    color: "#161924",
    fontSize: 16,
    fontWeight: "bold",
    paddingTop: 15,
  },
  answer: {
    width: '80%',
    height: 65,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,


    borderRadius: 7,
    marginTop: 10,
    flexDirection: 'row',
    backgroundColor: '#7BB2BA',

  },
  answerTitle: {
    marginTop: 10,
    marginHorizontal: 10,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
  },
  answerDate: {
    marginTop: 4,
    marginHorizontal: 10,
    color: '#696969',
    fontSize: 13,
  },
  session: {
    height: 45,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 5,

    borderRadius: 7,
    marginTop: 25,
    flexDirection: 'row',
    backgroundColor: '#7BB2BA',
  },
  session1: {
    height: 45,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 5,

    borderRadius: 7,
    marginTop: 25,
    flexDirection: 'row',
    backgroundColor: '#D6E9EB',
  },
  session2: {
    height: 45,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 5,

    borderRadius: 7,
    marginTop: 25,
    flexDirection: 'row',
    backgroundColor: '#CDD8D9',
  },
  bold: {
    marginTop: 10,
    marginHorizontal: 10,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 17,
  },
  slim: {
    marginTop: 14,
    marginHorizontal: 10,
    color: '#696969',
    fontSize: 13,
  },
  button: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,

    textAlignVertical: 'center',
    textAlign: 'center',

    borderRadius: 7,
    backgroundColor: 'white',
    color: 'black',
    fontSize: 13,
    fontWeight: 'bold',
    height: 40,
    width: 70,
  },
})



export default HomeScreen;
