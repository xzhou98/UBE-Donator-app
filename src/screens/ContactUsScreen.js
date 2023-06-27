import React from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'


const ContactUsScreen = () => {
  return (
    <ScrollView>
      {/* <View style={{ alignItems: "center" }}>
        <Text style={styles.title}>ContactUs</Text>
      </View> */}

      <Text style={styles.basetext2}>Thank you so much for your participation</Text>
      <Text style={styles.basetext2}>If you have any question about this study, please contact our Principle Investigator:</Text>


      <View style={styles.marginStyle}>
        <Text style={styles.boldtext}>Dr.Douglas Zykto</Text>
        <Text style={styles.basetext}>
          {'Assistant Professor\nDepartment of Computer Science and Engineering\nzytko@oakland.edu\n(609)-313-8009'}
        </Text>
      </View>


      <Text style={styles.basetext2}>If the data you provided today brought up thoughts about past or current experiences
        that you want to talk more about or explore, below are some organizations you can contact:</Text>



      <View style={styles.marginStyle}>
        <Text style={styles.boldtext}>HAVEN </Text>
        <Text style={styles.basetext}>801 Vanguard Dr., Pontiac, MI 48341
          (248)-334-1284
        </Text>
        <Text style={styles.boldtext}>Pawley Hall Counseling Center </Text>
        <Text style={styles.basetext}>Oakland University
          Pawley Hall
        </Text>
        <Text style={styles.boldtext}>Oakland Family Services </Text>
        <Text style={styles.basetext}>Rochester Hills
          (866) 903-8955
        </Text>
        <Text style={styles.boldtext}>Community Health and Social services </Text>
        <Text style={styles.basetext}>5635 West Fort St., Detroit, MI 48209 
          (313) 849-3920
        </Text>
      </View>

      <Text style={styles.basetext2}>If there is any emergency, please click to dial:</Text>


      <View style={styles.marginStyle}>
        <Text style={styles.boldtext}>911</Text>
      </View>
    </ScrollView>
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