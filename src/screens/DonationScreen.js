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
      {/* <ScrollView > */}
      {/* <Text>{listener}</Text> */}
      {/* </ScrollView> */}

      <FlatList
        data={answers}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View>
            {/* check if the answer is the true answer */}
            {item.questionId.length>0 ? <Text style={[styles.leftMessage]}>{questions[item.questionId].description}</Text> : <></>}

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
              {/* check is it the input text question */}
              {currentQuestion.type != 3 ? <Text style={[styles.leftOption]}> option</Text> :<></>}
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
          <TextInput style={{
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

            } else {
              setRefresh(!refresh)
              addAnswers({isTrueAnswer: false, answer: [currentInput], image:"",nextQuestionId: currentQuestion.id, questionId:""});
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
    // marginVertical: 60,
    // marginBottom: 20,
    borderColor: 'gray',
    borderRadius: 10,
    // borderWidth: 0.7,
    // fontSize: 16,
    flex: 9,
  },
  leftMessage: {
    color: 'black',
    padding: 10,
    borderRadius: 7,
    marginRight: '40%',
    marginLeft: 15,
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
    color: 'black',
    padding: 10,
    borderRadius: 7,
    marginTop: 15,
    marginLeft: '45%',
    marginRight: 15,
    backgroundColor: '#95ec69',
  },
  leftOption: {
    color: 'black',
    padding: 10,
    borderRadius: 7,
    marginRight: 150,
    marginLeft: 15,
    marginTop: 15,
    backgroundColor: '#0CD1CA',
  },
});

export default DonationScreen;
