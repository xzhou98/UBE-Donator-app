import React, { useEffect, useState } from 'react'
import { Text, Image, View, Modal, FlatList, StyleSheet, TextInput, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getUserInfoByEmail, getAllQuestions } from '../utils/database';
import auth from "@react-native-firebase/auth";
// import { getAnswer, getIndex, indexIncrement, addAnswers, getAllQuestion, questions } from '../views/Global'
import { getAnswer, getIndex, indexIncrement, addAnswers, } from '../views/Global'
import ImageViewer from 'react-native-image-zoom-viewer';
// import ImageZoom from 'react-native-image-pan-zoom';


const DonationScreen = () => {
  const [render, setRender] = useState(false);
  const [user, setUser] = useState();
  const [questions, setQuestions] = useState();
  const [index, setIndex] = useState(1);
  const [answers, setAnswers] = useState();
  const [imageVisible, setImageVisible] = useState(false);
  const [image, setImage] = useState(false);
  // const [view, setView] = useState();

  /**
   * get user info by user email that got from firebase Auth
   * 
   * @param {*} user 
   */
  const onAuthStateChanged = async (user) => {
    try {
      let userInfo = await getUserInfoByEmail(user.email)
      setUser(userInfo);

      let allQuestions = await getAllQuestions();
      setQuestions(allQuestions);
      setAnswers(getAnswer())
      setRender(true)
    } catch (error) {
      Alert.alert(error)
    }
  }

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

    return <ScrollView><Text>1</Text></ScrollView>


  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    setIndex(2)
    // setView(loadingQna());
    return subscriber; // unsubscribe on unmount
  }, []);


  const images = [{
    // Simplest usage.
    url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',

    // width: number
    // height: number
    // Optional, if you know the image size, you can set the optimization performance

    // You can pass props to <Image />.
    props: {
      // headers: ...
    }
  }]
  return render ?
    <SafeAreaView style={{ position: 'relative', display: 'flex', flexDirection: 'column', backgroundColor: '#f2f5f8', height: '100%', }}>
      {/* <ScrollView >
        <Text>{image}</Text>
      </ScrollView> */}

      <FlatList
        data={answers}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View>
            <Text style={[styles.leftMessage]}>{questions[item.questionId].description}</Text>
            {/* <View style={[styles.rightMessage]}>
              <Image
                source={{
                  uri: item.image
                }}
                resizeMode={'contain'}
                style={[styles.rightImage]}
              />
            </View> */}
            <TouchableOpacity onPress={() => {
              setImage(item.image);
              setImageVisible(true)
            }}>
              <Image
                source={{
                  uri: item.image
                }}
                resizeMode={'contain'}
                style={[styles.rightImage]} />
            </TouchableOpacity>
            <Text style={[styles.rightMessage]}>{item.answer}</Text>
          </View>

        )} />


      {/* enlarge image */}
      <Modal animationType={'fade'} visible={imageVisible} transparent={true}>
        <ImageViewer onClick={() => { setImage(); setImageVisible(false) }} imageUrls={[{ url: image,}]} />
      </Modal>


      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>

        <TouchableOpacity>
          <MaterialIcons style={{ color: "black", flex: 1, marginLeft: 5, marginTop: 10 }} name="mic" size={30} />
        </TouchableOpacity>

        <TextInput style={[styles.inputSearchStyle]}></TextInput>

        <TouchableOpacity>
          <MaterialIcons style={{ color: "black", flex: 1, marginRight: 5, marginTop: 10 }} name="notes" size={30} />
        </TouchableOpacity>

      </View>

    </SafeAreaView> : null


}

const styles = StyleSheet.create({
  text: {
    color: "#161924",
    fontSize: 20,
    fontWeight: "500"
  },
  inputSearchStyle: {
    // marginVertical: 60,
    marginHorizontal: 10,
    borderColor: 'gray',
    borderRadius: 10,
    borderWidth: 0.7,
    fontSize: 16,
    flex: 9
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
  }
})


export default DonationScreen;