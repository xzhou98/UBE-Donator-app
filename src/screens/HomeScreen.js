import React, { useEffect, useState, useContext } from 'react'
import { Text, View, SafeAreaView, StatusBar, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native'
import { signOut } from '../utils/auth';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FormButton from '../components/shared/FormButton';
import { COLORS } from '../constants/theme';
// import { getQuizzes, checkQuizFinish, getUserInfoByEmail } from '../utils/database';
import auth from "@react-native-firebase/auth";
// import { AuthContextProvider, AuthContext } from "../context/AuthContext"

const HomeScreen = () => {
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    // console.log(user)
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Text style={styles.text}>Home Page</Text>
    </View>

  )
}

const styles = StyleSheet.create({
  text: {
    color: "#161924",
    fontSize: 20,
    fontWeight: "500"
  }
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