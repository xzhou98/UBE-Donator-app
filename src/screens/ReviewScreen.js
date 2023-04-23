import React, { useEffect, useState, useRef } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native'
import auth from '@react-native-firebase/auth';
import { getUserInfoByEmail, getAllQuestions, getAllSessions } from '../utils/database';


const HelpScreen = () => {
  const [user, setUser] = useState();
  const [refresh, setRefresh] = useState(false);
  const [questions, setQuestions] = useState();
  const [render, setRender] = useState(false);
  const [sessions, setSessions] = useState(false);

  const onAuthStateChanged = async user => {
    try {
      let userInfo = await getUserInfoByEmail(user.email);
      setUser(userInfo);
      let allSessions = await getAllSessions(userInfo.id)
      setSessions(allSessions);

      let allQuestions = await getAllQuestions();
      setQuestions(allQuestions);

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
    <View style={{  }}>
      {sessions == undefined || sessions.lengeh == 0 ? <></> :
        <View style={{alignItems: 'center',}}>
          {sessions.map((item, index) => {
            return(
              <View key={index} style={styles.session}>
                <Text style={styles.bold}>
                  Data Donation {index+1}
                </Text>
                <Text style={styles.slim}>
                  {item.date}
                </Text>
              </View>
            )
          })}
        </View>}

    </View>) : (<View style={{ alignItems: "center" }}>
      <Text style={styles.title}>Please login first</Text>
    </View>)
}

const styles = StyleSheet.create({
  title: {
    color: "#161924",
    fontSize: 20,
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
    height: 70,

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
    backgroundColor: '#aed4d9',
  },
  bold:{
    marginTop: 5,
    marginHorizontal: 10,
    color: 'black',
    fontWeight: 'bold',
  },
  slim:{
    marginTop: 5,
    marginHorizontal: 10,
  }
})



export default HelpScreen;