import React, { useEffect} from 'react';
import { Text, View, StyleSheet, Alert, TouchableOpacity, FlatList } from 'react-native'
// import { EditScreen } from '../screens';
import { createStackNavigator } from '@react-navigation/stack';
import { ReviewScreen2, UserDonationsScreen, SessionDetailScreen} from '../screens';




const AdminManageUserStackNavigator = ({navigation}) => {
  const Stack = createStackNavigator();
  useEffect(() => {

  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>

      <Stack.Screen name="UserDonationsScreen" component={UserDonationsScreen} />
      <Stack.Screen name="ReviewScreen2" component={ReviewScreen2} />
      <Stack.Screen name="SessionDetailScreen" component={SessionDetailScreen} />

    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2f5f8'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  center: {
    justifyContent: 'center',
  },
})



export default AdminManageUserStackNavigator