import React, { useEffect, useState, useRef } from 'react';
import { Text, View, StyleSheet, Alert, TouchableOpacity, FlatList } from 'react-native'
// import { EditScreen } from '../screens';
import { createStackNavigator } from '@react-navigation/stack';
import { ReviewScreen, EditScreen} from '../screens';




const SubStackNavigator = ({navigation}) => {
  const Stack = createStackNavigator();
  useEffect(() => {

  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ReviewScreen" component={ReviewScreen} />
      <Stack.Screen name="EditScreen" component={EditScreen} />
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



export default SubStackNavigator