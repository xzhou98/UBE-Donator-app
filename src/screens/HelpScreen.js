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

const HelpScreen = () => {
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
    <ScrollView style={{padding: '3%'}}>
      <View style={{alignItems: 'center'}}></View>
      <Text style={styles.basetext}>
        UBE is a ChatBot App for Data Donation. It embeds some basic
        functionalities and allows using text input, multiple-choice questions,
        and image upload. This page will help you in understanding how to use
        the functionalities.
      </Text>
      <Text style={[styles.basetext, {fontSize: 20}]}>How to use UBE?</Text>
      <View>
        {/* 1 */}
        <TouchableOpacity
          style={{
            borderBottomWidth: 0.5,
            // marginHorizontal: '5%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
          onPress={() => {
            let temp = categories;
            temp[0] = !temp[0];
            setCategories(temp);
            setRefresh(!refresh);
          }}>
          <Text style={styles.boldtext}>
            What are the Different Menu Options?
          </Text>
          <View style={{paddingTop: 10}}>
            <MaterialIcons
              style={{color: 'black'}}
              name={categories[0] ? 'remove' : 'add'}
              size={20}
            />
          </View>
        </TouchableOpacity>
        {categories[0] ? (
          <View>
            <Text style={styles.cate_title}>{`Home`}</Text>
            <Text
              style={
                styles.cate_text
              }>{`The home page of UBE. This is the page you see first after launching the app.`}</Text>

            <Text style={styles.cate_title}>{`Donation`}</Text>
            <Text
              style={
                styles.cate_text
              }>{`The donation ChatBot. This is where you can donate your data. `}</Text>

            <Text style={styles.cate_title}>{`Review`}</Text>
            <Text
              style={
                styles.cate_text
              }>{`The donation review page. This is where you can review and edit your donated data after submitting it.`}</Text>

            <Text style={styles.cate_title}>{`Help`}</Text>
            <Text
              style={
                styles.cate_text
              }>{`The contact resources page. This is where you can find contact resources to seek mental health and abuse help, and reach out to us with questions about UBE and the study.`}</Text>
          </View>
        ) : (
          <></>
        )}

        {/* 2 */}
        <TouchableOpacity
          style={{
            borderBottomWidth: 0.5,
            // marginHorizontal: '5%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
          onPress={() => {
            let temp = categories;
            temp[1] = !temp[1];
            setCategories(temp);
            setRefresh(!refresh);
          }}>
          <Text style={styles.boldtext}>
            What do the Buttons Mean in the ChatBot?{' '}
          </Text>
          <View style={{paddingTop: 10}}>
            <MaterialIcons
              style={{color: 'black'}}
              name={categories[1] ? 'remove' : 'add'}
              size={20}
            />
          </View>
        </TouchableOpacity>
        {categories[1] ? (
          <View>
            <Text style={styles.cate_title}>{`Skip Button`}</Text>
            <Text
              style={
                styles.cate_text
              }>{`I do not want to answer this question.`}</Text>

            <Text style={styles.cate_title}>{`Next Button`}</Text>
            <Text
              style={
                styles.cate_text
              }>{`I am done answering this question. Proceed to the next question.`}</Text>

            <Text style={styles.cate_title}>{`Back Button`}</Text>
            <Text
              style={
                styles.cate_text
              }>{`I made a mistake in the previous question. Go back to that question so I can re-do and fix it.`}</Text>

            <Text style={styles.cate_title}>{`Stop Session Button`}</Text>
            <Text
              style={
                styles.cate_text
              }>{`I want to stop donating immediately.\n\nI click “Exit Session Temporarily” or close the app to save my current donation progress and resume it a later time.\n\nI click “Quit Session” to stop the current, ongoing donation and delete all my donation progress. `}</Text>
          </View>
        ) : (
          <></>
        )}

        {/* 3 */}
        <TouchableOpacity
          style={{
            borderBottomWidth: 0.5,
            // marginHorizontal: '5%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
          onPress={() => {
            let temp = categories;
            temp[2] = !temp[2];
            setCategories(temp);
            setRefresh(!refresh);
          }}>
          <Text style={styles.boldtext}>
            How Do I Upload and Edit My Screenshots in UBE?
          </Text>
          <View style={{paddingTop: 10}}>
            <MaterialIcons
              style={{color: 'black'}}
              name={categories[2] ? 'remove' : 'add'}
              size={20}
            />
          </View>
        </TouchableOpacity>
        {categories[2] ? (
          <View>
            <Text
              style={
                styles.cate_title
              }>{`UBE allows you to upload your screenshots and then edit them in the app itself to hide anything you do not want to share with us.`}</Text>

            <Text
              style={[
                styles.cate_text,
                {marginTop: 10},
              ]}>{`Video Tutorial`}</Text>

            <Text></Text>

            <Text
              style={[
                styles.cate_text,
                {marginTop: 10},
              ]}>{`Please refer to the PDF you received before the study for more detailed steps regarding how to upload and edit your screenshots in UBE. If you are unable to use this feature, please contact us ASAP for help.`}</Text>
          </View>
        ) : (
          <></>
        )}

        <Text
          style={[
            styles.cate_title,
            {borderBottomWidth: 0.5},
          ]}>{`Didn’t find the answer to your question? For further questions regarding the app and study, contact:`}</Text>

        <Text style={styles.boldtext}>Dr. Melissa McDonald</Text>
        <Text
          style={[
            styles.cate_title,
          ]}>{`Associate Professor, Department of Psychology`}</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.cate_title]}>{`mmmcdonald@oakland.edu`}</Text>
          <TouchableOpacity
            onPress={() => {
              copyToClipboard('mmmcdonald@oakland.edu');
            }}>
            <MaterialIcons
              style={{color: 'black', marginTop: 15, marginLeft: 5}}
              name="content-copy"
              size={17}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    color: '#161924',
    fontSize: 20,
    fontWeight: 'bold',
  },
  basetext: {
    color: '#161924',
    fontSize: 16,
    fontWeight: '400',
    paddingTop: 10,
  },
  boldtext: {
    color: '#161924',
    fontSize: 16,
    fontWeight: 'bold',
    paddingTop: 10,
    flex: 2,
  },
  cate_title: {
    fontSize: 16,
    color: 'black',
    marginTop: 15,
  },
  cate_text: {
    fontSize: 14,
    color: '#33aad1',
  },
});

export default HelpScreen;
