import React, {  useState } from 'react'
import { Text, View, SafeAreaView, Alert } from 'react-native'
import FormButton from '../components/shared/FormButton';
import FormInput from '../components/shared/FormInput';
import { COLORS } from '../constants/theme';
import { resetPassword } from '../utils/auth';

const ResetPasswordScreen = ({ navigation }) => {

    const [email, setEmail] = useState('')
    const [confirmEmail, setConfirmEmail] = useState('')

    const handleOnSubmit = () => {

        if (email != '' ) {
            resetPassword(email);
            Alert.alert("Password reset email was sent to you. Please check your email box.")
        }else {
            Alert.alert("Please enter your address.")
        }
    }

    return (
        <SafeAreaView
            style={{
                backgroundColor: COLORS.white,
                flex: 1,
                alignItems: 'center',
                justifyContent: 'flex-start',
                padding: 20,
            }}>

            {/* Header */}

            <Text style={{
                fontSize: 35,
                color: COLORS.black,
                fontWeight: 'bold',
                paddingTop: 100,
                // marginVertical: 32,
            }}>
                UBE Data
            </Text>
            <Text style={{
                fontSize: 20,
                color: COLORS.black,
                fontWeight: 'bold',
                paddingTop: 15,
                marginVertical: 20,
            }}>
                Please enter your address.
            </Text>

            <View style={{ paddingTop: 20, width: '85%' }}>
                {/* Email */}
                <FormInput
                    placeholderText="Enter your email address"
                    onChangeText={value => setEmail(value)}
                    value={email}
                    keyboardType={'email-address'}
                />
                {/* Password
                <FormInput
                    placeholderText="Confirm your email address"
                    onChangeText={value => setConfirmEmail(value)}
                    value={confirmEmail}
                    secureTextEntry={true}
                /> */}

            </View>


            {/* Submit button */}
            <View style={{ width: '85%', paddingTop: 30, }}>
                <FormButton
                    labelText="Submit"
                    handleOnPress={handleOnSubmit}
                />
            </View>


            {/* Footer */}
            <View style={{ alignItems: 'center', marginTop: 30 }}>
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

export default ResetPasswordScreen;


