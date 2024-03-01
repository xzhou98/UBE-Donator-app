import React, {useEffect, useState, useRef} from 'react';
import {PhotoEditorNewPath} from '../views/PhotoEditorNewPath.js';
import {
  Text,
  Image,
  View,
  Modal,
  FlatList,
  StyleSheet,
  TextInput,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
  Button,
} from 'react-native';
import moment from 'moment';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  getUserInfoByEmail,
  getAllQuestions,
  countInactNum,
} from '../utils/database';
import auth from '@react-native-firebase/auth';
import {Dropdown} from 'react-native-element-dropdown';
import {
  getAnswer,
  saveData,
  addAnswers,
  removeAll,
  setQId,
  getQId,
  addAnswersById,
  setNextQuestionId,
  removeLastQuestion,
  updateNumericAnswers,
  skipQuestionsById,
} from '../views/Global';
import ImageViewer from 'react-native-image-zoom-viewer';
import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';
import {COLORS} from '../constants/theme';
// import { launchImageLibrary } from 'react-native-image-picker';
import PhotoEditor from 'react-native-photo-editor';
import firestore from '@react-native-firebase/firestore';
import {ContactUsScreen} from '../screens';

const DonationScreen = ({route, navigation}) => {
  const [render, setRender] = useState(false);
  const [user, setUser] = useState();
  const [questions, setQuestions] = useState();
  const [answers, setAnswers] = useState();
  const [imageVisible, setImageVisible] = useState(false);
  const [image, setImage] = useState(false);
  const [currentInput, setCurrentInput] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState();
  const [refresh, setRefresh] = useState(false);
  const [currentOption, setCurrentOption] = useState();
  const [mico, setMico] = useState(false);
  const [shortcut, setShortcut] = useState(false);
  const [imageUrl, setImageUrl] = useState([]);
  const [sessionId, setSessionId] = useState();
  const [sessionNum, setSessionNum] = useState();
  const [contactUsScreen, setContactUsScreen] = useState(false);
  const [reload, setReload] = useState(true);
  const [image_answer, setImage_answer] = useState();
  const flatListRef = useRef();
  const [wellnessCheck, setWellnessCheck] = useState();
  const [skip, setSkip] = useState(false);
  const [donorEmailAddress, setDonorEmailAddress] = useState([]);
  const [prolific_fail_link, setProlific_fail_link] = useState([]);
  const [prolific_success_link, setProlific_success_link] = useState([]);
  const [shouldScrollToEnd, setShouldScrollToEnd] = useState(false);

  /**
   * get user info by user email that got from firebase Auth
   *
   * @param {*} user
   */
  const onAuthStateChanged = async user => {
    try {
      let userInfo = await getUserInfoByEmail(user.email);
      setUser(userInfo);

      let allQuestions = await getAllQuestions();

      if (allQuestions != null) {
        setSessionId(allQuestions.id);
        setSessionNum(allQuestions.session);
        setDonorEmailAddress(allQuestions.DonorEmailAddress);
        setProlific_fail_link(allQuestions.prolific_fail_link);
        setProlific_success_link(allQuestions.prolific_success_link);
        allQuestions = allQuestions.questions;
        setQuestions(allQuestions);
        let allAnswers = getAnswer();

        if (allAnswers.length > 0) {
          let qId = Number(allAnswers[allAnswers.length - 1].nextQuestionId);
          setCurrentQuestion(allQuestions[qId]);
        } else {
          setCurrentQuestion(allAnswers[0]);
        }
        setAnswers(allAnswers);
        let imageList = [];

        for (let i = 0; i < allAnswers.length; i++) {
          if (
            allAnswers[i].image != undefined &&
            allAnswers[i].image.length > 0
          ) {
            let temp = JSON.parse(JSON.stringify(allAnswers[i].image));
            imageList.push(temp);
          } else imageList.push([]);
        }
        setImage_answer(imageList);
      }

      // console.log(allQuestions);
      setRender(true);
      setReload(false);
    } catch (error) {
      Alert.alert(error);
    }
  };

  useEffect(() => {
    if (reload) {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      setShouldScrollToEnd(true);
      return subscriber;
    }

    // unsubscribe on unmount
  }, [refresh]);

  const selectImage = async () => {
    try {
      const response = await MultipleImagePicker.openPicker({
        mediaType: 'image',
      });
      let temp = [];
      for (let i = 0; i < response.length; i++) {
        // const element = response[i].path;
        const element = response[i].realPath;
        temp.push(element);
      }
      setImageUrl(temp);
    } catch (error) {
      console.log(error);
    }
  };

  const restartSession = () => {
    removeAll();
    addAnswers({
      isTrueAnswer: false,
      answer: [],
      image: [],
      nextQuestionId: '1',
      questionId: '0',
    });
    setContactUsScreen(false);
    setCurrentInput('');
    setImageUrl([]);
    setCurrentOption();
    if (shortcut) setShortcut(!shortcut);
    setWellnessCheck(false);
    setSkip(false);
    setReload(true);
    setRefresh(!refresh);
  };

  const forceAnswer = item => {
    if (
      currentQuestion.nextQuestionId == undefined ||
      currentQuestion.nextQuestionId.length == 0 ||
      currentQuestion.nextQuestionId != item.nextQuestionId
    ) {
      setCurrentInput('');
      addAnswers({
        isTrueAnswer: true,
        answer: [item.option],
        image: [],
        nextQuestionId: item.nextQuestionId,
        questionId: currentQuestion.id,
      });
      setReload(true);
      setRefresh(!refresh);
    } else {
      setCurrentInput('');
      addAnswers({
        isTrueAnswer: true,
        answer: [item.option],
        image: [],
        nextQuestionId: currentQuestion.nextQuestionId,
        questionId: currentQuestion.id,
      });
      setReload(true);
      setRefresh(!refresh);
    }
  };

  const restartWholeProcess = () => {
    setRender(false);
    setCurrentInput('');
    setCurrentOption();
    removeAll();
    addAnswers({
      isTrueAnswer: false,
      answer: [],
      image: [],
      nextQuestionId: '1',
      questionId: '0',
    });
    setReload(true);
    setRefresh(!refresh);
    if (shortcut) setShortcut(!shortcut);
    setSkip(false);
  };

  const skipQuestion = currentQuestion => {
    if (currentQuestion.type == 5 || currentQuestion.type == 6) {
      Alert.alert(
        'Skip',
        'Skipping this question will end the session - are you sure you want to proceed?',
        [
          {
            text: 'End Session',
            // onPress: () => restartSession(),
            onPress: () => setSkip(true),
          },
          {text: 'Cancel', tyle: 'cancel'},
        ],
      );
    } else {
      if (
        currentQuestion.nextQuestionId.length != 0 &&
        currentQuestion.nextQuestionId != undefined
      ) {
        if (
          currentQuestion.forceAnswer == undefined ||
          currentQuestion.forceAnswer == false
        ) {
          setCurrentInput('');
          setImageUrl([]);
          setCurrentOption();
          addAnswers({
            isTrueAnswer: true,
            answer: ['Skip'],
            image: [],
            nextQuestionId: currentQuestion.nextQuestionId,
            questionId: currentQuestion.id,
          });
          setReload(true);
          setRefresh(!refresh);
          // setShortcut(false);
          setSkip(false);
        } else {
          Alert.alert(
            'Skip',
            'Skipping this question will end the session - are you sure you want to proceed?',
            [
              {
                text: 'End Session',
                // onPress: () => restartSession(),
                onPress: () => setSkip(true),
              },
              {text: 'Cancel', tyle: 'cancel'},
            ],
          );
          // setShortcut(false);
        }
      } else {
        Alert.alert(
          'Skip',
          'Skipping this question will end the session - are you sure you want to proceed?',
          [
            {
              text: 'End Session',
              // onPress: () => restartSession(),
              onPress: () => setSkip(true),
            },
            {text: 'Cancel', tyle: 'cancel'},
          ],
        );
        // setShortcut(!shortcut);
      }
    }
  };

  const saveDatatoFirebase = async (
    option,
    sessionId,
    userId,
    userEmail,
    sessionNum,
    nextQuestionId,
    currentQuestionId,
    donorEmailAddress,
  ) => {
    try {
      await saveData(
        sessionId,
        userId,
        userEmail,
        sessionNum,
        donorEmailAddress,
      );
    } catch (error) {
      console.log(error);
    }
    // removeAll();
    setContactUsScreen(true);
    addAnswers({
      isTrueAnswer: false,
      answer: [option],
      image: [],
      nextQuestionId: nextQuestionId,
      questionId: currentQuestionId,
    });
    setCurrentInput('');
    setReload(true);
    setRefresh(!refresh);
  };

  const countSubmittionOfInactUser = async userId => {
    try {
      await countInactNum(userId);
    } catch (error) {
      console.log(error);
    }
  };

  const backToLastQuestion = () => {
    Alert.alert(
      'Back to last question',
      'Are you sure you want to go back to the last question? This will erase your answer to the current question.',
      [
        {
          text: 'Yes',
          onPress: () => {
            removeLastQuestion();
            setCurrentInput('');
            setCurrentOption();
            setReload(true);
            setRefresh(!refresh);
            setShortcut(false);
            setWellnessCheck(false);
            setImageUrl([]);
            setSkip(false);
          },
        },
        {text: 'No, Cancel', style: 'cancel'},
      ],
    );
  };

  const reGetAllquestions = () => {
    // try {
    //   let allQuestions = await getAllQuestions();
    //   allQuestions = allQuestions.questions;
    //   setQuestions(allQuestions);
    // } catch (error) {
    //   console.log(error);
    // }
    setRender(false);
    setReload(true);
    setRefresh(!refresh);
  };

  return render ? (
    user.num >= 2 ? (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: 'black',
            fontSize: 20,
          }}>
          Thank you for your responses.
        </Text>
      </View>
    ) : sessionId == null || sessionId == undefined ? (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: 'black',
            fontSize: 20,
          }}>
          The next donation session will open soon.
        </Text>
        <Button
          onPress={() => {
            setRender(false);
            setReload(true);
            setRefresh(!refresh);
          }}
          title="Refresh"
        />
      </View>
    ) : (
      <View>
        <SafeAreaView
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#f2f5f8',
            height: '100%',
          }}>
          <View style={{flexDirection: 'row'}}>
            {/* Physical Sexual Contact */}
            <View style={{flex: 3, flexDirection: 'row'}}>
              <TouchableOpacity
                style={{flex: 1}}
                onPress={() => {
                  // Alert.alert(
                  //   'Physical Sexual Contact Definition',
                  //   'Physical Sexual Contact is defined as contact between two or more people, including hugging, kissing, oral, anal, or vaginal intercourse.',
                  //   [{text: 'Close', style: 'cancel'}],
                  // );
                  reGetAllquestions();
                }}>
                {/* <Image
                  source={require('../css/images/book.jpg')}
                  style={{marginLeft: 20, width: 35, height: 35}}
                /> */}
                                 <MaterialIcons
                    style={{color: 'black', flex: 1, marginLeft: 20,}}
                    name="refresh"
                    size={35}
                  />
              </TouchableOpacity>
              <View style={{flex: 3, flexDirection: 'column'}}>
                <Text
                  style={{
                    flex: 1,
                    color: 'black',
                    fontSize: 12,
                    paddingTop: 2,
                  }}>
                  If find any error, please
                </Text>
                <Text
                  style={{
                    flex: 1,
                    color: 'black',
                    fontSize: 12,
                    paddingBottom: 5,
                  }}>
                  refresh the screen
                </Text>
              </View>
            </View>

            {/* stop session */}
            <View
              style={{
                alignItems: 'flex-end',
                flex: 1,
                flexDirection: 'column',
              }}>
              <TouchableOpacity
                onPress={() => {
                  Alert.alert('Stop/Withdraw Session', '', [
                    {text: 'Cancel', style: 'cancel'},
                    {
                      text: 'Quit Session',
                      onPress: () => {
                        Alert.alert(
                          '',
                          'This will exit from and delete all your session progress. Are you sure you want to quit?',
                          [
                            {
                              text: 'Yes, I want to quit.',
                              onPress: () => {
                                restartSession();
                                navigation.navigate('Help');
                              },
                            },
                            {text: 'No, Cancel', style: 'cancel'},
                          ],
                        );
                      },
                    },
                    {
                      text: 'Exit Session Temporarily',
                      onPress: () => {
                        Alert.alert(
                          '',
                          'You are temporarily exiting your current session. Your progress with be saved and you can come back and finish at any time',
                          [
                            {
                              text: 'Okay',
                              onPress: () => {
                                navigation.navigate('Home');
                              },
                            },
                            {text: 'Cancel', style: 'cancel'},
                          ],
                        );
                      },
                    },
                  ]);
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    fontSize: 11,
                    color: 'white',
                    // borderRadius: 5,
                    borderTopLeftRadius: 5,
                    borderTopRightRadius: 5,
                    height: 20,
                    marginRight: 20,
                    width: 65,
                    backgroundColor: '#FA5454',
                    paddingTop: 4,
                  }}>
                  Stop
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    fontSize: 11,
                    color: 'white',
                    borderBottomLeftRadius: 5,
                    borderBottomRightRadius: 5,
                    // borderRadius: 5,
                    height: 20,
                    marginRight: 20,
                    width: 65,
                    backgroundColor: '#FA5454',
                    paddingBottom: 4,
                  }}>
                  Session
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <FlatList
            style={{marginTop: 15}}
            ref={flatListRef}
            data={answers}
            // onContentSizeChange={() => flatListRef.current.scrollToEnd()}
            onContentSizeChange={() => {
              if (shouldScrollToEnd) {
                flatListRef.current.scrollToEnd();
                setShouldScrollToEnd(false); // Reset the flag
              }
            }}
            // showsVerticalScrollIndicator={true}
            renderItem={({item, index}) => (
              <View>
                {/* list answers */}
                {item.questionId > 0 ? (
                  questions[item.questionId].description.map(
                    (description, index) => {
                      return (
                        <View key={index}>
                          <Image
                            source={require('../css/images/robot_icon.jpg')}
                            style={{
                              marginLeft: '3%',
                              marginRight: '30%',
                              width: 35,
                              height: 35,
                              borderRadius: 20,
                              marginBottom: -30,
                              zIndex: 1,
                            }}
                          />
                          <Text style={[styles.leftMessage]}>
                            {' '}
                            {description}
                          </Text>
                        </View>
                      );
                    },
                  )
                ) : (
                  <></>
                )}

                {(questions[item.questionId] != undefined && questions[item.questionId].note != undefined &&
                  questions[item.questionId].note.length != 0) ? (
                    questions[item.questionId].note.split('\\n').map((line, index) => (
                      <Text key={index} style={styles.leftNote}>
                        <Text style={{fontWeight: 'bold'}}>Note: </Text>
                        {line}
                      </Text>
                    ))
                  ) : (
                    <></>
                  )}

                {/* check if the answer has image */}
                <View>
                  {item.image.length > 0 ? (
                    item.image.map((url, index) => {
                      return (
                        <View key={index}>
                          <TouchableOpacity
                            onPress={() => {
                              setImage(`file://${url}`);
                              setImageVisible(true);
                            }}>
                            <Image
                              source={{
                                uri: `file://${url}`,
                              }}
                              resizeMode={'cover'}
                              style={[styles.rightImage]}
                            />
                          </TouchableOpacity>
                        </View>
                      );
                    })
                  ) : (
                    <></>
                  )}
                </View>

                {/* check if the user input several answers to a question*/}
                {item.answer.length > 0 ? (
                  item.answer.map((answer, index) => {
                    return (
                      <View key={index} style={{alignItems: 'flex-end'}}>
                        <Text style={[styles.rightMessage]}>{answer} </Text>
                        <Image
                          source={require('../css/images/profile_icon.png')}
                          style={{
                            width: 30,
                            height: 30,
                            borderRadius: 20,
                            marginTop: -12,
                            marginRight: '3%',
                          }}
                        />
                      </View>
                    );
                  })
                ) : (
                  <></>
                )}

                {/* check is it the current question */}
                {index == answers.length - 1 ? (
                  <View>
                    <View>
                      {/* type next question depicts */}
                      {currentQuestion.description.map((description, index) => {
                        if (getQId() == currentQuestion.id) return;
                        else
                          return (
                            <View key={index}>
                              <Image
                                source={require('../css/images/robot_icon.jpg')}
                                style={{
                                  marginLeft: '3%',
                                  marginRight: '30%',
                                  width: 35,
                                  height: 35,
                                  borderRadius: 20,
                                  marginBottom: -30,
                                  zIndex: 1,
                                }}
                              />
                              <Text style={[styles.leftMessage]}>
                                {description}
                              </Text>
                            </View>
                          );
                      })}

                      {/* type next question note */}
                      {/* {currentQuestion.note != undefined &&
                      currentQuestion.note.length != 0 ? (
                        currentQuestion.note.split('\\n').map((line, index) => (
                          <Text key={index} style={styles.leftNote}>
                            <Text style={{fontWeight: 'bold'}}>Note: </Text>
                            {line}
                          </Text>
                        ))
                      ) : (
                        <></>
                      )} */}

                      {/* Display ContactUsScreen or current question*/}
                      {skip ? (
                        <View>
                          <Text style={[styles.leftMessage]}>
                            Thank you so much for your participation.
                          </Text>
                          <ContactUsScreen />
                          <View style={{alignItems: 'center'}}>
                            <TouchableOpacity
                              onPress={() => {
                                Alert.alert(
                                  'Restart Donation',
                                  'Are you sure you want to restart this donation session? This will permanently delete all your responses so far and cannot be undone.',
                                  [
                                    {
                                      text: 'Restart',
                                      onPress: () => restartSession(),
                                    },
                                    {text: 'Cancel', style: 'cancel'},
                                  ],
                                );
                              }}>
                              <View
                                style={{
                                  justifyContent: 'center',
                                  borderRadius: 7,
                                  height: 40,
                                  width: 110,
                                  backgroundColor: '#95ec69',
                                }}>
                                <Text style={[styles.Restart]}> RESTART</Text>
                              </View>
                            </TouchableOpacity>
                          </View>
                        </View>
                      ) : (
                        <View>
                          {/* multiple choice question */}
                          {currentQuestion.type == 0 ? (
                            <View>
                              {currentQuestion.option.map((item, index) => {
                                return (
                                  <TouchableOpacity
                                    key={index}
                                    onPress={() => {
                                      forceAnswer(item);
                                    }}>
                                    <Text style={[styles.leftOption]}>
                                      {item.option}
                                    </Text>
                                  </TouchableOpacity>
                                );
                              })}
                              {index < 1 ? (
                                <></>
                              ) : (
                                <View style={[styles.bottomShortcutStyle]}>
                                  {/* back */}
                                  <TouchableOpacity
                                    style={{flex: 1}}
                                    onPress={() => {
                                      backToLastQuestion();
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: 14,
                                        color: 'black',
                                      }}>
                                      {'< '}BACK
                                    </Text>
                                  </TouchableOpacity>
                                  {/* skip */}
                                  <TouchableOpacity
                                    style={{flex: 1, alignItems: 'center'}}
                                    onPress={() => {
                                      skipQuestion(currentQuestion);
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: 14,
                                        color: 'black',
                                      }}>
                                      SKIP
                                    </Text>
                                  </TouchableOpacity>
                                  {/* next */}
                                  <View style={{flex: 1}} />
                                </View>
                              )}
                            </View>
                          ) : (
                            <></>
                          )}

                          {/* multiple answers */}
                          {currentQuestion.type == 1 ? (
                            <View style={[styles.leftMCOption]}>
                              {currentQuestion.option.map((item, index) => {
                                return (
                                  <TouchableOpacity
                                    key={index}
                                    style={{
                                      paddingVertical: 3,
                                      paddingHorizontal: 10,
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                    }}
                                    onPress={() => {
                                      if (
                                        currentOption == null ||
                                        currentOption.length == 0
                                      ) {
                                        let temp = new Array(
                                          currentQuestion.option.length,
                                        ).fill('');
                                        temp[index] = item;
                                        setCurrentOption(temp);
                                      } else {
                                        let temp = currentOption;
                                        if (temp[index].length > 0) {
                                          temp[index] = '';
                                          setCurrentOption(temp);
                                        } else {
                                          temp[index] = item;
                                          setCurrentOption(temp);
                                        }
                                      }
                                      setReload(true);
                                      setRefresh(!refresh);
                                    }}>
                                    {currentOption != null &&
                                    currentOption[index].length > 0 ? (
                                      <Text
                                        style={{
                                          fontSize: 14,
                                          width: '100%',
                                          marginVertical: 2,
                                          color: 'black',
                                          padding: 8,
                                          borderRadius: 7,
                                          backgroundColor: '#c7ddff',
                                        }}
                                        key={index}>
                                        {index + 1}. {item}
                                      </Text>
                                    ) : (
                                      <Text
                                        style={{
                                          fontSize: 14,
                                          width: '100%',
                                          marginVertical: 2,
                                          color: 'black',
                                          padding: 8,
                                          borderRadius: 7,
                                          backgroundColor: '#aed4d9',
                                        }}
                                        key={index}>
                                        {index + 1}. {item}
                                      </Text>
                                    )}
                                  </TouchableOpacity>
                                );
                              })}
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  // margin: 10,
                                  // marginLeft: '5%',
                                  // marginRight: '30%',
                                }}>
                                {/* back */}
                                <TouchableOpacity
                                  style={{flex: 1}}
                                  onPress={() => {
                                    backToLastQuestion();
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: 14,
                                      color: 'black',
                                    }}>
                                    {'< '}BACK
                                  </Text>
                                </TouchableOpacity>
                                {/* skip */}
                                <TouchableOpacity
                                  style={{flex: 1, alignItems: 'center'}}
                                  onPress={() => {
                                    skipQuestion(currentQuestion);
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: 14,
                                      color: 'black',
                                    }}>
                                    SKIP
                                  </Text>
                                </TouchableOpacity>
                                {/* next */}
                                <TouchableOpacity
                                  style={{flex: 1, alignItems: 'flex-end'}}
                                  onPress={() => {
                                    if (currentOption != null) {
                                      let answer = '';
                                      for (
                                        let i = 0;
                                        i < currentOption.length;
                                        i++
                                      ) {
                                        if (currentOption[i].length > 0) {
                                          if (answer.length > 0)
                                            answer =
                                              answer + ',' + currentOption[i];
                                          else answer = currentOption[i];
                                        }
                                      }
                                      if (answer.length > 0) {
                                        addAnswers({
                                          isTrueAnswer: true,
                                          answer: [answer],
                                          image: [],
                                          nextQuestionId:
                                            currentQuestion.nextQuestionId,
                                          questionId: currentQuestion.id,
                                        });
                                        setCurrentOption();
                                        setCurrentInput('');
                                        setReload(true);
                                        setRefresh(!refresh);
                                      } else {
                                        Alert.alert(
                                          'Hi, no option have been selected - are you sure you want to proceed?',
                                        );
                                      }
                                    } else {
                                      Alert.alert(
                                        'Hi, no option have been selected - are you sure you want to proceed?',
                                      );
                                    }
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: 14,
                                      color: 'black',
                                    }}>
                                    NEXT{' >'}
                                  </Text>
                                </TouchableOpacity>
                              </View>
                            </View>
                          ) : (
                            <></>
                          )}

                          {/* drop down */}
                          {currentQuestion.type == 2 ? (
                            <View style={[styles.leftMCOption]}>
                              <Dropdown
                                style={[styles.dropdown]}
                                placeholderStyle={[styles.placeholderStyle]}
                                selectedTextStyle={[styles.selectedTextStyle]}
                                itemTextStyle={{color: 'black'}}
                                iconStyle={[styles.iconStyle]}
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                value={currentOption}
                                data={currentQuestion.option.map(
                                  (element, index) => ({
                                    label: `${element}`,
                                    value: `${index}`,
                                  }),
                                )}
                                onChange={item => {
                                  setCurrentOption(item.value);
                                }}
                              />
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  margin: 10,
                                }}>
                                <View style={{flex: 1}}>
                                  <TouchableOpacity
                                    onPress={() => {
                                      skipQuestion(currentQuestion);
                                    }}>
                                    <Text style={styles.skipNext}>Skip</Text>
                                  </TouchableOpacity>
                                </View>
                                <View style={{flex: 1, alignItems: 'flex-end'}}>
                                  <TouchableOpacity
                                    onPress={() => {
                                      if (currentOption != null) {
                                        addAnswers({
                                          isTrueAnswer: true,
                                          answer: [
                                            currentQuestion.option[
                                              currentOption
                                            ],
                                          ],
                                          image: [],
                                          nextQuestionId:
                                            currentQuestion.nextQuestionId,
                                          questionId: currentQuestion.id,
                                        });
                                        setCurrentOption();
                                        setCurrentInput('');
                                        setReload(true);
                                        setRefresh(!refresh);
                                      } else {
                                        Alert.alert(
                                          'Hi, no option have been selected - are you sure you want to proceed?',
                                        );
                                      }
                                    }}>
                                    <Text style={styles.skipNext}>Next</Text>
                                  </TouchableOpacity>
                                </View>
                              </View>
                            </View>
                          ) : (
                            <></>
                          )}

                          {/* textInput */}
                          {currentQuestion.type == 3 ? (
                            <View>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  marginLeft: '5%',
                                  marginRight: '30%',
                                  marginVertical: 20,
                                }}>
                                {/* back */}
                                <TouchableOpacity
                                  style={{flex: 1}}
                                  onPress={() => {
                                    backToLastQuestion();
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: 14,
                                      color: 'black',
                                    }}>
                                    {'< '}BACK
                                  </Text>
                                </TouchableOpacity>
                                {/* skip */}
                                <TouchableOpacity
                                  style={{flex: 1, alignItems: 'center'}}
                                  onPress={() => {
                                    skipQuestion(currentQuestion);
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: 14,
                                      color: 'black',
                                    }}>
                                    SKIP
                                  </Text>
                                </TouchableOpacity>
                                {/* next */}
                                <TouchableOpacity
                                  style={{flex: 1, alignItems: 'flex-end'}}
                                  onPress={() => {
                                    if (getQId() == currentQuestion.id) {
                                      setNextQuestionId(
                                        currentQuestion.id,
                                        currentQuestion.nextQuestionId,
                                      );
                                      setQId(-1);
                                      setCurrentInput('');
                                      setReload(true);
                                      setRefresh(!refresh);
                                    } else {
                                      skipQuestion(currentQuestion);
                                    }
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: 14,
                                      color: 'black',
                                    }}>
                                    NEXT{' >'}
                                  </Text>
                                </TouchableOpacity>
                              </View>
                            </View>
                          ) : (
                            <></>
                          )}

                          {/* uploading image */}
                          {currentQuestion.type == 4 ? (
                            <View>
                              {imageUrl.map((url, index) => {
                                return (
                                  <View
                                    key={index}
                                    style={{
                                      marginLeft: '5%',
                                      marginRight: '50%',
                                      marginVertical: 10,
                                    }}>
                                    <TouchableOpacity
                                      onPress={() => {
                                        setImage(`file://${imageUrl[index]}`);
                                        setImageVisible(true);
                                        // PhotoEditor.Edit({
                                        //   path: `file://${imageUrl[index]}`,
                                        //   // path: `${imageUrl[index]}`,
                                        //   hiddenControls: ["share", "crop", "text"],
                                        //   colors: ["#ff0000"],
                                        //   onDone: (data) => {
                                        //     let temp = imageUrl
                                        //     temp[index] = data
                                        //     setImageUrl(temp);
                                        //     setRefresh(!refresh);
                                        //   }
                                        // });
                                      }}>
                                      <Image
                                        source={{
                                          uri: `file://${url}`,
                                        }}
                                        resizeMode={'cover'}
                                        style={{
                                          width: 150,
                                          height: 150,
                                          borderRadius: 5,
                                        }}
                                      />
                                    </TouchableOpacity>
                                  </View>
                                );
                              })}

                              <TouchableOpacity
                                style={{
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  marginTop: 10,
                                  borderRadius: 8,
                                  height: 40,
                                  marginRight: '30%',
                                  marginLeft: '5%',
                                  backgroundColor: COLORS.primary + '20',
                                }}
                                onPress={selectImage}>
                                <Text
                                  style={{
                                    opacity: 0.5,
                                    color: COLORS.primary,
                                  }}>
                                  + add image
                                </Text>
                              </TouchableOpacity>

                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  marginVertical: 10,
                                  marginRight: '30%',
                                  marginLeft: '5%',
                                }}>
                                {/* back */}
                                <TouchableOpacity
                                  style={{flex: 1}}
                                  onPress={() => {
                                    backToLastQuestion();
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: 14,
                                      color: 'black',
                                    }}>
                                    {'< '}BACK
                                  </Text>
                                </TouchableOpacity>
                                {/* skip */}
                                <TouchableOpacity
                                  style={{flex: 1, alignItems: 'center'}}
                                  onPress={() => {
                                    skipQuestion(currentQuestion);
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: 14,
                                      color: 'black',
                                    }}>
                                    SKIP
                                  </Text>
                                </TouchableOpacity>
                                {/* next */}
                                <TouchableOpacity
                                  style={{flex: 1, alignItems: 'flex-end'}}
                                  onPress={() => {
                                    if (imageUrl.length > 0) {
                                      addAnswers({
                                        isTrueAnswer: true,
                                        answer: [],
                                        image: imageUrl,
                                        nextQuestionId:
                                          currentQuestion.nextQuestionId,
                                        questionId: currentQuestion.id,
                                      });
                                      setCurrentInput('');
                                      setImageUrl([]);
                                      setReload(true);
                                      setRender(false);
                                      setRefresh(!refresh);
                                    } else {
                                      Alert.alert(
                                        'Hi, nothing was uploaded. if you want to skip this question, press the Skip button please.',
                                      );
                                    }
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: 14,
                                      color: 'black',
                                    }}>
                                    NEXT{' >'}
                                  </Text>
                                </TouchableOpacity>
                              </View>
                            </View>
                          ) : (
                            <></>
                          )}

                          {currentQuestion.type == 5 ? (
                            <View style={{alignItems: 'center', marginTop: 10}}>
                              {contactUsScreen ? (
                                <ScrollView style={{}}>
                                  {/* <Text style={[styles.leftOption]}>
                                    Thank you so much for your participation.
                                    Please be sure we will handle it with the
                                    utmost care and confidentiality.
                                  </Text> */}
                                  <ContactUsScreen></ContactUsScreen>
                                </ScrollView>
                              ) : (
                                <></>
                              )}

                              <View
                                style={{
                                  flexDirection: 'column',
                                  alignItems: 'center',
                                }}>
                                {currentQuestion.id == 2 ? (
                                  <View
                                    style={{
                                      marginTop: 15,
                                      justifyContent: 'center',
                                      borderRadius: 7,
                                      height: 45,
                                      width: 130,
                                      backgroundColor: '#95ec69',
                                    }}>
                                    <TouchableOpacity
                                      onPress={() => {
                                        backToLastQuestion();
                                      }}>
                                      <Text style={[styles.Restart]}>BACK</Text>
                                    </TouchableOpacity>
                                  </View>
                                ) : (
                                  <></>
                                )}

                                <View
                                  style={{
                                    marginTop: 15,
                                    justifyContent: 'center',
                                    // marginRight: 20,
                                    borderRadius: 7,
                                    height: 45,
                                    width: 130,
                                    backgroundColor: '#95ec69',
                                  }}>
                                  <TouchableOpacity
                                    onPress={() => {
                                      navigation.navigate('Home');
                                    }}>
                                    <Text style={[styles.Restart]}>
                                      {' '}
                                      Home Page
                                    </Text>
                                  </TouchableOpacity>
                                </View>

                                <View
                                  style={{
                                    marginTop: 15,
                                    justifyContent: 'center',
                                    borderRadius: 7,
                                    height: 45,
                                    width: 130,
                                    backgroundColor: '#95ec69',
                                  }}>
                                  <TouchableOpacity
                                    onPress={() => {
                                      Alert.alert(
                                        'Restart Donation',
                                        'Are you sure you want to start a new donation?',
                                        [
                                          {
                                            text: 'Confirm',
                                            onPress: () => restartSession(),
                                          },
                                          {text: 'Cancel', style: 'cancel'},
                                        ],
                                      );
                                    }}>
                                    <Text style={[styles.Restart]}>
                                      {' '}
                                      New donation
                                    </Text>
                                  </TouchableOpacity>
                                </View>

                                {donorEmailAddress.includes(
                                  user.email + '**',
                                ) ||
                                (currentQuestion.id != 596 &&
                                  currentQuestion.id != 571) ? (
                                  <></>
                                ) : (
                                  <View
                                    style={{
                                      marginTop: 15,
                                      alignItems: 'center',
                                      marginHorizontal: 20,
                                    }}>
                                    <Text style={[styles.Restart]}>
                                      {' '}
                                      Please press the button below to link to
                                      your Prolific account to complete your
                                      Submission
                                    </Text>

                                    <View
                                      style={{
                                        marginTop: 15,
                                        justifyContent: 'center',
                                        borderRadius: 7,
                                        height: 45,
                                        width: 130,
                                        backgroundColor: '#95ec69',
                                      }}>
                                      <TouchableOpacity
                                        onPress={() => {
                                          if (
                                            donorEmailAddress.includes(
                                              user.email,
                                            )
                                          ) {
                                            Linking.openURL(
                                              prolific_success_link,
                                            );
                                          } else {
                                            Linking.openURL(prolific_fail_link);
                                          }
                                        }}>
                                        <Text style={[styles.Restart]}>
                                          {' '}
                                          Link to Prolific
                                        </Text>
                                      </TouchableOpacity>
                                    </View>
                                  </View>
                                )}
                              </View>
                            </View>
                          ) : (
                            <></>
                          )}

                          {currentQuestion.type == 6 ? (
                            <View>
                              <TouchableOpacity
                                onPress={() => {
                                  Alert.alert(
                                    'Submit Donation',
                                    'Are you sure you want to submit your donation data?',
                                    [
                                      {
                                        text: 'Confirm',
                                        onPress: async () => {
                                          if (
                                            donorEmailAddress.includes(
                                              user.email + '**',
                                            )
                                          ) {
                                          } else if (
                                            donorEmailAddress.includes(
                                              user.email,
                                            ) ||
                                            donorEmailAddress.includes(
                                              user.email + '*',
                                            )
                                          ) {
                                            donorEmailAddress.push(
                                              user.email + '**',
                                            );
                                          } else {
                                            donorEmailAddress.push(user.email);
                                          }
                                          saveDatatoFirebase(
                                            currentQuestion.option[0].option,
                                            sessionId,
                                            user.id,
                                            user.email,
                                            sessionNum,
                                            currentQuestion.option[0]
                                              .nextQuestionId,
                                            '',
                                            donorEmailAddress,
                                          );
                                        },
                                      },
                                      {text: 'Cancel', style: 'cancel'},
                                    ],
                                  );
                                }}>
                                <Text style={[styles.leftOption]}>
                                  {currentQuestion.option[0].option}
                                </Text>
                              </TouchableOpacity>
                            </View>
                          ) : (
                            <></>
                          )}

                          {/* mark on image */}
                          {currentQuestion.type == 7 ? (
                            <View>
                              {answers[index].image.map((url, index1) => {
                                return (
                                  <TouchableOpacity
                                    key={index1}
                                    onPress={() => {
                                      PhotoEditor.Edit({
                                        path: `${url}`,
                                        // path: `/storage/emulated/0/Download/sulthan-auliya-WNDXky02ds4-unsplash.jpg?1691506395948`,
                                        hiddenControls: [
                                          'share',
                                          'crop',
                                          'text',
                                        ],
                                        colors: [
                                          '#ff0000',
                                          '#18d918',
                                          '#000800',
                                          '#f0e007',
                                        ],
                                        onDone: async data => {
                                          try {
                                            let temp = [];
                                            temp = image_answer;
                                            const NewPath =
                                              await PhotoEditorNewPath(data);

                                            temp[index][index1] = `${NewPath}`;
                                            setImage_answer(temp);
                                            setReload(false);
                                            setRefresh(!refresh);
                                            setImageUrl(temp[index]);
                                          } catch (error) {
                                            console.log(error);
                                          }
                                        },
                                      });
                                    }}>
                                    <Image
                                      source={{
                                        uri: `file://${image_answer[index][index1]}`,
                                      }}
                                      resizeMode={'cover'}
                                      style={[styles.leftImage]}
                                    />
                                  </TouchableOpacity>
                                );
                              })}
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  marginVertical: 10,
                                  marginRight: '30%',
                                  marginLeft: '5%',
                                }}>
                                {/* back */}
                                <TouchableOpacity
                                  style={{flex: 1}}
                                  onPress={() => {
                                    backToLastQuestion();
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: 14,
                                      color: 'black',
                                    }}>
                                    {'< '}BACK
                                  </Text>
                                </TouchableOpacity>
                                {/* skip */}
                                <TouchableOpacity
                                  style={{flex: 1, alignItems: 'center'}}
                                  onPress={() => {
                                    skipQuestion(currentQuestion);
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: 14,
                                      color: 'black',
                                    }}>
                                    SKIP
                                  </Text>
                                </TouchableOpacity>
                                {/* next */}
                                <TouchableOpacity
                                  style={{flex: 1, alignItems: 'flex-end'}}
                                  onPress={() => {
                                    if (imageUrl.length > 0) {
                                      addAnswers({
                                        isTrueAnswer: true,
                                        answer: [],
                                        image: imageUrl,
                                        nextQuestionId:
                                          currentQuestion.nextQuestionId,
                                        questionId: currentQuestion.id,
                                      });
                                    } else {
                                      addAnswers({
                                        isTrueAnswer: false,
                                        answer: ['Skip'],
                                        image: [],
                                        nextQuestionId:
                                          currentQuestion.nextQuestionId,
                                        questionId: currentQuestion.id,
                                      });
                                    }
                                    setRender(false);
                                    setCurrentInput('');
                                    setImageUrl([]);
                                    setReload(true);
                                    setRefresh(!refresh);
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: 14,
                                      color: 'black',
                                    }}>
                                    NEXT{' >'}
                                  </Text>
                                </TouchableOpacity>
                              </View>
                            </View>
                          ) : (
                            <></>
                          )}

                          {/* Wellness Check */}
                          {currentQuestion.type == 8 ? (
                            <View>
                              <TouchableOpacity
                                onPress={() => {
                                  navigation.navigate('Help');
                                }}>
                                <Text style={[styles.leftNavigationLink]}>
                                  Need to talk to someone? Head to contact
                                  resources.
                                </Text>
                              </TouchableOpacity>

                              {wellnessCheck ? (
                                // <View
                                //   style={{
                                //     alignItems: 'center',
                                //     justifyContent: 'center',
                                //   }}>
                                <View>
                                  <Text style={[styles.leftMessage]}>
                                    Thank you.
                                  </Text>
                                  <Text style={[styles.leftMessage]}>
                                    If you're not feeling comfortable or ready
                                    to continue, that's completely okay.
                                  </Text>
                                  <Text style={[styles.leftMessage]}>
                                    Your progress will be saved, and you can
                                    come back to the data donation process at a
                                    later time if you're feeling more
                                    comfortable.
                                  </Text>
                                  <Text style={[styles.leftMessage]}>
                                    We want to make sure you're taking care of
                                    yourself first and foremost.
                                  </Text>
                                  <Text style={[styles.leftMessage]}>
                                    If you have any questions about the study,
                                    please contact our Principal Investigator:
                                  </Text>
                                  <ContactUsScreen></ContactUsScreen>
                                  <TouchableOpacity
                                    onPress={() => {
                                      // setWellnessCheck(false);
                                      forceAnswer({
                                        nextQuestionId:
                                          currentQuestion.option[0]
                                            .nextQuestionId,
                                        option:
                                          currentQuestion.option[0].option,
                                      });
                                      setWellnessCheck(false);
                                    }}>
                                    <Text style={[styles.leftOption]}>
                                      I’m willing to continue.
                                    </Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity
                                    onPress={() => {
                                      Alert.alert(
                                        'Comfirm',
                                        'It will delete your data and restart the whole process - are you sure you want to proceed?',
                                        [
                                          {
                                            text: 'Yes',
                                            onPress: () => {
                                              // setWellnessCheck(false);
                                              restartWholeProcess();
                                            },
                                          },
                                          {text: 'Cancel', tyle: 'cancel'},
                                        ],
                                      );
                                    }}>
                                    <Text style={[styles.leftOption]}>
                                      I would like to end this session.
                                    </Text>
                                  </TouchableOpacity>
                                </View>
                              ) : (
                                <View>
                                  <TouchableOpacity
                                    onPress={() => {
                                      forceAnswer({
                                        nextQuestionId:
                                          currentQuestion.option[0]
                                            .nextQuestionId,
                                        option:
                                          currentQuestion.option[0].option,
                                      });
                                    }}>
                                    <Text
                                      key={index}
                                      style={[styles.leftOption]}>
                                      {currentQuestion.option[0].option}
                                    </Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity
                                    onPress={() => {
                                      setWellnessCheck(true);
                                    }}>
                                    <Text
                                      key={index}
                                      style={[styles.leftOption]}>
                                      {currentQuestion.option[1].option}
                                    </Text>
                                  </TouchableOpacity>
                                  {/* <TouchableOpacity
                                    onPress={() => {
                                      navigation.navigate('ContactUs');
                                    }}>
                                    <Text
                                      key={index}
                                      style={{
                                        fontSize: 16,
                                        color: 'black',
                                        padding: 10,
                                        borderRadius: 7,
                                        marginRight: '30%',
                                        marginLeft: '5%',
                                        marginTop: 15,
                                        backgroundColor: '#54b6c7',
                                      }}>
                                      I would like to access support services
                                    </Text>
                                  </TouchableOpacity> */}
                                </View>
                              )}
                            </View>
                          ) : (
                            <></>
                          )}
                          {/* Numeric Input */}
                          {currentQuestion.type == 9 ? (
                            <View>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  marginLeft: '5%',
                                  marginRight: '30%',
                                  marginVertical: 20,
                                }}>
                                {/* back */}
                                <TouchableOpacity
                                  style={{flex: 1}}
                                  onPress={() => {
                                    backToLastQuestion();
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: 14,
                                      color: 'black',
                                    }}>
                                    {'< '}BACK
                                  </Text>
                                </TouchableOpacity>
                                {/* skip */}
                                <TouchableOpacity
                                  style={{flex: 1, alignItems: 'center'}}
                                  onPress={() => {
                                    skipQuestion(currentQuestion);
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: 14,
                                      color: 'black',
                                    }}>
                                    SKIP
                                  </Text>
                                </TouchableOpacity>
                                {/* next */}
                                <TouchableOpacity
                                  style={{flex: 1, alignItems: 'flex-end'}}
                                  onPress={() => {
                                    if (getQId() == currentQuestion.id) {
                                      setNextQuestionId(
                                        currentQuestion.id,
                                        currentQuestion.nextQuestionId,
                                      );
                                      setQId(-1);
                                      setCurrentInput('');
                                      setReload(true);
                                      setRefresh(!refresh);
                                    } else {
                                      skipQuestion(currentQuestion);
                                    }
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: 14,
                                      color: 'black',
                                    }}>
                                    NEXT{' >'}
                                  </Text>
                                </TouchableOpacity>
                              </View>
                            </View>
                          ) : (
                            <></>
                          )}

                          {/* Text Display */}
                          {currentQuestion.type == 10 ? (
                            <View>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  marginLeft: '5%',
                                  marginRight: '30%',
                                  marginVertical: 20,
                                }}>
                                {/* back */}
                                <TouchableOpacity
                                  style={{flex: 1}}
                                  onPress={() => {
                                    backToLastQuestion();
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: 14,
                                      color: 'black',
                                    }}>
                                    {'< '}BACK
                                  </Text>
                                </TouchableOpacity>

                                {/* next */}
                                <TouchableOpacity
                                  style={{flex: 1, alignItems: 'flex-end'}}
                                  onPress={() => {
                                    addAnswers({
                                      isTrueAnswer: true,
                                      answer: [],
                                      image: [],
                                      nextQuestionId: currentQuestion.id,
                                      questionId: currentQuestion.id,
                                    });
                                    setNextQuestionId(
                                      currentQuestion.id,
                                      currentQuestion.nextQuestionId,
                                    );

                                    setCurrentInput('');
                                    setReload(true);
                                    setRefresh(!refresh);
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: 14,
                                      color: 'black',
                                    }}>
                                    NEXT{' >'}
                                  </Text>
                                </TouchableOpacity>
                              </View>
                            </View>
                          ) : (
                            <></>
                          )}

                          {/* bad end */}
                          {currentQuestion.type == 11 ? (
                            <View>
                              <TouchableOpacity
                                onPress={() => {
                                  Alert.alert(
                                    'Submit Donation',
                                    'Are you sure you want to submit your donation data?',
                                    [
                                      {
                                        text: 'Confirm',
                                        onPress: async () => {
                                          if (
                                            donorEmailAddress.includes(
                                              user.email + '**',
                                            )
                                          ) {
                                          } else if (
                                            donorEmailAddress.includes(
                                              user.email,
                                            ) ||
                                            donorEmailAddress.includes(
                                              user.email + '*',
                                            )
                                          ) {
                                            donorEmailAddress.push(
                                              user.email + '**',
                                            );
                                          } else {
                                            donorEmailAddress.push(
                                              user.email + '*',
                                            );
                                          }
                                          saveDatatoFirebase(
                                            currentQuestion.option[0].option,
                                            sessionId,
                                            user.id,
                                            user.email,
                                            sessionNum,
                                            currentQuestion.option[0]
                                              .nextQuestionId,
                                            '',
                                            donorEmailAddress,
                                          );

                                          countSubmittionOfInactUser(user.id);
                                        },
                                      },
                                      {text: 'Cancel', style: 'cancel'},
                                    ],
                                  );
                                }}>
                                <Text style={[styles.leftOption]}>
                                  {currentQuestion.option[0].option}
                                </Text>
                              </TouchableOpacity>

                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  marginVertical: 10,
                                  marginRight: '30%',
                                  marginLeft: '5%',
                                }}>
                                {/* back */}
                                <TouchableOpacity
                                  style={{flex: 1}}
                                  onPress={() => {
                                    backToLastQuestion();
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: 14,
                                      color: 'black',
                                    }}>
                                    {'< '}BACK
                                  </Text>
                                </TouchableOpacity>
                              </View>
                            </View>
                          ) : (
                            <></>
                          )}
                        </View>
                      )}
                    </View>
                  </View>
                ) : (
                  <></>
                )}
              </View>
            )}
          />

          {/* shortcut commend */}
          {shortcut ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                position: 'absolute',
                width: '100%',
                height: '100%',
              }}>
              <View
                style={{flexDirection: 'column', justifyContent: 'flex-end'}}>
                <View
                  style={{
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: 'white',
                    width: 180,
                    height: 180,
                    marginBottom: 60,
                    backgroundColor: '#aed4d9',
                  }}>
                  {/* Skipping question except type 0 , 5, 6 */}
                  <TouchableOpacity
                    onPress={() => {
                      if (
                        currentQuestion.type == 5 ||
                        currentQuestion.type == 6
                      ) {
                        Alert.alert(
                          'Skip',
                          'Skipping this question will end the session - are you sure you want to proceed?',
                          [
                            {
                              text: 'End Session',
                              // onPress: () => restartSession(),
                              onPress: () => setSkip(true),
                            },
                            {text: 'Cancel', tyle: 'cancel'},
                          ],
                        );
                      } else {
                        if (
                          currentQuestion.nextQuestionId.length != 0 &&
                          currentQuestion.nextQuestionId != undefined
                        ) {
                          if (
                            currentQuestion.forceAnswer == undefined ||
                            currentQuestion.forceAnswer == false
                          ) {
                            setCurrentInput('');
                            setImageUrl([]);
                            setCurrentOption();
                            addAnswers({
                              isTrueAnswer: true,
                              answer: ['Skip'],
                              image: [],
                              nextQuestionId: currentQuestion.nextQuestionId,
                              questionId: currentQuestion.id,
                            });
                            setReload(true);
                            setRefresh(!refresh);
                            setShortcut(!shortcut);
                            setSkip(false);
                          } else {
                            Alert.alert(
                              'Skip',
                              'Skipping this question will end the session - are you sure you want to proceed?',
                              [
                                {
                                  text: 'End Session',
                                  // onPress: () => restartSession(),
                                  onPress: () => setSkip(true),
                                },
                                {text: 'Cancel', tyle: 'cancel'},
                              ],
                            );
                            setShortcut(!shortcut);
                          }
                        } else {
                          Alert.alert(
                            'Skip',
                            'Skipping this question will end the session - are you sure you want to proceed?',
                            [
                              {
                                text: 'End Session',
                                // onPress: () => restartSession(),
                                onPress: () => setSkip(true),
                              },
                              {text: 'Cancel', tyle: 'cancel'},
                            ],
                          );
                          setShortcut(!shortcut);
                        }
                      }
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: 'black',
                        marginVertical: 10,
                      }}>
                      SKIP
                    </Text>
                  </TouchableOpacity>

                  {/* back to last question */}
                  <TouchableOpacity
                    onPress={() => {
                      backToLastQuestion();
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: 'black',
                        marginVertical: 10,
                      }}>
                      BACK
                    </Text>
                  </TouchableOpacity>

                  {/* Restart donation process */}
                  <TouchableOpacity
                    onPress={() => {
                      Alert.alert(
                        'Restart Donation',
                        'Are you sure you want to restart this donation session? This will permanently delete all your responses so far and cannot be undone.',
                        [
                          {text: 'Restart', onPress: () => restartSession()},
                          {text: 'Cancel', style: 'cancel'},
                        ],
                      );
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: 'black',
                        marginVertical: 10,
                      }}>
                      RESTART
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ) : (
            <></>
          )}

          {/* enlarge image */}
          <Modal
            animationType={'fade'}
            visible={imageVisible}
            transparent={true}>
            <ImageViewer
              onClick={() => {
                setImage();
                setImageVisible(false);
              }}
              imageUrls={[{url: image}]}
            />
          </Modal>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {/* input bar */}
            {currentQuestion.type != 3 && currentQuestion.type != 9 ? (
              <View style={{height: 45, flex: 9, margin: 10}}></View>
            ) : currentQuestion.type == 3 ? (
              <View style={[styles.inputSearchStyle]}>
                <TextInput
                  value={currentInput}
                  style={{
                    flex: 9,
                    borderRadius: 10,
                    fontSize: 16,
                    color: 'black',
                  }}
                  onChangeText={text => {
                    setCurrentInput(text);
                  }}
                />

                {/* send button */}
                <TouchableOpacity
                  onPress={() => {
                    if (currentInput.length > 0) {
                      if (currentQuestion.type == 3) {
                        if (currentQuestion.id == getQId()) {
                          addAnswersById(currentQuestion.id, currentInput);
                          setCurrentInput('');
                          setReload(true);
                          setRefresh(!refresh);
                        } else {
                          addAnswers({
                            isTrueAnswer: true,
                            answer: [currentInput],
                            image: [],
                            nextQuestionId: currentQuestion.id,
                            questionId: currentQuestion.id,
                          });
                          setQId(currentQuestion.id);
                          setCurrentInput('');
                          setReload(true);
                          setRefresh(!refresh);
                        }
                      } else {
                        addAnswers({
                          isTrueAnswer: false,
                          answer: [currentInput],
                          image: [],
                          nextQuestionId: currentQuestion.id,
                          questionId: '',
                        });
                        setCurrentInput('');
                        setReload(true);
                        setRefresh(!refresh);
                      }
                    }
                  }}>
                  <MaterialIcons
                    style={{color: 'black', flex: 1, marginTop: 4}}
                    name="send"
                    size={30}
                  />
                </TouchableOpacity>
              </View>
            ) : currentQuestion.type == 9 ? (
              <View style={[styles.inputSearchStyle]}>
                <TextInput
                  value={currentInput}
                  keyboardType="numeric"
                  style={{
                    flex: 9,
                    borderRadius: 10,
                    fontSize: 16,
                    color: 'black',
                  }}
                  onChangeText={text => {
                    // Check if the text is not '0'
                    if (text !== '0') {
                      setCurrentInput(text);
                    }
                  }}
                />

                {/* send button */}
                <TouchableOpacity
                  onPress={() => {
                    if (currentInput.length > 0) {
                      if (currentQuestion.type == 3) {
                        if (currentQuestion.id == getQId()) {
                          addAnswersById(currentQuestion.id, currentInput);
                          setCurrentInput('');
                          setReload(true);
                          setRefresh(!refresh);
                        } else {
                          addAnswers({
                            isTrueAnswer: true,
                            answer: [currentInput],
                            image: [],
                            nextQuestionId: currentQuestion.id,
                            questionId: currentQuestion.id,
                          });
                          setQId(currentQuestion.id);
                          setCurrentInput('');
                          setReload(true);
                          setRefresh(!refresh);
                        }
                      } else if (currentQuestion.type == 9) {
                        if (currentQuestion.id == getQId()) {
                          updateNumericAnswers(
                            currentQuestion.id,
                            currentInput,
                          );
                          setCurrentInput('');
                          setReload(true);
                          setRefresh(!refresh);
                        } else {
                          addAnswers({
                            isTrueAnswer: true,
                            answer: [currentInput],
                            image: [],
                            nextQuestionId: currentQuestion.id,
                            questionId: currentQuestion.id,
                          });
                          setQId(currentQuestion.id);
                          setCurrentInput('');
                          setReload(true);
                          setRefresh(!refresh);
                        }
                      } else {
                        addAnswers({
                          isTrueAnswer: false,
                          answer: [currentInput],
                          image: [],
                          nextQuestionId: currentQuestion.id,
                          questionId: '',
                        });
                        setCurrentInput('');
                        setReload(true);
                        setRefresh(!refresh);
                      }
                    }
                  }}>
                  <MaterialIcons
                    style={{color: 'black', flex: 1, marginTop: 4}}
                    name="send"
                    size={30}
                  />
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        </SafeAreaView>
      </View>
    )
  ) : null;
};

