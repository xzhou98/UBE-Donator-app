import React, { useEffect, useState, useRef } from 'react';
import { Text, View, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import { getUserInfoByEmail, getQuestionsBySessionId, getAnswersByAnswerId } from '../utils/database';


const HelpScreen = ({answerId, sessionId}) => {
  const [user, setUser] = useState();
  const [refresh, setRefresh] = useState(false);
  const [questions, setQuestions] = useState();
  const [answers, setAnswers] = useState();
  const [render, setRender] = useState(false);
  // const [answerId, setAnswersId] = useState();
  const onAuthStateChanged = async user => {
    try {
      let userInfo = await getUserInfoByEmail(user.email);
      setUser(userInfo);

      let allQuestions = await getQuestionsBySessionId(sessionId)
      setQuestions(allQuestions)

      let allAnswers = await getAnswersByAnswerId(userInfo.id, answerId)
      setAnswers(allAnswers)

      setRender(true);
    } catch (error) {
      Alert.alert(error);
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [refresh]);

  return (
    <View>
        <Text style={styles.title}>{answerId}</Text>
    </View>
  )
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
  }
})



export default HelpScreen;