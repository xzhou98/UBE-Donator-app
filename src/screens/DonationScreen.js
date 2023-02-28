import React from 'react'
import { Text, View, StyleSheet, TextInput, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const DonationScreen = () => {
  return (
    <SafeAreaView style={{ position: 'relative', display: 'flex', flexDirection: 'column',backgroundColor:'#ADD8DB', height: '100%', }}>
      <ScrollView style={{ flexGrow: 12 }}>
        <Text>1</Text>
        <Text>1</Text>
        <Text>1</Text>
      </ScrollView>

      <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'center', }}>

        <TouchableOpacity>
          <MaterialIcons style={{ color: "black", flex: 1, marginLeft: 5 }} name="mic" size={30} />
        </TouchableOpacity>

        <TextInput style={[styles.inputSearchStyle]}></TextInput>

        <TouchableOpacity>
          <MaterialIcons style={{ color: "black", flex: 1, marginRight: 5 }} name="notes" size={30} />
        </TouchableOpacity>

      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  text: {
    color: "#161924",
    fontSize: 20,
    fontWeight: "500"
  },
  inputSearchStyle: {
    marginHorizontal: 10,
    borderColor: 'gray',
    borderRadius: 10,
    borderWidth: 0.7,
    fontSize: 16,
    flex: 9
  },
})


export default DonationScreen;