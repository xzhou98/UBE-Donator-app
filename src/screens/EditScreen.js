import React, {useEffect, useState, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Image,
  Button,
  Modal,
  ScrollView,
  TextInput,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {
  getUserInfoByEmail,
  removeDonationSession,
  getQuestionsBySessionId,
  getAnswersByAnswerId,
  updateAnswer,
} from '../utils/database';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ReviewScreen from './ReviewScreen';

const EditScreen = ({route, navigation}) => {
  const [user, setUser] = useState();
  const [refresh, setRefresh] = useState(false);
  const [questions, setQuestions] = useState();
  const [answers, setAnswers] = useState();
  const [render, setRender] = useState(false);
  const [answerId, setAnswersId] = useState(route.params.answerId);
  const [sessionId, setSessionId] = useState(route.params.sessionId);
  const [subWindow, setSubWindow] = useState(false);
  const [question, setQuestion] = useState();
  const [answer, setAnswer] = useState();
  const [recall, setRecall] = useState(true);
  const [originalId, setOriginalId] = useState();
  const [currentAnswerId, setCurrentAnswerId] = useState();
  const [textInput, setTextInput] = useState();

  const flatListRef = useRef();

  const onAuthStateChanged = async user => {
    try {
      let userInfo = await getUserInfoByEmail(user.email);
      setUser(userInfo);

      let allQuestions = await getQuestionsBySessionId(sessionId);
      setQuestions(allQuestions);

      let allAnswers = await getAnswersByAnswerId(userInfo.id, answerId);
      setAnswers(allAnswers);

      setRender(true);
      setRecall(false);
    } catch (error) {
      Alert.alert(error);
    }
  };

  const getQuestionById = questionId => {
    return questions[questionId];
  };

  const deleteSession = answers => {
    removeDonationSession(answers.documentId, answerId);
    navigation.navigate('ReviewScreen');
  };
  const setCurrentAnswer = (answers, question) => {
    if (question.type == 0 || question.type == 1) {
      let temp = [];
      let option = question.option;
      for (let index = 0; index < option.length; index++) {
        if (question.type == 0 && answers.includes(option[index].option)) {
          temp.push(true);
          setOriginalId(question.id);
        } else if (question.type == 1 && answers[0].includes(option[index]))
          temp.push(true);
        else temp.push(false);
      }
      setAnswer(temp);
    }
  };

  const handleSubmit = async () => {
    let newAnswer = answers;
    try {
      if (question.type == 0) {
        let idx = answer.indexOf(true);
        // console.log(answers.answer[currentAnswerId]);
        let currentAnswer = answers.answer[currentAnswerId];
        if (
          question.option[idx].nextQuestionId != currentAnswer.nextQuestionId
        ) {
          Alert.alert(
            'Notification',
            'Are you sure you want to change your answer? This will permanently delete all your responses after this question.',
            [
              {
                text: 'Confirm',
                onPress: () => {
                  newAnswer.answer = newAnswer.answer.slice(
                    0,
                    currentAnswerId + 1,
                  );
                  newAnswer.answer[currentAnswerId].answer = [
                    question.option[idx].option,
                  ];
                  updateAnswer(newAnswer);
                  setRecall(true);
                },
              },
              {text: 'Cancel', style: 'cancel'},
            ],
          );
        } else {
          if (currentAnswer.answer.includes(question.option[idx].option)) {
            Alert.alert('Notification', 'Nothing changed');
          } else {
            newAnswer.answer[currentAnswerId].answer = [
              question.option[idx].option,
            ];
            await updateAnswer(newAnswer);
            setRecall(true);
          }
        }
        setRefresh(!refresh);
      } else if (question.type == 1) {
        let newOption = '';
        let check = true;
        let currentAnswer = answers.answer[currentAnswerId];
        let options = questions[currentAnswer.questionId].option;
        for (let i = 0; i < answer.length; i++) {
          if (answer[i])
            newOption += newOption.length == 0 ? options[i] : ',' + options[i];
        }

        if (newOption === currentAnswer.answer[0]) {
          Alert.alert('Notification', 'Nothing changed');
        } else {
          Alert.alert(
            'Notification',
            'Are you sure you want to change your answer?',
            [
              {
                text: 'Confirm',
                onPress: () => {
                  newAnswer.answer[currentAnswerId].answer = [newOption];
                  updateAnswer(newAnswer);
                  setRecall(true);
                },
              },
              {text: 'Cancel', style: 'cancel'},
            ],
          );
        }
        setRefresh(!refresh);
      } else if (question.type == 2) {
      } else if (question.type == 3) {
        Alert.alert(
          'Notification',
          'Are you sure you want to change your answer?',
          [
            {
              text: 'Confirm',
              onPress: () => {
                newAnswer.answer[currentAnswerId].answer = [textInput];
                updateAnswer(newAnswer);
                setRecall(true);
              },
            },
            {text: 'Cancel', style: 'cancel'},
          ],
        );
      }
      setRefresh(!refresh);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (recall) {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber; // unsubscribe on unmount
    }
  }, [refresh]);

  return !render ? (
    <></>
  ) : (
    <View>
      <View style={{flexDirection: 'row', paddingBottom: 10}}>
        <TouchableOpacity
          style={{flex: 1}}
          onPress={() => {
            navigation.goBack();
          }}>
          <MaterialIcons style={{color: 'black'}} name="arrow-back" size={30} />
        </TouchableOpacity>

        {/* <Text style={{ flex: 1 }}></Text> */}
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                'Delete Donation',
                'Are you sure you want to delete this donation session? This will permanently delete all your responses so far and cannot be undone.',
                [
                  {text: 'Delete', onPress: () => deleteSession(answers)},
                  {text: 'Cancel', style: 'cancel'},
                ],
              );
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
          renderItem={({item, index}) => (
            <View>
              {/* iterate question and answers */}
              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 2}}>
                  <Text style={styles.leftOption}>
                    {getQuestionById(item.questionId).description}
                  </Text>
                  {/* <Text style={styles.leftNote}>
                  {getQuestionById(item.questionId).note}
                </Text> */}
                </View>
                {index > 1 ? (
                  <View
                    style={{
                      flex: 1,
                      // justifyContent: 'center',
                      marginTop: 25,
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        let q = getQuestionById(item.questionId);
                        setQuestion(q);
                        setCurrentAnswer(item.answer, q);
                        setCurrentAnswerId(index);
                        if (questions[item.questionId].type == 3) {
                          let text = '';
                          item.answer.forEach(element => {
                            text += element + '\n';
                          });
                          setTextInput(text);
                        }
                        setSubWindow(true);
                      }}>
                      <View style={styles.buttonContainer}>
                        <Text style={styles.editButton}>Edit</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={{flex: 1}} />
                )}
              </View>
              {item.answer.map((element, index) => {
                if (element.length > 0) {
                  return (
                    <Text key={index} style={styles.rightMessage}>
                      {element}
                    </Text>
                  );
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
                  );
                }
              })}
              {/* delete button
                {index == (answers.answer.length - 1) ?
                
                  : <></>} */}
            </View>
          )}
        />
      </SafeAreaView>

      {/* edit window */}
      <Modal transparent={true} visible={subWindow}>
        <View style={{backgroundColor: '#000000aa', flex: 1}}>
          <View
            style={{
              backgroundColor: '#ffffff',
              margin: 50,
              padding: 40,
              borderRadius: 10,
              flex: 1,
            }}>
            {question != undefined ? (
              <View style={{flex: 8}}>
                <View style={{backgroundColor: '#aed4d9', borderRadius: 10}}>
                  <ScrollView style={{height: '40%'}}>
                    <Text style={{fontSize: 18, color: 'black', padding: '5%'}}>
                      {question.description}
                    </Text>
                  </ScrollView>
                </View>

                {/* multiple choice */}
                {question.type == 0 ? (
                  <View style={{marginTop: 10, height: '40%'}}>
                    {question.option.map((option, index) => {
                      return (
                        <View key={index} style={{marginTop: 10}}>
                          <Button
                            onPress={() => {
                              let temp = answer;
                              for (let i = 0; i < temp.length; i++) {
                                temp[i] = false;
                                if (i == index) temp[i] = true;
                              }
                              setAnswer(temp);
                              setRefresh(!refresh);
                            }}
                            color={answer[index] ? '#95ec69' : '#aed4d9'}
                            title={option.option}
                          />
                        </View>
                      );
                    })}
                  </View>
                ) : (
                  <></>
                )}
                {question.type == 1 ? (
                  <View style={{marginTop: 10, height: '40%'}}>
                    {question.option.map((option, index) => {
                      return (
                        <View key={index} style={{marginTop: 10}}>
                          <Button
                            onPress={() => {
                              let temp = answer;
                              for (let i = 0; i < temp.length; i++) {
                                if (i == index) temp[i] = !temp[i];
                              }
                              setAnswer(temp);
                              setRefresh(!refresh);
                            }}
                            color={answer[index] ? '#95ec69' : '#aed4d9'}
                            title={option}
                          />
                        </View>
                      );
                    })}
                  </View>
                ) : (
                  <></>
                )}

                {question.type == 2 ? (
                  <View style={{marginTop: 10, height: '40%'}}>
                    {question.option.map((option, index) => {
                      return (
                        <View key={index} style={{marginTop: 10}}>
                          <Button
                            onPress={() => {
                              let temp = answer;
                              for (let i = 0; i < temp.length; i++) {
                                if (i == index) temp[i] = !temp[i];
                              }
                              setAnswer(temp);
                              setRefresh(!refresh);
                            }}
                            color={answer[index] ? '#95ec69' : '#aed4d9'}
                            title={option}
                          />
                        </View>
                      );
                    })}
                  </View>
                ) : (
                  <></>
                )}

                {question.type == 3 ? (
                  <View style={{marginTop: 10, height: '40%'}}>
                    <TextInput
                      multiline={true}
                      value={textInput}
                      style={{
                        flex: 9,
                        borderRadius: 5,
                        fontSize: 20,
                        borderWidth: 0.5,
                      }}
                      onChangeText={text => {
                        setTextInput(text);
                      }}
                    />
                  </View>
                ) : (
                  <></>
                )}
              </View>
            ) : (
              <></>
            )}

            <View style={{flex: 1, flexDirection: 'row'}}>
              <TouchableOpacity
                style={{flex: 1, alignItems: 'center'}}
                onPress={() => {
                  setSubWindow(false);
                }}>
                <View style={styles.buttonContainer}>
                  <Text style={{color: '#ed2d34', fontSize: 20}}>Cancel</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{flex: 1, alignItems: 'center'}}
                onPress={() => {
                  setSubWindow(false);
                  handleSubmit();
                }}>
                <View style={styles.buttonContainer}>
                  <Text style={{fontSize: 20}}>Submit</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  submitButton: {
    justifyContent: 'center',
    backgroundColor: '#aed4d9',
    // flex: 1,
    // width: '50%',
  },
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
    color: '#161924',
    fontSize: 20,
    fontWeight: 'bold',
  },
  basetext: {
    color: '#161924',
    fontSize: 16,
    fontWeight: '400',
    paddingTop: 10,
  },
  boldtext: {
    color: '#161924',
    fontSize: 16,
    fontWeight: 'bold',
    paddingTop: 15,
  },
  leftOption: {
    fontSize: 16,
    color: 'black',
    padding: 10,
    borderRadius: 7,
    marginRight: '5%',
    marginLeft: '5%',
    marginTop: 15,
    backgroundColor: '#aed4d9',
  },
  leftNote: {
    fontSize: 16,
    color: '#3a3b3a',
    // marginRight: '30%',
    marginLeft: '3%',
    paddingTop: 10,
    paddingHorizontal: 10,
    fontStyle: 'italic',
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
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#aed4d9',
    borderRadius: 9,
    height: 45,
    width: 80,
  },
  editButton: {
    // margin: '10%'
    // margin: 20,
    color: 'white',
    fontSize: 18,
  },
});

export default EditScreen;
