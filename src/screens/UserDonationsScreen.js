import React, {useEffect, useState, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  FlatList,
  Button,
  Pressable,
  ScrollView,
  TextInput,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {
  getUserInfoByEmail,
  getAllSessions,
  getAllSessionsByUserId,
  getAllUserInfo,
  getAllQuestionsFromAllSessions,
  getAllanswersFromAllSessions
} from '../utils/database';
import * as XLSX from 'xlsx';

// import { showNotification, handle5SecNotification, handleCancel, handleScheduleNotification } from '../views/notification.android'
// import DatePicker from 'react-native-date-picker';
// import moment from 'moment';
// import Dialog from "react-native-dialog";

const UserDonationsScreen = ({navigation}) => {
  const [allUser, setAllUser] = useState();
  const [render, setRender] = useState(false);
  const [userList, setUserList] = useState([]);
  const [text, setText] = React.useState('');
  const flatListRef = useRef();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  // Derived data for current page
  const paginatedData = userList.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const fetchData = async () => {
    let all_user = await getAllUserInfo();
    setAllUser(all_user);
    setUserList(all_user);
    setRender(true);
  };

  const searchUser = () => {
    let list = [];
    if (text.length != 0) {
      allUser.forEach(user => {
        if (user.email.includes(text)) {
          list.push(user);
        }
      });
      setUserList(list);
      setCurrentPage(1);
    } else {
      setUserList(allUser);
      setCurrentPage(1);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', fetchData);

    fetchData();
    return unsubscribe;
  }, [navigation]);

  const exportData = async() => {
    try {

      let allAnswers = await getAllanswersFromAllSessions()
      for (let i = 0; i < allAnswers.length; i++) {

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(json);

        for (let j = 0; j < allAnswers[i].length; j++) {
          const element = array[j];
          
        }
        const json = JSON.stringify(allAnswers[i])

        XLSX.utils.book_append_sheet(wb, ws, 'Answers');        
      }

      console.log(allAnswers[0].length);

    } catch (error) {
      console.log(error);
    }

  };

  return render ? (
    <View>
      {/* Search Bar */}
      <View
        style={{
          height: '10%',
          flexDirection: 'row',
          alignItems: 'center',
          margin: 20,
        }}>
        <TextInput
          style={styles.searchBar}
          placeholder="search user with email address"
          placeholderTextColor="black"
          onChangeText={text => {
            setText(text);
          }}
          value={text}
        />
        <Pressable
          style={({pressed}) => [
            styles.searchButton,
            {
              opacity: pressed ? 0.6 : 1, // Lower the opacity if pressed
            },
          ]}
          onPress={() => {
            searchUser();
          }}>
          <Text style={{color: 'white', fontSize: 18}}>Search</Text>
        </Pressable>
      </View>

      <FlatList
        style={{height: '75%'}}
        ref={flatListRef}
        data={paginatedData}
        onContentSizeChange={() => flatListRef.current.scrollToEnd()}
        showsVerticalScrollIndicator={true}
        renderItem={({item, index}) => (
          <View key={index} style={{flexDirection: 'column'}}>
            <View
              style={{
                flexDirection: 'row',
                borderWidth: 0.5,
                height: 80,
                borderColor: 'gray',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <View style={{flex: 3}}>
                {item.num == undefined || item.num < 2 ? (
                  <Text style={{color: 'black', marginLeft: 20, fontSize: 18}}>
                    {item.email}
                  </Text>
                ) : (
                  <Text style={{color: 'red', marginLeft: 20, fontSize: 18}}>
                    {item.email}
                  </Text>
                )}
              </View>
              <Pressable
                style={({pressed}) => [
                  styles.reviewButton,
                  {
                    opacity: pressed ? 0.6 : 1, // Lower the opacity if pressed
                  },
                ]}
                onPress={() => {
                  navigation.navigate('ReviewScreen2', {user: item});
                }}>
                <Text style={{color: 'white', fontSize: 16}}>Review</Text>
              </Pressable>
            </View>
          </View>
        )}
      />

      <View
        style={{
          height: '15%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 20,
        }}>
        <Button
          title="Previous"
          onPress={() => {
            if (currentPage > 1) {
              setCurrentPage(prev => prev - 1);
            }
          }}
          disabled={currentPage === 1}
        />
        <Button
          title="Export"
          onPress={() => {
            Alert.alert(
              'Export Data',
              'Are you sure you want to export all donation data?',
              [
                {
                  text: 'Confirm',
                  onPress: () => {exportData()},
                },
                {text: 'Cancel', style: 'cancel'},
              ],
            );
          }}
        />
        <Button
          title="Next"
          onPress={() => {
            if (currentPage < Math.ceil(userList.length / pageSize)) {
              setCurrentPage(prev => prev + 1);
            }
          }}
          disabled={currentPage === Math.ceil(userList.length / pageSize)}
        />
      </View>

      {/* {console.log(allUser)} */}
    </View>
  ) : (
    <></>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    // borderColor: 'grey',
    // borderWidth: 1,
    borderWidth: 1.3,
    height: 60,
    borderColor: 'gray',
    borderRadius: 4,
    flex: 5,
    color: 'black',
    marginRight: 20,

    // alignItems: 'center',
  },
  searchButton: {
    flex: 2,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7BB2BA',
    borderRadius: 4,
  },
  exportButton: {
    flex: 2,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    borderRadius: 4,
  },
  reviewButton: {
    flex: 1,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7BB2BA',
    borderRadius: 4,
  },
});

export default UserDonationsScreen;
