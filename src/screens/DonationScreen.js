import React from 'react'
import { Text, View, StyleSheet, TextInput, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const DonationScreen = () => {
  return (
    <SafeAreaView style={{ position: 'relative', display: 'flex', flexDirection: 'column', backgroundColor: '#f2f5f8', height: '100%', }}>
      <ScrollView style={{}}>
          <Text style={[ styles.leftMessage]}>
            Was sexual contact attempted by either partners at any of these in-person meetings?
          </Text>

          <Text style={[ styles.rightMessage]}>
            Yes
          </Text>


          <Text style={[ styles.leftMessage]}>
            Have you interacted with anyone you met on Tinder since the last time you donated data? If yes, select all that apply
          </Text>


          <Text style={[ styles.rightMessage]}>
            Via phone call, video call, or text message
          </Text>




      </ScrollView>

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>

        <TouchableOpacity>
          <MaterialIcons style={{ color: "black", flex: 1, marginLeft: 5, marginTop: 10 }} name="mic" size={30} />
        </TouchableOpacity>

        <TextInput style={[styles.inputSearchStyle]}></TextInput>
        {/* <Input style={[styles.inputSearchStyle]}></Input> */}

        <TouchableOpacity>
          <MaterialIcons style={{ color: "black", flex: 1, marginRight: 5, marginTop: 10 }} name="notes" size={30} />
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
    // marginVertical: 60,
    marginHorizontal: 10,
    borderColor: 'gray',
    borderRadius: 10,
    borderWidth: 0.7,
    fontSize: 16,
    flex: 9
  },
  leftMessage:{
    color: 'white',
    padding: 10,
    borderRadius: 10,
    marginRight: 150,
    marginTop:15,
    backgroundColor: '#86bb71',
  },
  rightMessage:{
    color: 'white',
    padding: 10,
    borderRadius: 10,
    marginTop:15,
    marginLeft: 150,
    backgroundColor: '#94c2ed',
  }
})


export default DonationScreen;