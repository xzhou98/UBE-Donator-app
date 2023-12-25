import React, {Component, useState} from 'react';
import {Text, View, SafeAreaView, Alert, ScrollView} from 'react-native';
import FormButton from '../components/shared/FormButton';
import FormInput from '../components/shared/FormInput';
import {COLORS} from '../constants/theme';
import {signIn} from '../utils/auth';

const SignInScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleOnSubmit = () => {
    // Alert.alert(email)
    if (email != '' && password != '') {
      signIn(email, password);
    }
  };

  return (
    <ScrollView style={{backgroundColor: COLORS.white,  padding: '3%'}}>
      <SafeAreaView
        style={{
          backgroundColor: COLORS.white,
          flex: 1,
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
            // marginVertical: 32,
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
          Sign in with Email
        </Text>

        <View style={{paddingTop: 10, width: '90%'}}>
          {/* Email */}
          <Text style={{color: 'black', marginBottom: -10, fontSize: 18}}>
            Email
          </Text>
          <FormInput
            placeholderText="Enter your email address"
            onChangeText={value => setEmail(value)}
            value={email}
            keyboardType={'email-address'}
          />
          {/* Password */}
          <Text
            style={{
              paddingTop: 10,
              color: 'black',
              marginBottom: -10,
              fontSize: 18,
            }}>
            Password
          </Text>
          <FormInput
            placeholderText="Must contain at least 6 characters"
            onChangeText={value => setPassword(value)}
            value={password}
            secureTextEntry={true}
          />
          <Text
            style={{
              marginLeft: 4,
              color: COLORS.green,
              fontWeight: 'bold',
              fontSize: 15,
            }}
            onPress={() => navigation.navigate('ResetPasswordScreen')}>
            Forgot your password?
          </Text>
        </View>

        {/* Submit button */}
        <View style={{width: '85%', paddingTop: 70}}>
          <FormButton labelText="Submit" handleOnPress={handleOnSubmit} />
        </View>

        {/* Footer */}
        <View style={{alignItems: 'center', marginTop: 30}}>
          <Text style={{fontWeight: 'bold', color: 'grey', fontSize: 18}}>
            Not yet have an account?
          </Text>
          <Text
            style={{
              marginLeft: 4,
              color: COLORS.green,
              fontWeight: 'bold',
              fontSize: 18,
            }}
            onPress={() => navigation.navigate('SignUpScreen')}>
            Sign up here
          </Text>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default SignInScreen;
