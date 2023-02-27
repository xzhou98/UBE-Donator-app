import React from 'react'
import { Text, View, StyleSheet} from 'react-native'


const DonationScreen = () => {
    return (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text style={styles.text}>Donation</Text>
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


export default DonationScreen;