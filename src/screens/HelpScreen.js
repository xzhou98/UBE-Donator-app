import React from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'


const HelpScreen = () => {
  return (
    <ScrollView style={{ padding: '3%'}}>
      <View style={{ alignItems: "center"}}>
      </View>
      <Text style={styles.basetext}>UBE is an Artificial Intelligent (AI) Robot that can perform some basic tasks through users voice or text input.</Text>
      <Text style={styles.basetext}>Below are some basic buttons that Ube embeds:</Text>
      <View>
        <Text style={styles.boldtext}>  Skip: <Text style={styles.basetext}>{"("}this question{")"} </Text></Text>
        <Text style={styles.boldtext}>  Back: <Text style={styles.basetext}>{"("}to the last question{")"} </Text></Text>
        {/* <Text style={styles.boldtext}>  UNDO: <Text style={styles.basetext}>{"("}the current input{")"} </Text></Text> */}
        {/* <Text style={styles.boldtext}>  RESTART Current Session </Text> */}
        <Text style={styles.boldtext}>  Restart Whole Donation Session </Text>
        {/* <Text style={styles.boldtext}>  QUIT: <Text style={styles.basetext}>{"("}save and quit this donation process{")"} </Text></Text> */}
        {/* <Text style={styles.boldtext}>  END: <Text style={styles.basetext}>{"("}this time of donation without saving{")"} </Text></Text> */}
        {/* <Text style={styles.boldtext}>  WITHDRAW: <Text style={styles.basetext}>{"("}from this study{")"} </Text></Text> */}
        <Text style={styles.boldtext}>  Call 911: <Text style={styles.basetext}>{"("}when there is any emergency{")"} </Text></Text>
      </View>
      <Text style={styles.basetext}>Below are some instructions for each Pages:</Text>
      <View>
        <Text style={styles.boldtext}>  Donation Pages: <Text style={styles.basetext}> (you can donate your data here) </Text></Text>
        <Text style={styles.boldtext}>  Contact Us Pages: <Text style={styles.basetext}>(we provide some help resources) </Text></Text>
        <Text style={styles.boldtext}>  Review Pages: <Text style={styles.basetext}>(you can review your donation data here)</Text></Text>
        <Text style={styles.boldtext}>  Edit Pages: <Text style={styles.basetext}>(you can modify your data here, if you didn’t donate data, you will be navigated to the Review Pages) </Text></Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  title: {
    color: "#161924",
    fontSize: 20,
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
  }
})



export default HelpScreen;