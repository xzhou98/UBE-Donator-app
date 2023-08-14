import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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

  useEffect(() => {}, [refresh]);

  return (
    <ScrollView>
      <View style={{alignItems: 'center', margin: 15}}>
        <Text style={[styles.title]}>Resource List</Text>
      </View>

      <View style={{marginHorizontal: 15}}>
        <Text style={[styles.basetext]}>Question about the Study:</Text>
        <Text style={[styles.text]}>
          {`Dr. Douglas Zytko \nAssistant Professor \nDepartment of Computer Science and Engineering\nzytko@oakland.edu \n(609)-313-8009`}
        </Text>
      </View>

      <View style={{marginHorizontal: 15}}>
        <Text style={[styles.basetext]}>Need Help?</Text>
        <Text style={{color: 'black', fontSize: 15}}>
          {`If the data you provided today brought up thoughts about past or current experiences that you want to talk more about or explore, below are some organizations you can contact:`}
        </Text>

        {/* 1 */}
        <TouchableOpacity
          style={{
            borderBottomWidth: 2,
            marginHorizontal: '10%',
            marginTop: 20,
            flexDirection: 'row',
          }}
          onPress={() => {
            let temp = categories;
            temp[0] = !temp[0];
            setCategories(temp);
            setRefresh(!refresh);
          }}>
          <Text style={{flex: 6, color: 'black', fontSize: 15}}>
            HAVEN of Oakland County
          </Text>
          <MaterialIcons
            style={{color: 'black', flex: 1}}
            name={categories[0] ? 'add' : 'remove'}
            size={20}
          />
        </TouchableOpacity>
        <View>
          {categories[0] ? (
            <View>
              <Text style={[styles.italic]}>
                {`Specializing in supportive services for people who have experienced sexual assault or abuse in relationships`}
              </Text>
              <Text style={[styles.text]}>
                {`Crisis & Support Line 24/7\n248-334-1274 \nwww.haven-oakland.org `}
              </Text>
            </View>
          ) : (
            <></>
          )}
        </View>

        {/* 2 */}
        <TouchableOpacity
          style={{
            borderBottomWidth: 2,
            marginHorizontal: '10%',
            marginTop: 20,
            flexDirection: 'row',
          }}
          onPress={() => {
            let temp = categories;
            temp[1] = !temp[1];
            setCategories(temp);
            setRefresh(!refresh);
          }}>
          <Text style={{flex: 6, color: 'black', fontSize: 15}}>
            Common Ground 24/7
          </Text>
          <MaterialIcons
            style={{color: 'black', flex: 1}}
            name={categories[1] ? 'add' : 'remove'}
            size={20}
          />
        </TouchableOpacity>
        <View>
          {categories[1] ? (
            <View>
              <Text style={[styles.italic]}>
                {`Offers crisis intervention and mental health services for individuals in crisis or those who have experienced trauma.`}
              </Text>
              <Text style={[styles.text]}>
                {`1-800-273-TALK (8255)\nCan text to 988\nSpanish\nEspañol: 1-888-628-9454`}
              </Text>
            </View>
          ) : (
            <></>
          )}
        </View>

        {/* 3 */}
        <TouchableOpacity
          style={{
            borderBottomWidth: 2,
            marginHorizontal: '10%',
            marginTop: 20,
            flexDirection: 'row',
          }}
          onPress={() => {
            let temp = categories;
            temp[2] = !temp[2];
            setCategories(temp);
            setRefresh(!refresh);
          }}>
          <Text style={{flex: 6, color: 'black', fontSize: 15}}>
          National Suicide Prevention Lifeline 24/7
          </Text>
          <MaterialIcons
            style={{color: 'black', flex: 1}}
            name={categories[2] ? 'add' : 'remove'}
            size={20}
          />
        </TouchableOpacity>
        <View>
          {categories[2] ? (
            <View>
              <Text style={[styles.italic]}>
                {`Provides free and confidential support to individuals in suicidal crisis or emotional distress.`}
              </Text>
              <Text style={[styles.text]}>
                {`1-800-273-TALK (8255)\nCan text to 988\nSpanish\nEspañol: 1-888-628-9454`}
              </Text>
            </View>
          ) : (
            <></>
          )}
        </View>

        {/* 4 */}
        <TouchableOpacity
          style={{
            borderBottomWidth: 2,
            marginHorizontal: '10%',
            marginTop: 20,
            flexDirection: 'row',
          }}
          onPress={() => {
            let temp = categories;
            temp[3] = !temp[3];
            setCategories(temp);
            setRefresh(!refresh);
          }}>
          <Text style={{flex: 6, color: 'black', fontSize: 15}}>
          Crisis Text Line 24/7
          </Text>
          <MaterialIcons
            style={{color: 'black', flex: 1}}
            name={categories[3] ? 'add' : 'remove'}
            size={20}
          />
        </TouchableOpacity>
        <View>
          {categories[3] ? (
            <View>
              <Text style={[styles.italic]}>
                {`Offers free 24/7 text-based support for people in crisis, including those experiencing suicidal thoughts.`}
              </Text>
              <Text style={[styles.text]}>
                {`Text HOME to 741-741`}
              </Text>
            </View>
          ) : (
            <></>
          )}
        </View>


        {/* 5 */}
        <TouchableOpacity
          style={{
            borderBottomWidth: 2,
            marginHorizontal: '10%',
            marginTop: 20,
            flexDirection: 'row',
          }}
          onPress={() => {
            let temp = categories;
            temp[4] = !temp[4];
            setCategories(temp);
            setRefresh(!refresh);
          }}>
          <Text style={{flex: 6, color: 'black', fontSize: 15}}>
          Suicide Prevention Resource Center
          </Text>
          <MaterialIcons
            style={{color: 'black', flex: 1}}
            name={categories[4] ? 'add' : 'remove'}
            size={20}
          />
        </TouchableOpacity>
        <View>
          {categories[4] ? (
            <View>
              <Text style={[styles.italic]}>
                {`Provides resources and support for suicide prevention, including training programs and research.`}
              </Text>
              <Text style={[styles.text]}>
                {`www.sprc.org`}
              </Text>
            </View>
          ) : (
            <></>
          )}
        </View>

        {/* 6 */}
        <TouchableOpacity
          style={{
            borderBottomWidth: 2,
            marginHorizontal: '10%',
            marginTop: 20,
            flexDirection: 'row',
          }}
          onPress={() => {
            let temp = categories;
            temp[5] = !temp[5];
            setCategories(temp);
            setRefresh(!refresh);
          }}>
          <Text style={{flex: 6, color: 'black', fontSize: 15}}>
          National Institute of Mental Health
          </Text>
          <MaterialIcons
            style={{color: 'black', flex: 1}}
            name={categories[5] ? 'add' : 'remove'}
            size={20}
          />
        </TouchableOpacity>
        <View>
          {categories[5] ? (
            <View>
              <Text style={[styles.italic]}>
                {`Conducts research on mental health and provides information and resources for the public and healthcare professionals.`}
              </Text>
              <Text style={[styles.text]}>
                {`www.nimh.nih.gov`}
              </Text>
            </View>
          ) : (
            <></>
          )}
        </View>


        {/* 7 */}
        <TouchableOpacity
          style={{
            borderBottomWidth: 2,
            marginHorizontal: '10%',
            marginTop: 20,
            flexDirection: 'row',
          }}
          onPress={() => {
            let temp = categories;
            temp[6] = !temp[6];
            setCategories(temp);
            setRefresh(!refresh);
          }}>
          <Text style={{flex: 6, color: 'black', fontSize: 15}}>
          Pawley Hall Counseling Center
          </Text>
          <MaterialIcons
            style={{color: 'black', flex: 1}}
            name={categories[6] ? 'add' : 'remove'}
            size={20}
          />
        </TouchableOpacity>
        <View>
          {categories[6] ? (
            <View>
              <Text style={[styles.italic]}>
                {`Offers counseling and mental health services to students and faculties at Oakland University.`}
              </Text>
              <Text style={[styles.text]}>
                {`Oakland University\nPawley Hall\n(248) 370-2633`}
              </Text>
            </View>
          ) : (
            <></>
          )}
        </View>


        {/* 8 */}
        <TouchableOpacity
          style={{
            borderBottomWidth: 2,
            marginHorizontal: '10%',
            marginTop: 20,
            flexDirection: 'row',
          }}
          onPress={() => {
            let temp = categories;
            temp[7] = !temp[7];
            setCategories(temp);
            setRefresh(!refresh);
          }}>
          <Text style={{flex: 6, color: 'black', fontSize: 15}}>
          Oakland Family Services
          </Text>
          <MaterialIcons
            style={{color: 'black', flex: 1}}
            name={categories[7] ? 'add' : 'remove'}
            size={20}
          />
        </TouchableOpacity>
        <View>
          {categories[7] ? (
            <View>
              <Text style={[styles.italic]}>
                {`Provides counseling, education, and support services for individuals and families in the community`}
              </Text>
              <Text style={[styles.text]}>
                {`Rochester Hills\n(866) 903-8955`}
              </Text>
            </View>
          ) : (
            <></>
          )}
        </View>


        {/* 9 */}
        <TouchableOpacity
          style={{
            borderBottomWidth: 2,
            marginHorizontal: '10%',
            marginTop: 20,
            flexDirection: 'row',
          }}
          onPress={() => {
            let temp = categories;
            temp[8] = !temp[8];
            setCategories(temp);
            setRefresh(!refresh);
          }}>
          <Text style={{flex: 6, color: 'black', fontSize: 15}}>
          Community Health and Social services
          </Text>
          <MaterialIcons
            style={{color: 'black', flex: 1}}
            name={categories[8] ? 'add' : 'remove'}
            size={20}
          />
        </TouchableOpacity>
        <View>
          {categories[8] ? (
            <View>
              <Text style={[styles.italic]}>
                {`Offers a range of health and social services, including mental health support and counseling, to underserved populations in the community.`}
              </Text>
              <Text style={[styles.text]}>
                {`5635 West Fort St., Detroit, MI 48209\n(313) 849-3920`}
              </Text>
            </View>
          ) : (
            <></>
          )}
        </View>

        <Text style={{color: 'black', fontSize: 15, marginVertical:20}}>
          {`If you are suffering from a life-threatening injury or illness that requires emergent medical assistance OR if you are in a dangerous or unsafe situation that requires immediate police response:`}
        </Text>

        <Text style={{color: 'black', fontSize: 15, fontWeight:'bold', marginLeft:'10%', marginBottom:50}}>911</Text>

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
    // backgroundColor: '#f2f5f8',
    color: '#161924',
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    color: 'black',
    fontSize: 15,
    marginVertical: 15,
    marginHorizontal: '10%',
    // fontWeight: 'bold',
  },
  italic: {
    color: '#71a0ed',
    marginHorizontal: '10%',
    fontStyle: 'italic',
    fontSize: 15,
    marginBottom: -15,
  },
});

export default ContactUsScreen;
