import React, {Component, useState} from 'react';
import {Text, View, SafeAreaView, Alert, TouchableOpacity} from 'react-native';
import FormButton from '../components/shared/FormButton';
import FormInput from '../components/shared/FormInput';
import {COLORS} from '../constants/theme';
import {signUp} from '../utils/auth';
import {createUser} from '../utils/database';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const SignUpScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [statement, setStatement] = useState(true);

  const handleOnSubmit = async () => {
    if (email != '' && password != '' && confirmPassword != '') {
      if (statement) {
        if (password == confirmPassword) {
          try {
            // let success = await signUp(email, password);
            // if (success) await createUser(email);
          } catch (error) {
            console.log(error);
          }
        } else {
          Alert.alert('password did not match');
        }
      } else {
        Alert.alert('Please agree with the statement below');
      }
    } else {
      Alert.alert('Email and password missing');
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 20,
      }}>
      {/* Header */}
      <Text
        style={{
          fontSize: 35,
          color: COLORS.black,
          fontWeight: 'bold',
          paddingTop: 40,
        }}>
        UBE Data
      </Text>
      <Text
        style={{
          fontSize: 20,
          color: COLORS.black,
          fontWeight: 'bold',
          paddingTop: 15,
          marginVertical: 10,
        }}>
        Sign up with Email
      </Text>

      <View style={{paddingTop: 10, width: '90%'}}>
        {/* Email */}
        <Text style={{color: 'black'}}>Email</Text>
        <FormInput
          // labelText="Email"
          placeholderText="Enter your email"
          onChangeText={value => setEmail(value)}
          value={email}
          keyboardType={'email-address'}
        />

        {/* Password */}
        <Text style={{color: 'black'}}>Password</Text>
        <FormInput
          // labelText="Password"
          placeholderText="Must contain at least 6 characters"
          onChangeText={value => setPassword(value)}
          value={password}
          secureTextEntry={true}
        />

        {/* Confirm Password */}
        <Text style={{color: 'black'}}>Confirm Password</Text>
        <FormInput
          // labelText="Confirm Password"
          placeholderText="Enter your password again"
          onChangeText={value => setConfirmPassword(value)}
          value={confirmPassword}
          secureTextEntry={true}
        />
      </View>

      {/* <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingTop: 10,
          width: '80%',
        }}>
        <TouchableOpacity
          onPress={() => {
            setStatement(!statement);
          }}>
          {statement ? (
            <MaterialIcons
              style={{color: 'black'}}
              name="check-box"
              size={20}
            />
          ) : (
            <MaterialIcons
              style={{color: 'black'}}
              name="check-box-outline-blank"
              size={20}
            />
          )}
        </TouchableOpacity>
        <Text style={{color: 'black', paddingLeft: 10}}>
          I consent to Ube collecting, and using my data as described in the
          Privacy Policy.{' '}
        </Text>
      </View> */}

      <View style={{width: '85%', paddingTop: 30}}>
        {statement ? (
          <FormButton labelText="Sign up" handleOnPress={handleOnSubmit} />
        ) : (
          <FormButton
            style={{backgroundColor: '#d1cbcb', borderColor: '#d1cbcb'}}
            labelText="Sign up"
            handleOnPress={handleOnSubmit}
          />
        )}
      </View>
      {/* Submit button */}

      {/* Footer */}
      <View style={{alignItems: 'center', marginTop: 20}}>
        <Text style={{fontWeight: 'bold'}}>Already have an account?</Text>
        <Text
          style={{marginLeft: 4, color: COLORS.green, fontWeight: 'bold'}}
          onPress={() => navigation.navigate('SignInScreen')}>
          Sign in here
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;
