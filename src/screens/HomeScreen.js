import React, { useEffect, useState, useRef } from 'react';
import { Text, View, StyleSheet, Alert, TouchableOpacity, FlatList } from 'react-native'
import auth from '@react-native-firebase/auth';
import { getUserInfoByEmail, getAllQuestions, getAllSessions, getAllSessionsByUserId } from '../utils/database';
import { EditScreen } from '../screens';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import { showNotification, handle5SecNotification, handleCancel, handleScheduleNotification } from '../views/notification.android'
// import DatePicker from 'react-native-date-picker';
// import moment from 'moment';
// import Dialog from "react-native-dialog";



const HomeScreen = () => {
  const [user, setUser] = useState();
  const [refresh, setRefresh] = useState(false);
  // const [questions, setQuestions] = useState();
  const [render, setRender] = useState(false);
  const [sessions, setSessions] = useState(false);
  const [controler, setControler] = useState(true);
  const [sessionId, setSessionId] = useState();
  const [answerId, setAnswersId] = useState();
  const [allAnswers, setAllAnswers] = useState();

  const flatListRef = useRef();

  const onAuthStateChanged = async user => {
    try {
      let userInfo = await getUserInfoByEmail(user.email);
      setUser(userInfo);
      let allSessions = await getAllSessions(userInfo.id)
      setSessions(allSessions);
      let allAnswers = await getAllSessionsByUserId(userInfo.id)
      setAllAnswers(allAnswers)

      setRender(true);
    } catch (error) {
      Alert.alert(error);
    }
  };

  const type = (index, item) => {
    if (item.dateType == 0) {
      return (<View style={styles.session}>
        <Text style={styles.bold}>
          Session {index + 1}
        </Text>
        <Text style={styles.slim}>        {item.startDate} to {item.endDate}</Text>
      </View>)
    }
    else if (item.dateType == 1) {
      return (<View style={styles.session1}>
        <Text style={styles.bold}>
          Session {index + 1}
        </Text>
        <Text style={styles.slim}>        {item.startDate} to {item.endDate}</Text>
      </View>)
    }
    else {
      return (<View style={styles.session2}>
        <Text style={styles.bold}>
          Session {index + 1}
        </Text>
        <Text style={styles.slim}>        {item.startDate} to {item.endDate}</Text>
      </View>)
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [refresh]);

  return render ? (
    <View style={{}}>
      {controler ? <View style={{ alignItems: 'center', }}>

        <FlatList
          ref={flatListRef}
          data={sessions}
          onContentSizeChange={() => flatListRef.current.scrollToEnd()}
          showsVerticalScrollIndicator={true}
          renderItem={({ item, index }) => (
            <View key={index} style={{ flexDirection: 'column', }}>
              <View style={{ alignItems: 'center' }}>
                {type(index, item)}
                {allAnswers[index].map((element, index) => {
                  if (element.sessionId == item.id)
                    return (<View key={index} style={styles.answer}>
                      <View style={{ flexDirection: 'column', flex: 3 }}>
                        <Text style={styles.answerTitle}>{index + 1}st submission</Text>
                        <Text style={styles.answerDate}>{element.date}</Text>
                      </View>
                      <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity onPress={() => { setControler(!controler); setAnswersId(item.id); setSessionId(item.sessionId) }}>
                          <Text style={styles.button}>
                            Review
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>)
                })}
              </View>
            </View>
          )}
        />
        {sessions.map((item, index) => {
          // return (
            // <View key={index} style={{ flexDirection: 'column', }}>
            //   <View style={{ alignItems: 'center' }}>
            //     {type(index, item)}
            //     {allAnswers[index].map((element, index) => {
            //       if (element.sessionId == item.id)
            //         return (<View key={index} style={styles.answer}>
            //           <View style={{ flexDirection: 'column', flex: 3 }}>
            //             <Text style={styles.answerTitle}>{index + 1}st submission</Text>
            //             <Text style={styles.answerDate}>{element.date}</Text>
            //           </View>
            //           <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
            //             <TouchableOpacity onPress={() => { setControler(!controler); setAnswersId(item.id); setSessionId(item.sessionId) }}>
            //               <Text style={styles.button}>
            //                 Review
            //               </Text>
            //             </TouchableOpacity>
            //           </View>
            //         </View>)
            //     })}

            //   </View>

            // </View>
          // )
        })}
      </View > :
        <View>
          <View style={{ flexDirection: 'row', }}>
            <TouchableOpacity style={{ flex: 1 }} onPress={() => { setControler(!controler) }}>
              <MaterialIcons style={{ color: 'black' }} name="arrow-back" size={30} />
            </TouchableOpacity>

            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={styles.title}>EditScreen</Text>
            </View>
            <Text style={{ flex: 1 }}></Text>

          </View>
          <EditScreen answerId={answerId} sessionId={sessionId} ></EditScreen>
        </View>

      }

    </View>) : (<View style={{ alignItems: "center" }}>
      <Text style={styles.title}>Please login first</Text>
    </View>)
}

const styles = StyleSheet.create({
  title: {
    color: "#161924",
    fontSize: 22,
    fontWeight: "bold",
  },
  back: {
    color: "#161924",
    fontSize: 18,
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
  answer: {
    width: '80%',
    height: 65,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,


    borderRadius: 7,
    marginTop: 10,
    flexDirection: 'row',
    backgroundColor: '#7BB2BA',

  },
  answerTitle: {
    marginTop: 10,
    marginHorizontal: 10,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
  },
  answerDate: {
    marginTop: 4,
    marginHorizontal: 10,
    color: '#696969',
    fontSize: 13,
  },
  session: {
    height: 45,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 5,

    borderRadius: 7,
    marginTop: 25,
    flexDirection: 'row',
    backgroundColor: '#7BB2BA',
  },
  session1: {
    height: 45,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 5,

    borderRadius: 7,
    marginTop: 25,
    flexDirection: 'row',
    backgroundColor: '#D6E9EB',
  },
  session2: {
    height: 45,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 5,

    borderRadius: 7,
    marginTop: 25,
    flexDirection: 'row',
    backgroundColor: '#CDD8D9',
  },
  bold: {
    marginTop: 10,
    marginHorizontal: 10,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 17,
  },
  slim: {
    marginTop: 14,
    marginHorizontal: 10,
    color: '#696969',
    fontSize: 13,
  },
  button: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,

    textAlignVertical: 'center',
    textAlign: 'center',

    borderRadius: 7,
    backgroundColor: 'white',
    color: 'black',
    fontSize: 13,
    fontWeight: 'bold',
    height: 40,
    width: 70,
  },
})



export default HomeScreen;

// const datePicker = () => {
//   if(date > new Date()){
//     handleScheduleNotification('UBE data', "It's time to donate time", date);
//     let userInfo = {id: user.id, email: user.email, isAdmin: user.isAdmin, date: user.date};
//     userInfo.date = firebase.firestore.Timestamp.fromDate(date)
//     setUserInfo(userInfo);
//     setPickerVisible(false);
//     setRefresh(!refresh);
//   }else{
//     Alert.alert("You can't schedule a date in the past")
//   }
// }

// <View style={{ alignItems: "center", justifyContent: "center" }}>
// <Text style={styles.text}>Home Page</Text>
// <View>
//   <Text style={{marginVertical: 50}}>Notification Date: {user.date}</Text>
//   <TouchableOpacity activeOpacity={0.6} onPress={() => { setPickerVisible(true) }}>
//     <View style={styles.notificationButton}>
//       <Text style={styles.ButtonTitle}>Click me to schedule the notification</Text>
//     </View>
//   </TouchableOpacity>
// </View>

// <TouchableOpacity activeOpacity={0.6} onPress={() => showNotification('Hello', 'message')}>
//   <View style={styles.notificationButton}>
//     <Text style={styles.ButtonTitle}>Click me to get notification</Text>
//   </View>
// </TouchableOpacity>
// <TouchableOpacity activeOpacity={0.6} onPress={() => handle5SecNotification('UBE data', "IT'S TIME TO DONATE DATA")}>
//   <View style={styles.notificationButton}>
//     <Text style={styles.ButtonTitle}>Click me to get notification after 5 sec.</Text>
//   </View>
// </TouchableOpacity>
// <TouchableOpacity activeOpacity={0.6} onPress={handleCancel}>
//   <View style={styles.notificationButton}>
//     <Text style={styles.ButtonTitle}>Click me to cancel notification</Text>
//   </View>
// </TouchableOpacity>

// <Dialog.Container visible={pickerVisible}>
//   <Dialog.Title>Please select a date</Dialog.Title>
//   <Dialog.Description>
//     <View>
//       <DatePicker date={date} onDateChange={setDate} />
//     </View>
//   </Dialog.Description>
//   <Dialog.Button label="Cancel" onPress={() => { setPickerVisible(false) }} />
//   <Dialog.Button label="Confirm" onPress={datePicker} />
// </Dialog.Container>

// </View>