import React, { useEffect, useState, useRef } from 'react';
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
} from 'react-native';
import moment from 'moment';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getUserInfoByEmail, getAllQuestions } from '../utils/database';
import auth from '@react-native-firebase/auth';
import { Dropdown } from 'react-native-element-dropdown';
import { getAnswer, saveData, addAnswers, removeAll, setQId, getQId, addAnswersById, setNextQuestionId, removeLastQuestion, skipQuestionsById } from '../views/Global';
import ImageViewer from 'react-native-image-zoom-viewer';
import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';
import { COLORS } from '../constants/theme';
// import { launchImageLibrary } from 'react-native-image-picker';
import PhotoEditor from 'react-native-photo-editor'
import firestore from '@react-native-firebase/firestore';



const DonationScreen = () => {
  const [render, setRender] = useState(false);
  const [user, setUser] = useState();
  const [questions, setQuestions] = useState();
  const [answers, setAnswers] = useState();
  const [imageVisible, setImageVisible] = useState(false);
  const [image, setImage] = useState(false);
  const [currentInput, setCurrentInput] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState();
  const [refresh, setRefresh] = useState(false);
  const [currentOption, setCurrentOption] = useState();
  const [mico, setMico] = useState(false);
  const [shortcut, setShortcut] = useState(false);
  const [imageUrl, setImageUrl] = useState([]);
  const [sessionId, setSessionId] = useState()
  const [sessionNum, setSessionNum] = useState()

  const flatListRef = useRef();

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
      // let temp = allQuestions.map((element) => {
      //   return element.date;
      // })
      // setAllSession(temp)
      if (allQuestions != null) {
        setSessionId(allQuestions.id)
        setSessionNum(allQuestions.session)
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
      }

      // console.log(allQuestions[qId]);
      setRender(true);
    } catch (error) {
      Alert.alert(error);
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [refresh]);

  const selectImage = async () => {
    try {
      const response = await MultipleImagePicker.openPicker({ mediaType: 'image' });
      let temp = [];
      for (let i = 0; i < response.length; i++) {
        // const element = response[i].path;
        const element = response[i].realPath;
        temp.push(element)
      }
      setImageUrl(temp)
    } catch (error) {
      console.log(error);
    }
  };

  const restartSession = () => {
    setCurrentInput("");
    setCurrentOption();
    removeAll();
    addAnswers({ isTrueAnswer: false, answer: [], image: [], nextQuestionId: '1', questionId: '0' })
    setRefresh(!refresh);
    if (shortcut)
      setShortcut(!shortcut);
  }

  const forceAnswer = (item) => {
    if (currentQuestion.nextQuestionId == undefined || currentQuestion.nextQuestionId.length == 0) {
      setCurrentInput("");
      addAnswers({ isTrueAnswer: true, answer: [item.option], image: [], nextQuestionId: item.nextQuestionId, questionId: currentQuestion.id });
      setRefresh(!refresh);
    } else {
      setCurrentInput("");
      addAnswers({ isTrueAnswer: true, answer: [item.option], image: [], nextQuestionId: currentQuestion.nextQuestionId, questionId: currentQuestion.id });
      setRefresh(!refresh);
    }
  }

  const restartWholeProcess = () => {
    setRender(false);
    setCurrentInput("");
    setCurrentOption();
    removeAll();
    addAnswers({ isTrueAnswer: false, answer: [], image: [], nextQuestionId: '1', questionId: '0' })
    setRefresh(!refresh);
    if (shortcut)
      setShortcut(!shortcut);
  }

  const saveDatatoFirebase = (sessionId, userId, userEmail, sessionNum) => {
    try {
      saveData(sessionId, userId, userEmail, sessionNum);
    } catch (error) {
      console.log(error);
    }
  }

  return render ? (sessionId == null || sessionId == undefined ? <View>
    <Text>Thank you for submission. Your next donation session will open in one week on XX/XX/XXXX.</Text>
  </View> :
    <View>
      <SafeAreaView
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#f2f5f8',
          height: '100%',
        }}>
        <FlatList
          ref={flatListRef}
          data={answers}
          onContentSizeChange={() => flatListRef.current.scrollToEnd()}
          showsVerticalScrollIndicator={true}
          renderItem={({ item, index }) => (
            <View>
              {item.questionId > 0 ? questions[item.questionId].description.map((description, index) => {
                return (<Text key={index} style={[styles.leftMessage]}> {description}</Text>)
              }) : <></>}

              {/* check if the answer has image */}
              <View >
                {item.image.length > 0 ? item.image.map((url, index) => {
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
                          resizeMode={'contain'}
                          style={[styles.rightImage]}
                        />
                      </TouchableOpacity>
                    </View>

                  )
                }) : <></>}
              </View>


              {/* check if the user input several answers to a question*/}
              {item.answer.length > 0 ?
                (item.answer.map((answer, index) => {
                  return (
                    <Text key={index} style={[styles.rightMessage]}>{answer} </Text>
                  );
                })) : <></>}

              {/* check is it the current question */}
              {index == answers.length - 1 ? <View>
                {/* type next question description */}
                {currentQuestion.description.map((description, index) => {
                  if (getQId() == currentQuestion.id)
                    return;
                  else
                    return (<Text key={index} style={[styles.leftMessage]}> {description}</Text>)
                })}

                {/* multiple choice question */}
                {currentQuestion.type == 0 ? currentQuestion.option.map((item, index) => {
                  return (
                    <TouchableOpacity key={index} onPress={() => {
                      forceAnswer(item);
                    }}>
                      <Text key={index} style={[styles.leftOption]}> {item.option} </Text>
                    </TouchableOpacity>
                  )
                }) : <></>}

                {/* multiple answers */}
                {currentQuestion.type == 1 ? <View style={[styles.leftMCOption]}>
                  <Text style={{ marginLeft: '3%', fontSize: 14, fontStyle: 'italic' }}>Please select all that apply:</Text>
                  {currentQuestion.option.map((item, index) => {
                    return (
                      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} key={index} onPress={() => {
                        if (currentOption == null || currentOption.length == 0) {
                          let temp = new Array(currentQuestion.option.length).fill("");
                          temp[index] = item;
                          setCurrentOption(temp);
                        } else {
                          let temp = currentOption
                          if (temp[index].length > 0) {
                            temp[index] = "";
                            setCurrentOption(temp);
                          } else {
                            temp[index] = item;
                            setCurrentOption(temp);
                          }
                        }
                        setRefresh(!refresh);
                      }}>
                        {currentOption != null && currentOption[index].length > 0 ? <Text style={{
                          fontSize: 16,
                          width: '100%',
                          marginVertical: 2,
                          color: 'black',
                          padding: 8,
                          borderRadius: 7,
                          backgroundColor: '#c7ddff',
                        }} key={index} >{index + 1}. {item}</Text> : <Text style={{
                          fontSize: 16,
                          width: '100%',
                          marginVertical: 2,
                          color: 'black',
                          padding: 8,
                          borderRadius: 7,
                          backgroundColor: '#aed4d9',
                        }} key={index} >{index + 1}. {item}</Text>}
                      </TouchableOpacity>
                    );
                  })}
                  <View style={{
                    flexDirection: 'row', alignItems: 'center', margin: 10
                  }}>
                    <View style={{ flex: 1, }}>
                      <TouchableOpacity onPress={() => {
                        addAnswers({ isTrueAnswer: true, answer: ["Skip"], image: [], nextQuestionId: currentQuestion.nextQuestionId, questionId: currentQuestion.id });
                        setCurrentOption();
                        setCurrentInput("");
                        setRefresh(!refresh);
                      }}>
                        <Text style={styles.skipNext}>Skip</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                      <TouchableOpacity onPress={() => {
                        if (currentOption != null) {
                          let answer = "";
                          for (let i = 0; i < currentOption.length; i++) {
                            if (currentOption[i].length > 0) {
                              if (answer.length > 0) answer = answer + "," + currentOption[i];
                              else answer = currentOption[i]
                            }
                          }
                          if (answer.length > 0) {
                            addAnswers({ isTrueAnswer: true, answer: [answer], image: [], nextQuestionId: currentQuestion.nextQuestionId, questionId: currentQuestion.id });
                            setCurrentOption();
                            setCurrentInput("");
                            setRefresh(!refresh);
                          } else {
                            Alert.alert("Please select the option!")
                          }
                        } else {
                          Alert.alert("Please select the option!")
                        }

                      }}>
                        <Text style={styles.skipNext}>Next</Text>
                      </TouchableOpacity>

                    </View>
                  </View>

                </View> : <></>}

                {/* drop down */}
                {currentQuestion.type == 2 ? <View style={[styles.leftMCOption]}>
                  <Dropdown style={[styles.dropdown]}
                    placeholderStyle={[styles.placeholderStyle]}
                    selectedTextStyle={[styles.selectedTextStyle]}
                    itemTextStyle={{color: 'black'}}
                    iconStyle={[styles.iconStyle]}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    value={currentOption}
                    data={currentQuestion.option.map((element, index) => ({ label: `${element}`, value: `${index}` }))}
                    onChange={item => {
                      setCurrentOption(item.value);
                    }}
                  />
                  <View style={{
                    flexDirection: 'row', alignItems: 'center', margin: 10
                  }}>
                    <View style={{ flex: 1, }}>
                      <TouchableOpacity onPress={() => {
                        addAnswers({ isTrueAnswer: true, answer: ["Skip"], image: [], nextQuestionId: currentQuestion.nextQuestionId, questionId: currentQuestion.id });
                        setCurrentOption();
                        setCurrentInput("");
                        setRefresh(!refresh);
                      }}>
                        <Text style={styles.skipNext}>Skip</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                      <TouchableOpacity onPress={() => {
                        if (currentOption != null) {
                          addAnswers({ isTrueAnswer: true, answer: [currentQuestion.option[currentOption]], image: [], nextQuestionId: currentQuestion.nextQuestionId, questionId: currentQuestion.id });
                          setCurrentOption();
                          setCurrentInput("");
                          setRefresh(!refresh);
                        } else {
                          Alert.alert("Please select the option!")
                        }

                      }}>
                        <Text style={styles.skipNext}>Next</Text>
                      </TouchableOpacity>

                    </View>
                  </View>
                </View> : <></>}

                {/* textInput */}
                {currentQuestion.type == 3 ? <View>
                  <View style={{
                    flexDirection: 'row', alignItems: 'center', marginLeft: '5%', marginRight: '30%', marginVertical: 20,
                  }}>
                    <View style={{ flex: 1, }}>
                      <TouchableOpacity onPress={() => {
                        skipQuestionsById(currentQuestion.id, currentQuestion.nextQuestionId)
                        setCurrentInput("");
                        setQId(-1);
                        setRefresh(!refresh);
                      }}>
                        <Text style={styles.skipNext}>Skip</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                      <TouchableOpacity onPress={() => {
                        if (getQId() == currentQuestion.id) {
                          setNextQuestionId(currentQuestion.id, currentQuestion.nextQuestionId)
                          setQId(-1);
                          setCurrentInput("");
                          setRefresh(!refresh);
                        } else {
                          Alert.alert("Please answer the question!")
                        }

                      }}>
                        <Text style={styles.skipNext}>Next</Text>
                      </TouchableOpacity>

                    </View>
                  </View>
                </View> : <></>}

                {/* uploading image */}
                {currentQuestion.type == 4 ? <View>
                  {imageUrl.map((url, index) => {
                    return (
                      <View key={index} style={{ marginLeft: '5%', marginRight: '30%', marginVertical: 20, }}>
                        <TouchableOpacity onPress={() => {
                          // setImage(url);
                          // setImageVisible(true);
                          PhotoEditor.Edit({
                            path: imageUrl[index],
                            hiddenControls: ["share", "crop", "text"],
                            colors: ["#ff0000"],
                            onDone: (data) => {
                              let temp = imageUrl
                              temp[index] = data
                              setImageUrl(temp);
                              setRefresh(!refresh);
                            }
                          });
                        }}>
                          <Image
                            source={{
                              uri: `file://${url}`,
                            }}
                            resizeMode={'cover'}
                            style={{
                              width: 200,
                              height: 200,
                              borderRadius: 5,
                            }} />
                        </TouchableOpacity>
                      </View>
                    )
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

                    <Text style={{ opacity: 0.5, color: COLORS.primary }}>
                      + add image
                    </Text>
                  </TouchableOpacity>

                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 10,
                    marginRight: '30%',
                    marginLeft: '5%',
                  }}>
                    <View style={{ flex: 1, }}>
                      <TouchableOpacity onPress={() => {
                        skipQuestionsById(currentQuestion.id, currentQuestion.nextQuestionId)
                        setCurrentInput("");
                        setImageUrl([]);
                        setRefresh(!refresh);
                      }}>
                        <Text style={styles.skipNext}>Skip</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                      <TouchableOpacity onPress={() => {
                        addAnswers({ isTrueAnswer: true, answer: [], image: imageUrl, nextQuestionId: currentQuestion.nextQuestionId, questionId: currentQuestion.id });
                        setCurrentInput("");
                        setImageUrl([]);
                        setRefresh(!refresh);
                      }}>
                        <Text style={styles.skipNext}>Next</Text>
                      </TouchableOpacity>

                    </View>
                  </View>

                </View> : <></>}

                {currentQuestion.type == 5 ? <View style={{ alignItems: 'center', marginTop: 10 }}>
                  <View style={{ justifyContent: 'center', borderRadius: 7, height: 40, width: 110, backgroundColor: '#95ec69', }}>
                    <TouchableOpacity onPress={() => {
                      Alert.alert('Restart Donation', 'Are you sure you want to restart this donation session? This will permanently delete all your responses so far and cannot be undone.', [
                        { text: 'Restart', onPress: () => restartSession() },
                        { text: 'Cancel', style: 'cancel' }
                      ])
                    }}>
                      <Text style={[styles.Restart]}> RESTART</Text>
                    </TouchableOpacity>
                  </View>
                </View> : <></>}

                {currentQuestion.type == 6 ? <View>
                  <TouchableOpacity onPress={() => saveDatatoFirebase(sessionId, user.id, user.email, sessionNum)}>
                    <Text style={[styles.leftOption]}>{currentQuestion.option[0].option}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {
                    removeAll();
                    addAnswers({ isTrueAnswer: false, answer: [], image: [], nextQuestionId: currentQuestion.option[1].nextQuestionId, questionId: '' })
                    setCurrentInput("");
                    setRefresh(!refresh);
                  }}>
                    <Text style={[styles.leftOption]}>{currentQuestion.option[1].option}</Text>
                  </TouchableOpacity>
                </View> : <></>}
                {/* check is it the input text question */}
                {/* {currentQuestion.type != 3 ? <Text style={[styles.leftOption]}> option</Text> : <></>} */}
              </View> : <></>}

            </View>
          )}
        />

        {/* shortcut commend */}
        {shortcut ? <View style={{ flexDirection: 'row', justifyContent: 'flex-end', position: 'absolute', width: "100%", height: "100%" }}>
          <View style={{ flexDirection: 'column', justifyContent: 'flex-end' }}>
            <View style={{ borderRadius: 7, borderWidth: 1, borderColor: 'white', width: 180, height: 200, marginBottom: 45, backgroundColor: 'white' }}>

              {/* Skipping question except type 0 , 5, 6 */}
              <TouchableOpacity onPress={() => {
                if (currentQuestion.type == 5 || currentQuestion.type == 6) {
                  Alert.alert('Skip', 'Sorry, this question CANNOT be skipped. The response is necessary to proceed. Thank you.', [
                    { text: 'Cancel', tyle: 'cancel' }
                  ]);
                } else {
                  if (currentQuestion.nextQuestionId.length != 0 && currentQuestion.nextQuestionId != undefined) {
                    setCurrentInput("");
                    setCurrentOption();
                    addAnswers({ isTrueAnswer: true, answer: ["Skip"], image: [], nextQuestionId: currentQuestion.nextQuestionId, questionId: currentQuestion.id })
                    setRefresh(!refresh);
                    setShortcut(!shortcut);
                  } else {
                    Alert.alert('Skip', 'Sorry, this question CANNOT be skipped. The response is necessary to proceed. Thank you.', [
                      { text: 'Cancel', tyle: 'cancel' }
                    ]);
                  }
                }
              }}>
                <Text style={{ fontSize: 20, color: 'black', marginVertical: 10 }}>SKIP</Text>
              </TouchableOpacity>

              {/* back to last question */}
              <TouchableOpacity onPress={() => {
                removeLastQuestion();
                setCurrentInput("");
                setCurrentOption();
                setRefresh(!refresh);
                setShortcut(!shortcut);
              }}>
                <Text style={{ fontSize: 20, color: 'black', marginVertical: 10 }}>BACK</Text>
              </TouchableOpacity>

              {/* Restart donation process */}
              <TouchableOpacity onPress={() => {
                Alert.alert('Restart Donation', 'Are you sure you want to restart this donation session? This will permanently delete all your responses so far and cannot be undone.', [
                  { text: 'Restart', onPress: () => restartSession() },
                  { text: 'Cancel', style: 'cancel' }
                ])
              }}>
                <Text style={{ fontSize: 20, color: 'black', marginVertical: 10 }}>RESTART</Text>
              </TouchableOpacity>

            </View>
          </View>

        </View> : <></>}


        {/* enlarge image */}
        <Modal animationType={'fade'} visible={imageVisible} transparent={true}>
          <ImageViewer
            onClick={() => {
              setImage();
              setImageVisible(false);
            }}
            imageUrls={[{ url: image }]}
          />
        </Modal>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>

          {/* microphone input */}
          <TouchableOpacity
            onPress={() => {
            }}>
            <MaterialIcons
              style={{ color: 'black', flex: 1, marginLeft: 5, marginTop: 4 }}
              name="mic"
              size={30}
            />
          </TouchableOpacity>

          {/* input bar */}
          <View style={[styles.inputSearchStyle]}>
            <TextInput value={currentInput} style={{
              flex: 9,
              borderRadius: 10,
              fontSize: 18,
            }} onChangeText={text => {
              setCurrentInput(text);
            }} />

            {/* send button */}
            <TouchableOpacity onPress={() => {
              if (currentInput.length > 0) {
                if (currentQuestion.type == 3) {
                  if (currentQuestion.id == getQId()) {
                    addAnswersById(currentQuestion.id, currentInput);
                    setCurrentInput("");
                    setRefresh(!refresh);
                  } else {
                    addAnswers({ isTrueAnswer: true, answer: [currentInput], image: [], nextQuestionId: currentQuestion.id, questionId: currentQuestion.id });
                    setQId(currentQuestion.id)
                    setCurrentInput("");
                    setRefresh(!refresh);
                  }
                } else {
                  addAnswers({ isTrueAnswer: false, answer: [currentInput], image: [], nextQuestionId: currentQuestion.id, questionId: "" });
                  setCurrentInput("");
                  setRefresh(!refresh)
                }
              }
            }}>
              <MaterialIcons
                style={{ color: 'black', flex: 1, marginTop: 4 }}
                name="send"
                size={30}
              />
            </TouchableOpacity>
          </View>

          {/* hambuger button */}
          <TouchableOpacity onPress={() => {
            setShortcut(!shortcut);
          }}>
            <MaterialIcons
              style={{ color: 'black', flex: 1, marginRight: 5, marginTop: 4 }}
              name="notes"
              size={30}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  skipNext: {
    fontSize: 18,
    color: 'black'
  },
  Restart: {
    textAlign: 'center',
    fontSize: 18,
    color: 'black',
  },
  text: {
    color: '#161924',
    fontSize: 22,
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
    marginLeft: '35%',
    marginRight: '3%',
    borderRadius: 7,
    width: 200,
    height: 200,
    marginVertical: 10,
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
  leftMCOption: {
    // fontSize:16,
    padding: 10,
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
    marginVertical: 10
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'black',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black'
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
});

export default DonationScreen;
