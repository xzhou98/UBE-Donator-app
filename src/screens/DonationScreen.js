import React, { useState } from 'react'
import { Text, View, StyleSheet, TextInput, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const DonationScreen = () => {
  const [q0, setQ0] = useState(true);
  const [v0, setV0] = useState();
  const [q1, setQ1] = useState(true);
  const [v1, setV1] = useState();
  const [q2, setQ2] = useState(true);
  const [v2, setV2] = useState();


  return (
    <SafeAreaView style={{ position: 'relative', display: 'flex', flexDirection: 'column', backgroundColor: '#f2f5f8', height: '100%', }}>
      <ScrollView style={{}}>
        <Text style={[styles.leftMessage]}>
          Welcome back! It is Ube
        </Text>

        <Text style={[styles.leftMessage]}>
          Before we start the donation process today. I want to make sure that you would like to continue your participation in our study. 
        </Text>

        <Text style={[styles.leftMessage]}>
          Do ypu agrre to participate?
        </Text>

        {q0 ? <TouchableOpacity onPress={()=>{setQ0(!q0); setV0('Yes, I agree.')}}>
          <Text style={[styles.leftOption]}>Yes, I agree.</Text>
        </TouchableOpacity> : <></>}
        {q0 ? <TouchableOpacity  onPress={()=>{setQ0(!q0); setV0('No，I do not agree.')}}>
          <Text style={[styles.leftOption]}>No, I do not agree.</Text>
        </TouchableOpacity>: <></>}
        {!q0 ? <Text style={[styles.rightMessage]}>
          {v0}
        </Text> : <></>}

        <Text style={[styles.leftMessage]}>
          Was sexual contact attempted by either partners at any of these in-person meetings?
        </Text>

        {q1 ? <TouchableOpacity onPress={()=>{setQ1(!q1); setV1('Yes')}}>
          <Text style={[styles.leftOption]}>Yes</Text>
        </TouchableOpacity> : <></>}
        {q1 ? <TouchableOpacity  onPress={()=>{setQ1(!q1); setV1('No')}}>
          <Text style={[styles.leftOption]}>No</Text>
        </TouchableOpacity>: <></>}
        {!q1 ? <Text style={[styles.rightMessage]}>
          {v1}
        </Text> : <></>}

        <Text style={[styles.leftMessage]}>
          Have you interacted with anyone you met on Tinder since the last time you donated data? If yes, select all that apply
        </Text>

        {q2 ? <TouchableOpacity onPress={()=>{setQ2(!q2); setV2('Via phone call, video call, or text message')}}>
          <Text style={[styles.leftOption]}>Via phone call, video call, or text message</Text>
        </TouchableOpacity> : <></>}
        {/* {q2 ? <TouchableOpacity  onPress={()=>{setQ2(!q2); setV2('No')}}>
          <Text style={[styles.leftOption]}>No</Text>
        </TouchableOpacity>: <></>} */}
        {!q2 ? <Text style={[styles.rightMessage]}>
          {v2}
        </Text> : <></>}


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
  leftMessage: {
    color: 'black',
    padding: 10,
    borderRadius: 7,
    marginRight: 150,
    marginLeft: 15,
    marginTop: 15,
    backgroundColor: 'white',
  },
  rightMessage: {
    color: 'black',
    padding: 10,
    borderRadius: 7,
    marginTop: 15,
    marginLeft: 150,
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