import React, {useEffect, useState, useRef} from 'react';
import firestore from '@react-native-firebase/firestore';
import {Text, View, TouchableOpacity, Linking} from 'react-native';
import {runSeed} from '../utils/database';

const AddSeedScreen = () => {
  const [startDate, setStartDate] = useState(
    firestore.Timestamp.fromDate(new Date('2023-06-11T00:00:00')),
  );
  const [endDate, setEndDate] = useState(
    firestore.Timestamp.fromDate(new Date('2024-06-30T00:00:00')),
  );
  const fetchProlificUserInfo = async () => {
    const url = 'https://api.prolific.com/api/v1/participant-groups/';
    const apiToken = 'nIEmn8Iv9ig2BgYwB_La-4DuCGwHIJvnr1cj1P7AeHPM1Q6idJ2StUMa3QeERlZV2yMSgXmkh_7XMxxlB9OorYp-mrOkb8aa_DpWFpVU-rjhTcMXrrC-OAVj'; // Replace with your actual API token
  
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Token ${apiToken}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log(data); // Process your data here
    } catch (error) {
      console.error('Error fetching data from Prolific:', error);
    }
  };

  return (
    <View>
      {/* <TouchableOpacity
        onPress={() => {
          runSeed(startDate, endDate)
        }}>
        <Text style={{color:'red'}}>run seed</Text>
      </TouchableOpacity> */}
      {/* <TouchableOpacity onPress={() => {fetchProlificUserInfo()}}>
        <Text>ss</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default AddSeedScreen;
