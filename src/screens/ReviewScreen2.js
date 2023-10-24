import React, {useEffect, useState, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  FlatList,
  Button,
  ScrollView,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {
  getUserInfoByEmail,
  getAllQuestions,
  getAllSessions,
  getAllSessionsByUserId,
} from '../utils/database';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ReviewScreen2 = ({navigation, route}) => {
  const [user, setUser] = useState(route.params.user);
  const [refresh, setRefresh] = useState(false);
  const [render, setRender] = useState(false);
  const [sessions, setSessions] = useState(false);
  const [allAnswers, setAllAnswers] = useState();
  const flatListRef = useRef();
  const [load, setLoad] = useState(false);

  const onAuthStateChanged = async user => {
    try {
      if (user == null) {
        setRender(false);
      } else {
        let allSessions = await getAllSessions(user.id);
        setSessions(allSessions);
        console.log(user.id);
        // console.log(allSessions);
        let allAnswers = await getAllSessionsByUserId(user.id);
        setAllAnswers(allAnswers);
        setLoad(false);
        setRender(true);
      }
    } catch (error) {
      Alert.alert(error);
    }
  };

  const type = (index, item) => {
    if (item.dateType == 0) {
      return (
        <View style={styles.session}>
          <Text style={styles.bold}>Session {item.num}</Text>
          <Text style={styles.slim}>
            {' '}
            {item.startDate} to {item.endDate}
          </Text>
        </View>
      );
    } else if (item.dateType == 1) {
      return (
        <View style={styles.session1}>
          <Text style={styles.bold}>Session {item.num}</Text>
          <Text style={styles.slim}>
            {' '}
            {item.startDate} to {item.endDate}
          </Text>
        </View>
      );
    } else {
      return (
        <View style={styles.session2}>
          <Text style={styles.bold}>Session {item.num}</Text>
          <Text style={styles.slim}>
            {' '}
            {item.startDate} to {item.endDate}
          </Text>
        </View>
      );
    }
  };

  useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {
      const subscriber = onAuthStateChanged(user);
      return subscriber;
    });

    if (load) {
      const subscriber = onAuthStateChanged(user);
      return subscriber;
    }
  }, [refresh, navigation]);

  return render ? (
    <View>
      <TouchableOpacity
        style={{ marginLeft:20}}
        onPress={() => {
          navigation.goBack();
        }}>
        <MaterialIcons style={{color: 'black'}} name="arrow-back" size={30} />
      </TouchableOpacity>

      <View style={{alignItems: 'center'}}>
        {sessions.length == 0 ? (
          <View>
            <Text
              style={{
                fontSize: 20,
                color: 'black',
                fontWeight: 'bold',
                marginTop: '20%',
              }}>
              Please start your first donation here
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#7db1b7',
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderRadius: 7,
                }}
                onPress={() => {
                  navigation.navigate('Donation');
                }}>
                <Text style={styles.buttonText}>Start donating</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <></>
        )}
        <FlatList
          ref={flatListRef}
          data={sessions}
          onContentSizeChange={() => flatListRef.current.scrollToEnd()}
          showsVerticalScrollIndicator={true}
          renderItem={({item, index}) => (
            <View key={index} style={{flexDirection: 'column'}}>
              <View style={{alignItems: 'center'}}>
                {type(index, item)}
                {allAnswers[index].map((element, index2) => {
                  if (element.sessionId == item.id)
                    return (
                      <View key={index2} style={styles.answer}>
                        <View style={{flexDirection: 'column', flex: 3}}>
                          <Text style={styles.answerTitle}>
                            {allAnswers[index].length - index2}st submission
                          </Text>
                          <Text style={styles.answerDate}>{element.date}</Text>
                        </View>
                        <View
                          style={{
                            flex: 2,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          {/* <TouchableOpacity onPress={() => { setControler(!controler); setAnswersId(element.id); setSessionId(item.id) }}> */}
                          <TouchableOpacity
                            onPress={() => {
                              navigation.navigate('SessionDetailScreen', {
                                answerId: element.id,
                                sessionId: item.id,
                              });
                            }}>
                            {/* <TouchableOpacity onPress={() => { console.log(element.id); console.log(item.id); }}> */}
                            <Text style={styles.button}>Review</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    );
                })}
              </View>
            </View>
          )}
        />
      </View>
    </View>
  ) : (
    <View style={{alignItems: 'center'}}>
      <Text style={styles.title}>
        Loading. If screen is stuck, please try to press the button below
      </Text>
      <Button
        onPress={() => {
          setRefresh(!refresh);
          setLoad(true);
        }}
        title="Refresh"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: '#161924',
    fontSize: 15,
    fontWeight: 'bold',
  },
  answer: {
    width: '80%',
    height: 65,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,

    borderRadius: 7,
    marginTop: 10,
    flexDirection: 'row',
    backgroundColor: '#7BB2BA',
  },
  answerTitle: {
    marginTop: 10,
    marginHorizontal: 10,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
  },
  answerDate: {
    marginTop: 4,
    marginHorizontal: 10,
    color: '#696969',
    fontSize: 13,
  },
  session: {
    height: 45,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 5,

    borderRadius: 7,
    marginTop: 25,
    flexDirection: 'row',
    backgroundColor: '#7BB2BA',
  },
  session1: {
    height: 45,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 5,

    borderRadius: 7,
    marginTop: 25,
    flexDirection: 'row',
    backgroundColor: '#D6E9EB',
  },
  session2: {
    height: 45,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 5,

    borderRadius: 7,
    marginTop: 25,
    flexDirection: 'row',
    backgroundColor: '#CDD8D9',
  },
  bold: {
    marginTop: 10,
    marginHorizontal: 10,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 17,
  },
  slim: {
    marginTop: 14,
    marginHorizontal: 10,
    color: '#696969',
    fontSize: 13,
  },
  button: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,

    textAlignVertical: 'center',
    textAlign: 'center',

    borderRadius: 7,
    backgroundColor: 'white',
    color: 'black',
    fontSize: 13,
    fontWeight: 'bold',
    height: 40,
    width: 70,
  },
  buttonContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
  },
});

export default ReviewScreen2;
