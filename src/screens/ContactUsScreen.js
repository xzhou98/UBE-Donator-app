import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Clipboard from '@react-native-clipboard/clipboard';

const ContactUsScreen = () => {
  const [categories, setCategories] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [refresh, setRefresh] = useState(true);
  const copyToClipboard = str => {
    Clipboard.setString(str);
  };

  useEffect(() => {}, [refresh]);

  return (
    <ScrollView>
      {/* <View style={{alignItems: 'center', margin: 15}}>
        <Text style={[styles.title]}>Resource List</Text>
      </View> */}

      <View style={{marginHorizontal: '12%'}}>
        <Text style={[styles.basetext]}>
          For questions about the study itself, please contact:
        </Text>

        <Text style={[styles.boldText]}>{`Dr. Douglas Zytko`}</Text>
        <View style={[styles.textContainer]}>
          <Text style={[styles.text]}>
            {`Assistant Professor \nDepartment of Computer Science and Engineering`}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.text]}>{`zytko@oakland.edu`}</Text>
            <TouchableOpacity
              onPress={() => {
                copyToClipboard('zytko@oakland.edu');
              }}>
              <MaterialIcons
                style={{color: 'black', marginTop: 5, marginLeft: 5}}
                name="content-copy"
                size={17}
              />
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.text]}>{`(609)-313-8009`}</Text>
            <TouchableOpacity
              onPress={() => {
                copyToClipboard('(609)-313-8009');
              }}>
              <MaterialIcons
                style={{color: 'black', marginTop: 5, marginLeft: 5}}
                name="content-copy"
                size={17}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* <Text style={[styles.basetext]}>
          If the study has brought about any thoughts that you would like to
          discuss with us, please contact:
        </Text>
        <Text style={[styles.boldText]}>{`Dr. Kelly Berishaj`}</Text>
        <View style={[styles.textContainer]}>
          <Text style={[styles.text]}>
            {`Special Instructor \nSchool of Nursing`}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.text]}>{`berishaj@oakland.edu`}</Text>
            <TouchableOpacity
              onPress={() => {
                copyToClipboard('berishaj@oakland.edu');
              }}>
              <MaterialIcons
                style={{color: 'black', marginTop: 5, marginLeft: 5}}
                name="content-copy"
                size={17}
              />
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.text]}>{`(248)-364-8750`}</Text>
            <TouchableOpacity
              onPress={() => {
                copyToClipboard('(248) 364-8750');
              }}>
              <MaterialIcons
                style={{color: 'black', marginTop: 5, marginLeft: 5}}
                name="content-copy"
                size={17}
              />
            </TouchableOpacity>
          </View>
        </View> */}
      </View>

      <View style={{marginHorizontal: '12%'}}>
        <Text style={[styles.basetext2]}>Need Help?</Text>

        {/* 1 */}
        <TouchableOpacity
          style={{
            borderBottomWidth: 2,
            // marginHorizontal: '5%',
            marginTop: 15,
            flexDirection: 'row',
          }}
          onPress={() => {
            let temp = categories;
            temp[0] = !temp[0];
            setCategories(temp);
            setRefresh(!refresh);
          }}>
          <Text style={[styles.basetext]}>Sexual Assault:</Text>
          <MaterialIcons
            style={{color: 'black', flex: 1}}
            name={categories[0] ? 'remove' : 'add'}
            size={20}
          />
        </TouchableOpacity>
        <View>
          {categories[0] ? (
            <View>
              <Text
                style={{
                  color: 'black',
                  fontSize: 15,
                  marginLeft: '10%',
                  marginTop: 10,
                }}>
                {`Rape, Abuse, and Incest National Network (RAINN)`}
              </Text>
              <Text style={[styles.italic]}>
                {`The National Sexual Assault Hotline gives you access to a range of free services offered by sexual assault service providers`}
              </Text>
              <Text style={[styles.text]}>{`1-800.656.HOPE (4673)`}</Text>
            </View>
          ) : (
            <></>
          )}
        </View>

        {/* 2 */}
        <TouchableOpacity
          style={{
            borderBottomWidth: 2,
            // marginHorizontal: '5%',
            marginTop: 15,
            flexDirection: 'row',
          }}
          onPress={() => {
            let temp = categories;
            temp[1] = !temp[1];
            setCategories(temp);
            setRefresh(!refresh);
          }}>
          <Text style={[styles.basetext]}>Mental Health:</Text>
          <MaterialIcons
            style={{color: 'black', flex: 1}}
            name={categories[1] ? 'remove' : 'add'}
            size={20}
          />
        </TouchableOpacity>
        <View>
          {categories[1] ? (
            <View>
              {/* 1 */}
              <Text style={{color: 'black', fontSize: 15}}>
                If the data you provided today brought up thoughts about past or
                current experiences that you want to talk more about or explore:
              </Text>
              <Text
                style={{
                  color: 'black',
                  fontSize: 15,
                  marginLeft: '10%',
                  marginTop: 10,
                }}>
                {`National Institute of Mental Health`}
              </Text>
              <Text style={[styles.italic]}>
                {`Conducts research on mental health and provides information and resources for the public and healthcare professionals.`}
              </Text>
              <Text style={[styles.text]}>{`www.nimh.nih.gov`}</Text>

              {/* 2 */}
              <Text
                style={{
                  color: 'black',
                  fontSize: 15,
                  marginLeft: '10%',
                  marginTop: 10,
                }}>
                {`National Suicide Prevention Lifeline 24/7`}
              </Text>
              <Text style={[styles.italic]}>
                {`Provides free and confidential support to individuals in suicidal crisis or emotional distress`}
              </Text>
              <Text
                style={{
                  color: 'black',
                  fontSize: 15,
                  marginLeft: '10%',
                }}>{`1-800-273-TALK (8255)`}</Text>
              <Text
                style={{
                  color: 'black',
                  fontSize: 15,
                  marginLeft: '10%',
                }}>{`Can text to 988`}</Text>
              <Text
                style={{
                  color: 'black',
                  fontSize: 15,
                  marginLeft: '10%',
                }}>{`Spanish`}</Text>
              <Text style={[styles.text]}>{`Español: 1-888-628-9454h`}</Text>

              {/* 3 */}
              <Text
                style={{
                  color: 'black',
                  fontSize: 15,
                  marginLeft: '10%',
                  marginTop: 10,
                }}>
                {`Crisis Text Line 24/7`}
              </Text>
              <Text style={[styles.italic]}>
                {`Offers free 24/7 text-based support for people in crisis, including those experiencing suicidal thoughts.`}
              </Text>
              <Text style={[styles.text]}>{`Text HOME to 741-741`}</Text>
            </View>
          ) : (
            <></>
          )}
        </View>
        <Text style={[styles.basetext2]}>Emergency</Text>
        <Text style={{color: 'black', fontSize: 15, marginVertical: 10}}>
          {`If you are suffering from a life-threatening injury or illness that requires emergent medical assistance OR if you are in a dangerous or unsafe situation that requires immediate police response:`}
        </Text>
        {/* <Text style={[styles.text]}>DIAL 911</Text> */}

        <View style={{margin: 30}} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  marginStyle: {marginHorizontal: 30},
  // marginStyle2: { backgroundColor: '#f2f5f8', },
  title: {
    color: '#161924',
    fontSize: 20,
    fontWeight: 'bold',
  },
  basetext: {
    flex: 5,
    // backgroundColor: '#f2f5f8',
    color: '#161924',
    fontSize: 16,
    fontWeight: 'bold',
  },
  basetext2: {
    marginTop: 20,
    flex: 5,
    // backgroundColor: '#f2f5f8',
    color: '#161924',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textContainer: {
    marginBottom: 10,
    marginLeft: '10%',
  },
  text: {
    // fontWeight: 'bold',
    marginTop: 8,
    color: 'black',
    fontSize: 15,
    // fontWeight: 'bold',
  },
  boldText: {
    color: 'black',
    fontSize: 15,
    marginTop: 15,
    marginHorizontal: '10%',
    fontWeight: 'bold',
  },
  italic: {
    color: '#71a0ed',
    marginLeft: '10%',
    fontStyle: 'italic',
    fontSize: 15,
  },
});

export default ContactUsScreen;
