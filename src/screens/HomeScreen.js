import React, { useEffect, useState, useContext } from 'react'
import { Text, View, Platform, Modal, TouchableOpacity, Alert, StyleSheet } from 'react-native'
import { signOut } from '../utils/auth';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FormButton from '../components/shared/FormButton';
import { COLORS } from '../constants/theme';
import { getQuizzes, checkQuizFinish, setUserInfo, getUserInfoByEmail } from '../utils/database';
import auth, { firebase } from "@react-native-firebase/auth";
import { showNotification, handle5SecNotification, handleCancel, handleScheduleNotification } from '../views/notification.android'
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import Dialog from "react-native-dialog";



const HomeScreen = () => {
  const [user, setUser] = useState();
  const [date, setDate] = useState(new Date());
  const [pickerVisible, setPickerVisible] = useState(false);
  const [render, setRender] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const onAuthStateChanged = async user => {
    try {
      let userInfo = await getUserInfoByEmail(user.email);
      setUser(userInfo)
      setRender(true);
    } catch (error) {
      Alert.alert(error);
    }
  }

  const datePicker = () => {
    handleScheduleNotification('Hi', '111', date);
    let userInfo = {id: user.id, email: user.email, isAdmin: user.isAdmin, date: user.date};
    userInfo.date = firebase.firestore.Timestamp.fromDate(date)
    setUserInfo(userInfo);
    setPickerVisible(false);
    setRefresh(!refresh);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [refresh]);


  return render?(
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Text style={styles.text}>Home Page</Text>
      <View>
        <Text>Notification Date: {user.date}</Text>
        <TouchableOpacity activeOpacity={0.6} onPress={() => { setPickerVisible(true) }}>
          <View style={styles.notificationButton}>
            <Text style={styles.ButtonTitle}>Click me to set the notification date</Text>
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity activeOpacity={0.6} onPress={() => showNotification('Hello', 'message')}>
        <View style={styles.notificationButton}>
          <Text style={styles.ButtonTitle}>Click me to get notification</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.6} onPress={() => handle5SecNotification('Hi', 'showed after 5 sec')}>
        <View style={styles.notificationButton}>
          <Text style={styles.ButtonTitle}>Click me to get notification after 5 sec.</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.6} onPress={handleCancel}>
        <View style={styles.notificationButton}>
          <Text style={styles.ButtonTitle}>Click me to cancel notification</Text>
        </View>
      </TouchableOpacity>

      <Dialog.Container visible={pickerVisible}>
        <Dialog.Title>Please select a date</Dialog.Title>
        <Dialog.Description>
          <View>
            <DatePicker date={date} onDateChange={setDate} />
          </View>
        </Dialog.Description>
        <Dialog.Button label="Cancel" onPress={() => { setPickerVisible(false) }} />
        <Dialog.Button label="Confirm" onPress={datePicker} />
      </Dialog.Container>

    </View>

  ):null
}

const styles = StyleSheet.create({
  text: {
    color: "#161924",
    fontSize: 20,
    fontWeight: "500"
  },
  notificationButton: {
    margin: 10,
    padding: 16,
    backgroundColor: '#aed4d9',
    borderRadius: 24,
  },
  ButtonTitle: {
    // color: 'white',
  },
})



// const HomeScreen = ({ navigation }) => {
//   // const currentUser = useContext(AuthContextProvider);
//   const [allQuizzes, setAllQuizzes] = useState([]);
//   const [refreshing, setRefreshing] = useState(false);
//   const [user, setUser] = useState();

//   const getAllQuizzes = async () => {
//     console.log(123);
//     const quizzes = await getQuizzes();
//     // Transform quiz data
//     let tempQuizzes = [];
//     await quizzes.docs.forEach(async quiz => {
//       await tempQuizzes.push({ id: quiz.id, ...quiz.data(), isfinish: false });
//     });

//     // check finish
//     for (let i = 0; i < tempQuizzes.length; i++) {
//       const element = tempQuizzes[i];
//       if (element.users.includes(auth().currentUser.email)) {
//         tempQuizzes[i].isfinish = true;
//       }
//     }

//     await setAllQuizzes([...tempQuizzes]);

//     // setRefreshing(false);
//   }

//   const getUserInfo = async () => {
//     try {

