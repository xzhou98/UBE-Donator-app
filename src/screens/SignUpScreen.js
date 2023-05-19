import React, { Component, useState } from 'react'
import { Text, View, SafeAreaView, Alert } from 'react-native'
import FormButton from '../components/shared/FormButton';
import FormInput from '../components/shared/FormInput';
import { COLORS } from '../constants/theme';
import { signUp } from '../utils/auth';
import { createUser } from '../utils/database';

const SignUpScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleOnSubmit = () => {
        if (email != '' && password != '' && confirmPassword != '') {
            if (password == confirmPassword) {
                let success = signUp(email, password);
                if(success)
                    createUser(email);
            } else {
                Alert.alert('password did not match');
            }
        }
    }

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
            <Text style={{
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


            <View style={{ paddingTop: 10, width: '90%' }}>
                {/* Email */}
                <FormInput
                    // labelText="Email"
                    placeholderText="Enter your email"
                    onChangeText={value => setEmail(value)}
                    value={email}
                    keyboardType={'email-address'}
                />

                {/* Password */}
                <FormInput
                    // labelText="Password"
                    placeholderText="Enter your password"
                    onChangeText={value => setPassword(value)}
                    value={password}
                    secureTextEntry={true}
                />

                {/* Confirm Password */}
                <FormInput
                    // labelText="Confirm Password"
                    placeholderText="Enter your password again"
                    onChangeText={value => setConfirmPassword(value)}
                    value={confirmPassword}
                    secureTextEntry={true}
                />
            </View>


            <View style={{ width: '85%', paddingTop: 60, }}>
                <FormButton
                    labelText="Sign up"
                    handleOnPress={handleOnSubmit}
                />
            </View>
            {/* Submit button */}


            {/* Footer */}
            <View style={{ alignItems: 'center', marginTop: 20 }}>
                <Text style={{ fontWeight: 'bold' }}>Already have an account?</Text>
                <Text
                    style={{ marginLeft: 4, color: COLORS.green, fontWeight: 'bold' }}
                    onPress={() => navigation.navigate('SignInScreen')}>
                    Sign in here
                </Text>
            </View>
        </SafeAreaView>
    );
};

export default SignUpScreen;