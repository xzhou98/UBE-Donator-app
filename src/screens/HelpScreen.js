import React from 'react'
import { Text, View, StyleSheet } from 'react-native'


const HelpScreen = () => {
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Text style={styles.text}>HelpScreen</Text>
      <Text style={{
        fontSize: 16,
        color: "#161924",
        fontWeight: '500',
      }}>
        UBE is an Artificial Intelligent (AI) Robert that can perform some basic tasks through users voice or text input.
      </Text>
      <Text style={{
        fontSize: 16,
        color: "#161924",
        fontWeight: '500'
      }}>
        Below are some basic commends that Ube embeds:
      </Text>
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


export default HelpScreen;