//       return await getUserInfoByEmail(auth().currentUser.email)
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   useEffect(() => {
//     getUserInfo().then(res => {
//       setUser(res)
//     })

//     const focusHandler = navigation.addListener('focus', () => {
//       getAllQuizzes();
//     });
//     return focusHandler;
//   }, [])

//   return user ?
//     <SafeAreaView
//       style={{
//         flex: 1,
//         backgroundColor: COLORS.background,
//         position: 'relative',
//       }}>
//       <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />

//       <View
//         style={{
//           flexDirection: 'row',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           backgroundColor: COLORS.white,
//           elevation: 4,
//           paddingHorizontal: 20,
//         }}>
//         <Text style={{ fontSize: 20, color: COLORS.black }}>UBE Donator</Text>
//         <Text
//           style={{
//             fontSize: 20,
//             padding: 10,
//             color: COLORS.error,
//           }}
//           onPress={signOut}>
//           Logout
//         </Text>
//         {/* <MaterialIcons
//           name="reorder"
//           size={24}
//         /> */}
//       </View>

//       {/* Quiz list */}
//       <FlatList
//         data={allQuizzes}
//         onRefresh={getAllQuizzes}
//         refreshing={refreshing}
//         showsVerticalScrollIndicator={false}
//         style={{
//           paddingVertical: 20,
//         }}
//         renderItem={({ item: quiz }) => (
//           <View
//             style={{
//               padding: 20,
//               borderRadius: 5,
//               marginVertical: 5,
//               marginHorizontal: 10,
//               flexDirection: 'row',
//               alignItems: 'center',
//               justifyContent: 'space-between',
//               backgroundColor: COLORS.white,
//               elevation: 2,
//             }}>
//             <View style={{ flex: 1, paddingRight: 10 }}>
//               <Text style={{ fontSize: 18, color: COLORS.black }}>
//                 {quiz.title}
//               </Text>
//               <Text style={{ color: '#CC0033' }}>
//                 {quiz.isfinish ? 'finished' : 'unfinished'}
//               </Text>
//               {quiz.description != '' ? (
//                 <Text style={{ opacity: 0.5 }}>{quiz.description}</Text>
//               ) : null}
//             </View>
//             <View>
//               {quiz.isfinish ? null : (<TouchableOpacity
//                 style={{
//                   paddingVertical: 10,
//                   alignItems: 'center',
//                   paddingHorizontal: 15,
//                   marginVertical: 15,
//                   borderRadius: 50,
//                   backgroundColor: COLORS.primary + '20',
//                 }}
//                 onPress={() => {
//                   navigation.navigate('PlayQuizScreen', {
//                     quizId: quiz.id,
//                   });
//                 }}>
//                 <Text style={{ color: COLORS.primary }}>Play</Text>
//               </TouchableOpacity>)}

//               {/* <TouchableOpacity
//                 style={{
//                   paddingVertical: 10,
//                   alignItems: 'center',
//                   paddingHorizontal: 15,
//                   borderRadius: 50,
//                   backgroundColor: COLORS.primary + '20',
//                 }}
//                 onPress={() => { handlePublish(quiz.id, !quiz.isPublish) }}>
//                 <Text style={{ color: COLORS.primary }}>{quiz.isPublish ? "unPublish" : "Publish"}</Text>
//               </TouchableOpacity> */}
//             </View>


//             {/* <TouchableOpacity
//               style={{
//                 paddingVertical: 10,
//                 paddingHorizontal: 25,
//                 borderRadius: 50,
//                 backgroundColor: COLORS.primary + '20',
//               }}
//               onPress={() => {
//                 // navigation.navigate('PlayQuizScreen', {
//                 //   quizId: quiz.id,
//                 // });
//               }}>
//               <Text style={{ color: COLORS.primary }}>edit</Text>
//             </TouchableOpacity> */}
//           </View>
//         )}
//       />
//       {/* 
//       Button */}
//       {/* <FormButton
//         labelText="Create Quiz"
//         style={{
//           position: 'absolute',
//           bottom: 20,
//           right: 20,
//           borderRadius: 50,
//           paddingHorizontal: 30,
//         }}
//         handleOnPress={() => navigation.navigate('CreateQuizScreen')}
//       /> */}
//     </SafeAreaView> : <></>

// };

export default HomeScreen;