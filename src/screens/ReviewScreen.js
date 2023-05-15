import React, { useEffect, useState, useRef } from 'react';
import { Text, View, StyleSheet, Alert, TouchableOpacity } from 'react-native'
import auth from '@react-native-firebase/auth';
import { getUserInfoByEmail, getAllQuestions, getAllSessions } from '../utils/database';
import { EditScreen } from '../screens';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const HelpScreen = () => {
  const [user, setUser] = useState();
  const [refresh, setRefresh] = useState(false);
  // const [questions, setQuestions] = useState();
  const [render, setRender] = useState(false);
  const [sessions, setSessions] = useState(false);
  const [controler, setControler] = useState(true);
  const [sessionId, setSessionId] = useState();
  const [answerId, setAnswersId] = useState();

  const onAuthStateChanged = async user => {
    try {
      let userInfo = await getUserInfoByEmail(user.email);
      setUser(userInfo);
      let allSessions = await getAllSessions(userInfo.id)
      setSessions(allSessions);
      // let allQuestions = await getAllQuestions();
      // setQuestions(allQuestions);

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
    <View style={{}}>
      {controler ? <View style={{ alignItems: 'center', }}>
        {sessions.length == 0 || sessions == [] || sessions == undefined ? <Text>Please complete one session first</Text> : <></>}
        {sessions.map((item, index) => {
          return (
            <View key={index} style={styles.session}>
              <View>
                <Text style={styles.bold}>
                  Data Donation {index + 1}
                </Text>
                <Text style={styles.slim}>
                  {item.date}
                </Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity onPress={() => { setControler(!controler); setAnswersId(item.id); setSessionId(item.sessionId)}}>
                  <Text style={styles.button}>
                    Review
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.button}>
                    Delete
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

          )
        })}
      </View > :
        <View>
          <View style={{ flexDirection: 'row', }}>
            <TouchableOpacity style={{ flex: 1 }} onPress={() => { setControler(!controler) }}>
              <MaterialIcons style={{ color: 'black' }} name="arrow-back" size={30} />
            </TouchableOpacity>

            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={styles.title}>EditScreen</Text>
            </View>
            <Text style={{ flex: 1 }}></Text>

          </View>
          <EditScreen answerId={answerId} sessionId={sessionId} ></EditScreen>
        </View>

      }

    </View>) : (<View style={{ alignItems: "center" }}>
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
  session: {
    width: '90%',
    height: 90,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,

    borderRadius: 5,
    marginVertical: 20,
    flexDirection: 'row',
    backgroundColor: '#aed4d9',
  },
  bold: {
    marginTop: 20,
    marginHorizontal: 10,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  slim: {
    marginTop: 5,
    marginHorizontal: 10,
  },
  button: {
    paddingLeft: 15,
    paddingTop: 10,
    marginLeft: 20,


    color: 'black',
    fontWeight: 'bold',
    height: 40,
    width: 70,
    marginVertical: 25,
    borderRadius: 10,
    backgroundColor: 'white',

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
})



export default HelpScreen;