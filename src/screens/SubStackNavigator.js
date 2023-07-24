import React, { useEffect, useState, useRef } from 'react';
import { Text, View, StyleSheet, Alert, TouchableOpacity, FlatList } from 'react-native'
import auth from '@react-native-firebase/auth';
import { getUserInfoByEmail } from '../utils/database';
// import { EditScreen } from '../screens';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { createStackNavigator } from '@react-navigation/stack';
import { ReviewScreen, EditScreen} from '../screens';




const SubStackNavigator = ({navigation}) => {
  const [user, setUser] = useState();
  const [render, setRender] = useState(false);
 


  const Stack = createStackNavigator();


  const onAuthStateChanged = async user => {
    try {
      let userInfo = await getUserInfoByEmail(user.email);
      setUser(userInfo);
      // let allSessions = await getAllSessions(userInfo.id)
      // setSessions(allSessions);
      // let allAnswers = await getAllSessionsByUserId(userInfo.id)
      // setAllAnswers(allAnswers)

      setRender(true);
    } catch (error) {
      Alert.alert(error);
    }
  };


  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return render ? (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ReviewScreen" component={ReviewScreen} />
      <Stack.Screen name="EditScreen" component={EditScreen} />
    </Stack.Navigator>
  ) : (
    <View style={[styles.container, styles.center]}>
      <Text style={styles.title}>Please login first</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mainTitle:{
    padding: 30,
    fontSize:28,
    fontWeight: 'bold',
    color: '#455d60'
  },
  secondTitle:{
    marginHorizontal:'5%',
    fontSize:18,
    color: '#838f91'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2f5f8'
  },
  buttonContainer: {
    margin: 20,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#7db1b7',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  center: {
    justifyContent: 'center',
  },
})



export default SubStackNavigator