import React from 'react'
import { Text, View, StyleSheet } from 'react-native'


const HelpScreen = () => {
  return (
    <View>
      <View style={{ alignItems: "center"}}>
        <Text style={styles.title}>HelpScreen</Text>
        
      </View>
<Text style={styles.basetext}>UBE is an Artificial Intelligent (AI) Robert that can perform some basic tasks through users voice or text input.</Text>
        <Text style={styles.basetext}>Below are some basic commends that Ube embeds:</Text>
      <View>
        <Text style={styles.boldtext}>  Skip: <Text style={styles.basetext}>{"("}this question{")"} </Text></Text>
        <Text style={styles.boldtext}>  Back: <Text style={styles.basetext}>{"("}to the last question{")"} </Text></Text>
        <Text style={styles.boldtext}>  UNDO: <Text style={styles.basetext}>{"("}the current input{")"} </Text></Text>
        <Text style={styles.boldtext}>  RESTART Current Session </Text>
        <Text style={styles.boldtext}>  RESTART Whole Donation Session </Text>
        <Text style={styles.boldtext}>  QUIT: <Text style={styles.basetext}>{"("}save and quit this donation process{")"} </Text></Text>
        <Text style={styles.boldtext}>  END: <Text style={styles.basetext}>{"("}this time of donation without saving{")"} </Text></Text>
        <Text style={styles.boldtext}>  WITHDRAW: <Text style={styles.basetext}>{"("}from this study{")"} </Text></Text>
        <Text style={styles.boldtext}>  CALL 911: <Text style={styles.basetext}>{"("}when there is any emergency{")"} </Text></Text>
      </View>
    </View>
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