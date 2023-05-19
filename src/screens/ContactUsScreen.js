import React from 'react'
import { Text, View, StyleSheet } from 'react-native'


const ContactUsScreen = () => {
  return (
    <View>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.title}>ContactUs</Text>
      </View>


      <Text style={styles.basetext2}>If you have any question about this study, please contact our Principle Investigator:</Text>


      <View style={styles.marginStyle}>
        <Text style={styles.boldtext}> Dr.Douglas Zykto </Text>
        <Text style={styles.basetext}>
          {'Assistant Professor\nDepartment of Computer Science and Engineering\nzytko@oakland.edu\n(609)-313-8009'}
        </Text>
      </View>


      <Text style={styles.basetext2}>If the data you provided today brought up thoughts about past or current experiences
        that you want to talk more about or explore, below are some organizations you can contact:</Text>



      <View style={styles.marginStyle}>
        <Text style={styles.boldtext}> HAVEN <Text style={styles.basetext}>
          {"\n"} 801 Vanguard Dr., Pontiac, MI 48341
          {"\n"} (248)-334-1284
        </Text></Text>
      </View>

      <Text style={styles.basetext2}>If there is any emergency, please click to dial:</Text>


      <View style={styles.marginStyle}>
        <Text style={styles.boldtext}>911</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  marginStyle: { marginHorizontal: 30, },
  // marginStyle2: { backgroundColor: '#f2f5f8', },

  title: {
    color: "#161924",
    fontSize: 20,
    fontWeight: "bold",
  },
  basetext: {
    // backgroundColor: '#f2f5f8',
    color: "#161924",
    fontSize: 16,
    fontWeight: "400",
  },
  basetext2: {
    backgroundColor: '#f2f5f8',
    color: "#161924",
    fontSize: 16,
    fontWeight: "500",
    marginTop: 10,
  },
  boldtext: {
    color: "#161924",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  }
})


export default ContactUsScreen;