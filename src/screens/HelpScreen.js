import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Clipboard from '@react-native-clipboard/clipboard';

const HelpScreen = () => {
  const [categories, setCategories] = useState([
    true,
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
    <ScrollView style={{paddingHorizontal: '3%'}}>
      <View style={{alignItems: 'center'}}></View>
      <Text style={styles.basetext}>
        UBE is a ChatBot App for Data Donation. It embeds some basic
        functionalities and allows text input, multiple-choice questions,
        and image upload. This page will help you in understanding how to use
        the functionalities.
      </Text>
      <Text style={[styles.basetext, {fontSize: 20}]}>How to use UBE:</Text>
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
              }>{`The contact resources page. This is where you can find contact information to 1) ask questions about how to use UBE 2) ask questions about your participation in this study, 3) seek help or advice for a personal mental health concern.`}</Text>
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
            <Text style={styles.cate_title}>{`Skip`}</Text>
            <Text
              style={
                styles.cate_text
              }>{`I choose not to answer this question.`}</Text>

            <Text style={styles.cate_title}>{`Next`}</Text>
            <Text
              style={
                styles.cate_text
              }>{`I am done answering this question. Proceed to the next question.`}</Text>

            <Text style={styles.cate_title}>{`Back`}</Text>
            <Text
              style={
                styles.cate_text
              }>{`I want to go back to the last question so I can re-do it.`}</Text>

            <Text style={styles.cate_title}>{`Stop Session`}</Text>
            <Text
              style={
                styles.cate_text
              }>{`I want to pause or stop donating immediately.`}</Text>

            <Text style={styles.cate_title}>{`Exit Session Temporarily`}</Text>
            <Text
              style={styles.cate_text}>{`I want to pause my donation.`}</Text>

            <Text style={styles.cate_title}>{`Quit Session`}</Text>
            <Text
              style={
                styles.cate_text
              }>{`I want to stop donating and permanently delete my progress for the current donation.`}</Text>
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

            <View style={{margin: 10}}>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    fontSize: 16,
                    color: 'black',
                    marginLeft: 10,
                    marginRight: 5,
                    marginVertical: 5,
                  }}>
                  1.
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: 'black',
                    marginRight: 10,
                    marginVertical: 5,
                  }}>{`To upload screenshots, press on the "+ add image" button. Find the image you'd like to share, press on the circle “o” on the images to select them, click done. `}</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    fontSize: 16,
                    color: 'black',
                    marginLeft: 10,
                    marginRight: 5,
                    marginVertical: 5,
                  }}>
                  2.
                </Text>

                <Text
                  style={{
                    fontSize: 16,
                    color: 'black',
                    marginRight: 10,
                    marginVertical: 5,
                  }}>{`To edit and hide elements on the image, go to the next step > latest uploaded image thumbnail/s you see >  click picture icon for stickers, and paint brush to draw. > click save when done.*"`}</Text>
              </View>
            </View>

            {/* <Text
              style={[
                styles.cate_text,
                {marginTop: 10},
              ]}>{`Video Tutorial`}</Text>

            <TouchableOpacity
              onPress={() => {
                Linking.openURL(
                  'https://youtu.be/YGCuaQSTyss?t=301&si=OaFkAhWDpMYJMhwg',
                );
              }}>
              <Text
                style={{
                  marginTop: 10,
                  color: '#1f28fc',
                  fontSize: 16,
                }}>
                Embed youtube video
              </Text>
            </TouchableOpacity>

            <Text
              style={[
                styles.cate_text,
                {marginTop: 10},
              ]}>{`Please refer to the PDF you received before the study for more detailed steps regarding how to upload and edit your screenshots in UBE. If you are unable to use this feature, please contact us ASAP for help.`}</Text>
           */}
          </View>
        ) : (
          <></>
        )}

        <Text
          style={[
            styles.cate_title,
            {paddingBottom: 10},
          ]}>{`Didn’t find the answer to your question? For further questions regarding the app and study;`}</Text>

        <View
          style={{
            marginHorizontal: 5,
            borderTopWidth: 0.5,
            borderBottomWidth: 0.5,
            padding: 10,
            flexDirection: 'column',
          }}>
          <View
            style={{
              paddingBottom: 10,
              flexDirection: 'row',
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 16,
              }}>
              1. Refer to this{' '}
            </Text>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(
                  'https://docs.google.com/document/d/1_lSRj0hi4IyGQb3wkCI-Q1XwgZXVtTt_tnvN_b-Hn9E/edit?usp=sharing',
                );
              }}>
              <Text
                style={{
                  color: '#1f28fc',
                  fontSize: 16,
                }}>
                information Google Doc
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              paddingBottom: 10,
              flexDirection: 'row',
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 16,
              }}>
              2. Refer to this{' '}
            </Text>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL('https://youtu.be/7a29MPrR764');
              }}>
              <Text
                style={{
                  color: '#1f28fc',
                  fontSize: 16,
                }}>
                information youtube video
              </Text>
            </TouchableOpacity>
          </View>

          <Text
            style={{
              color: 'black',
              fontSize: 16,
            }}>
            Still have question? Please contact{' '}
          </Text>
        </View>

        <Text style={styles.boldtext}>Dr. Melissa McDonald</Text>
        <Text
          style={[
            styles.cate_title,
          ]}>{`Associate Professor, Department of Psychology`}</Text>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={[
              styles.cate_title,
            ]}>{`mmmcdonald@oakland.edu\n\n\n\n\n\n\n\n`}</Text>
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
