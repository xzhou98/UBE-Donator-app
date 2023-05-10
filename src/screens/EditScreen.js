import React from 'react'
import { Text, View, StyleSheet } from 'react-native'


const HelpScreen = () => {
  return (
    <View>
      <View style={{ alignItems: "center"}}>
        <Text style={styles.title}>Edit</Text>
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