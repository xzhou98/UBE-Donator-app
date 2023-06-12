import React, { useEffect, useState, useRef } from 'react';
import { Text, View, StyleSheet, Alert, TouchableOpacity, SafeAreaView, FlatList, Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import { getUserInfoByEmail, removeDonationSession, getQuestionsBySessionId, getAnswersByAnswerId } from '../utils/database';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const EditScreen = ({ route, navigation }) => {
  const [user, setUser] = useState();
  const [refresh, setRefresh] = useState(false);
  const [questions, setQuestions] = useState();
  const [answers, setAnswers] = useState();
  const [render, setRender] = useState(false);
  const [answerId, setAnswersId] = useState(route.params.answerId)
  const [sessionId, setSessionId] = useState(route.params.sessionId)

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

  const deleteSession = (answers) => {
    removeDonationSession(answers.documentId, answerId)
    navigation.navigate('ReviewScreen')
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [refresh]);

  return (
    !render ? <></> :
      <View>
        <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
          <TouchableOpacity style={{ flex: 1 }} onPress={() => { navigation.goBack() }}>
            <MaterialIcons style={{ color: 'black' }} name="arrow-back" size={30} />
          </TouchableOpacity>

          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={styles.title}>EditScreen</Text>
          </View>
          {/* <Text style={{ flex: 1 }}></Text> */}
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <TouchableOpacity onPress={() => {
              Alert.alert('Delete Donation', 'Are you sure you want to delete this donation session? This will permanently delete all your responses so far and cannot be undone.', [
                { text: 'Delete', onPress: () => deleteSession(answers) },
                { text: 'Cancel', style: 'cancel' }
              ])
            }}>
              <Text style={[styles.Restart]}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
        <SafeAreaView
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            // backgroundColor: 'balck',
            height: '92%',
          }}>
          <FlatList
            ref={flatListRef}
            data={answers.answer}
            onContentSizeChange={() => flatListRef.current.scrollToEnd()}
            showsVerticalScrollIndicator={true}
            renderItem={({ item, index }) => (
              <View>
                {/* iterate question and answers */}
                <Text style={styles.leftOption}>
                  {getQuestionById(item.questionId).description}
                </Text>
                {item.answer.map((element, index) => {
                  if (element.length > 0) {
                    return <Text key={index} style={styles.rightMessage}>{element}</Text>
                  }
                })}
                {/* iterate image */}
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
                {/* delete button
                {index == (answers.answer.length - 1) ?
                
                  : <></>} */}
              </View>
            )}
          />
        </SafeAreaView>
      </View>
  )
}

const styles = StyleSheet.create({
  Restart: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 18,
    color: 'white',
    borderRadius: 7,
    height: 30,
    width: 80,
    // backgroundColor: '#95ec69',
    backgroundColor: 'red',
  },
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