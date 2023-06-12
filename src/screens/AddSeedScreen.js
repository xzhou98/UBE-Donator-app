import React, {useEffect, useState, useRef} from 'react';
import firestore from '@react-native-firebase/firestore';
import {
  Text,
  Image,
  View,
  Modal,
  FlatList,
  StyleSheet,
  TextInput,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {runSeed} from '../utils/database';

const AddSeedScreen = () => {
  const [startDate, setStartDate] = useState(
    firestore.Timestamp.fromDate(new Date('2023-06-11T00:00:00')),
  );
  const [endDate, setEndDate] = useState(
    firestore.Timestamp.fromDate(new Date('2023-06-30T00:00:00')),
  );

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          runSeed(startDate, endDate)
        }}>
        <Text>run seed</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddSeedScreen;