const styles = StyleSheet.create({
  skipNext: {
    fontSize: 16,
    color: 'black',
  },
  Restart: {
    // backgroundColor:'#95ec69',
    textAlign: 'center',
    fontSize: 18,
    color: 'black',
  },
  text: {
    color: '#161924',
    fontSize: 20,
    fontWeight: '500',
  },
  inputSearchStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.3,
    height: 45,
    borderColor: 'gray',
    borderRadius: 10,
    flex: 9,
    margin: 10,
  },
  leftMessage: {
    fontSize: 14,
    color: 'black',
    padding: 10,
    borderRadius: 7,
    marginRight: '30%',
    marginLeft: '5%',
    marginTop: 15,
    backgroundColor: 'white',
  },
  leftNote: {
    fontSize: 14,
    color: '#3a3b3a',
    marginRight: '30%',
    marginLeft: '5%',
    paddingTop: 10,
    paddingHorizontal: 10,
    fontStyle: 'italic',
  },
  leftNavigationLink: {
    fontSize: 14,
    color: '#347aeb',
    marginRight: '30%',
    marginLeft: '5%',
    paddingTop: 10,
    paddingHorizontal: 10,
    fontStyle: 'italic',
    textDecorationLine: 'underline',
  },
  rightImage: {
    marginLeft: '50%',
    // marginRight: '3%',
    borderRadius: 7,
    width: 150,
    height: 150,
    marginVertical: 10,
  },
  leftImage: {
    marginRight: '50%',
    marginLeft: '5%',
    borderRadius: 7,
    width: 150,
    height: 150,
    marginVertical: 10,
  },
  rightMessage: {
    fontSize: 14,
    color: 'black',
    padding: 10,
    borderRadius: 7,
    marginTop: 15,
    marginLeft: '35%',
    marginRight: '5%',
    backgroundColor: '#95ec69',
  },
  leftOption: {
    fontSize: 14,
    color: 'black',
    padding: 10,
    borderRadius: 7,
    marginRight: '30%',
    marginLeft: '5%',
    marginTop: 15,
    backgroundColor: '#aed4d9',
  },
  leftMCOption: {
    borderBottomWidth: 1,
    marginRight: '30%',
    marginLeft: '5%',
  },
  dropdown: {
    // marginRight: '42%',
    // marginLeft: '5%',
    height: 40,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 7,
    marginVertical: 10,
  },
  placeholderStyle: {
    fontSize: 14,
    color: 'black',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  sessionButton: {
    paddingVertical: 16,
    paddingHorizontal: 30,
    backgroundColor: '#aed4d9',
    borderRadius: 24,
    color: '#161924',
    fontSize: 20,
    fontWeight: '400',
  },
  bottomShortcutStyle: {
    flexDirection: 'row',
    marginRight: '30%',
    marginLeft: '5%',
    marginTop: 15,
  },
});

export default DonationScreen;
