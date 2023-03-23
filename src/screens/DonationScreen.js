import React, { useEffect, useState } from 'react';
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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getUserInfoByEmail, getAllQuestions } from '../utils/database';
import auth from '@react-native-firebase/auth';
import { getAnswer, getIndex, indexIncrement, addAnswers } from '../views/Global';
import ImageViewer from 'react-native-image-zoom-viewer';

const DonationScreen = () => {
  const [render, setRender] = useState(false);
  const [user, setUser] = useState();
  const [questions, setQuestions] = useState();
  const [answers, setAnswers] = useState();
  const [imageVisible, setImageVisible] = useState(false);
  const [image, setImage] = useState(false);
  const [currentInput, setCurrentInput] = useState();
  const [currentQuestion, setCurrentQuestion] = useState();
  const [refresh, setRefresh] = useState(false);
  const [currentOption, setCurrentOption] = useState();
  const [mico, setMico] = useState(false);


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
      setQuestions(allQuestions);
      let allAnswers = getAnswer();
      let qId = Number(allAnswers[allAnswers.length - 1].nextQuestionId);
      setCurrentQuestion(allQuestions[qId]);
      // console.log(allQuestions[qId]);
      setAnswers(allAnswers);
      setRender(true);
    } catch (error) {
      Alert.alert(error);
    }
  };

  const loadingQna = () => {
    // let answers = getAnswer();
    // let index = getIndex();
    // let questions = []
    // questions = await getAllQuestion()
    // console.log(typeof(questions))
    // if (index == 0 && answers.length == 0) {
    //   return <ScrollView>

    //   </ScrollView>
    //   // <FlatList
    //   // data={answers}>

    //   // </FlatList>
    // }

    return (
      <ScrollView>
        <Text>1</Text>
      </ScrollView>
    );
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [refresh]);

  return render ? (
    <SafeAreaView
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f2f5f8',
        height: '100%',
      }}>

      <FlatList
        data={answers}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View>
            {/* check if the answer is the true answer */}
            {item.questionId.length > 0 ? <Text style={[styles.leftMessage]}>{questions[item.questionId].description}</Text> : <></>}

            {/* check if the answer has image */}
            {item.image.length > 0 ? <TouchableOpacity
              onPress={() => {
                setImage(item.image);
                setImageVisible(true);
              }}>
              <Image
                source={{
                  uri: item.image,
                }}
                resizeMode={'contain'}
                style={[styles.rightImage]}
              />
            </TouchableOpacity> : <></>}

            {/* check if the user input several answers to a question*/}
            {item.answer.length > 1 ?
              (item.answer.map((answer, index) => {
                return (
                  <Text key={index} style={[styles.rightMessage]}>{answer} </Text>
                );
              })) :
              <Text style={[styles.rightMessage]}>{item.answer[0]}</Text>}

            {/* check is it the current question */}
            {index == answers.length - 1 ? <View>
              <Text style={[styles.leftMessage]}> {currentQuestion.description}</Text>
              {currentQuestion.type == 0 ? currentQuestion.option.map((item, index) => {
                return (
                  <TouchableOpacity key={index} onPress={() => {
                    addAnswers({ isTrueAnswer: true, answer: [item.option], image: "", nextQuestionId: item.nextQuestionId, questionId: currentQuestion.id });
                    setRefresh(!refresh);
                  }}>
                    <Text key={index} style={[styles.leftOption]}> {item.option} </Text>
                  </TouchableOpacity>
                );
              }) : <></>}

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
                      }} key={index} > {item} </Text> : <Text style={{
                        fontSize: 16,
                        width: '100%',
                        marginVertical: 2,
                        color: 'black',
                        padding: 8,
                        borderRadius: 7,
                        backgroundColor: '#aed4d9',
                      }} key={index} > {item} </Text>}
                    </TouchableOpacity>
                  );
                })}
                <View style={{
                  flexDirection: 'row', alignItems: 'center', margin: 10
                }}>
                  <View style={{ flex: 1, }}>
                    <TouchableOpacity>
                      <Text style={{ fontSize: 18 }}>Skip</Text>
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
                          addAnswers({ isTrueAnswer: true, answer: [answer], image: "", nextQuestionId: currentQuestion.nextQuestionId, questionId: currentQuestion.id });
                          setCurrentOption();
                          setRefresh(!refresh);
                        } else {
                          Alert.alert("Please select the option!")
                        }
                      } else {
                        Alert.alert("Please select the option!")
                      }

                    }}>
                      <Text style={{ fontSize: 18 }}>Next</Text>
                    </TouchableOpacity>

                  </View>
                </View>

              </View> : <></>}

              {/* check is it the input text question */}
              {/* {currentQuestion.type != 3 ? <Text style={[styles.leftOption]}> option</Text> : <></>} */}
            </View> : <></>}
          </View>
        )}
      />


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

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>

        {/* microphone input */}
        <TouchableOpacity
          onPress={() => {
          }}
        >
          <MaterialIcons
            style={{ color: 'black', flex: 1, marginLeft: 5, marginTop: 4 }}
            name="mic"
            size={30}
          />
        </TouchableOpacity>

        {/* input bar */}
        <View style={[styles.inputSearchStyle]}>
          <TextInput value = {currentInput} style={{
            flex: 9,
            // borderColor: 'red',
            borderRadius: 10,
            // borderWidth: 0.7,
            fontSize: 18,
          }} onChangeText={text => {
            setCurrentInput(text);
          }} />

          {/* send button */}
          <TouchableOpacity onPress={() => {
            if (currentQuestion.type == 3) {
              if (currentInput.length > 0) {
                setCurrentInput();
                addAnswers({ isTrueAnswer: false, answer: [currentInput], image: "", nextQuestionId: currentQuestion.nextQuestionId, questionId: currentQuestion.id });
                setRefresh(!refresh);
              }
            } else {
              if (currentInput.length > 0) {
                setCurrentInput();
                addAnswers({ isTrueAnswer: false, answer: [currentInput], image: "", nextQuestionId: currentQuestion.id, questionId: "" });
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
        <TouchableOpacity>
          <MaterialIcons
            style={{ color: 'black', flex: 1, marginRight: 5, marginTop: 4 }}
            name="notes"
            size={30}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  ) : null;
};

const styles = StyleSheet.create({
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
  },
  leftMessage: {
    fontSize: 16,
    color: 'black',
    padding: 10,
    borderRadius: 7,
    marginRight: '40%',
    marginLeft: '3%',
    marginTop: 15,
    backgroundColor: 'white',
  },
  // rightImage: {
  //   // width: '100%',
  //   height: 150,
  //   marginVertical: -10,
  //   // margin: '5%',
  //   borderRadius: 5,
  // },
  rightImage: {
    marginLeft: '45%',
    marginRight: 15,
    padding: 10,
    borderRadius: 7,
    height: 150,
    marginTop: 15,
    marginBottom: -15,
    borderRadius: 5,
  },
  rightMessage: {
    fontSize: 16,
    color: 'black',
    padding: 10,
    borderRadius: 7,
    marginTop: 15,
    marginLeft: '45%',
    marginRight: '3%',
    backgroundColor: '#95ec69',
  },
  leftOption: {
    fontSize: 16,
    color: 'black',
    padding: 10,
    borderRadius: 7,
    marginRight: 150,
    marginLeft: 45,
    marginTop: 15,
    backgroundColor: '#aed4d9',
  },
  leftMCOption: {
    // fontSize:16,
    padding: 10,
    borderBottomWidth: 1,
    marginRight: '42%',
    marginLeft: '5%',
  }
});

export default DonationScreen;
