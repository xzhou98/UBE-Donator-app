import React, { useEffect, useState, useRef } from 'react';
import { Text, View, StyleSheet, Alert, TouchableOpacity, SafeAreaView, FlatList, Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import { getUserInfoByEmail, getQuestionsBySessionId, getAnswersByAnswerId } from '../utils/database';


const EditScreen = ({ answerId, sessionId }) => {
  const [user, setUser] = useState();
  const [refresh, setRefresh] = useState(false);
  const [questions, setQuestions] = useState();
  const [answers, setAnswers] = useState();
  const [render, setRender] = useState(false);
  // const [answerId, setAnswersId] = useState();

  const flatListRef = useRef();


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

  const getQuestionById = questionId => {
    return questions[questionId]
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [refresh]);

  return (
    !render ? <></> :
      <View>
        <SafeAreaView
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#f2f5f8',
            height: '95%',
          }}>
          <FlatList
            ref={flatListRef}
            data={answers.answer}
            onContentSizeChange={() => flatListRef.current.scrollToEnd()}
            showsVerticalScrollIndicator={true}
            renderItem={({ item, index }) => (
              <View>
                <Text style={styles.leftOption}>
                  {getQuestionById(item.questionId).description}
                </Text>
                {item.answer.map((element, index) => {
                  if (element.length > 0) {
                    return <Text key={index} style={styles.rightMessage}>{element}</Text>
                  }
                })}
                {item.image.map((url, index) => {
                  if (url.length > 0) {
                    return (
                      <View key={index}>
                        <TouchableOpacity
                          onPress={() => {
                            // setImage(`file://${url}`);
                            // setImageVisible(true);
                          }}>
                          <Image
                            source={{
                              uri: `${url}`,
                            }}
                            resizeMode={'contain'}
                            style={[styles.rightImage]}
                          />
                        </TouchableOpacity>
                      </View>
                    )
                  }
                })}
              </View>
            )}
          />

        </SafeAreaView>
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
  },
  leftOption: {
    fontSize: 16,
    color: 'black',
    padding: 10,
    borderRadius: 7,
    marginRight: '30%',
    marginLeft: '5%',
    marginTop: 15,
    backgroundColor: '#aed4d9',
  },
  leftMessage: {
    fontSize: 16,
    color: 'black',
    padding: 10,
    borderRadius: 7,
    marginRight: '30%',
    marginLeft: '3%',
    marginTop: 15,
    backgroundColor: 'white',
  },
  rightImage: {
    marginLeft: '50%',
    marginRight: '3%',
    borderRadius: 7,
    width: 180,
    height: 150,
  },
  rightMessage: {
    fontSize: 16,
    color: 'black',
    padding: 10,
    borderRadius: 7,
    marginTop: 15,
    marginLeft: '35%',
    marginRight: '3%',
    backgroundColor: '#95ec69',
  },
})



export default EditScreen;