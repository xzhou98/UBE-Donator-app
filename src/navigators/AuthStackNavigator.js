import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen, SignInScreen, SignUpScreen, ResetPasswordScreen} from '../screens';

const Stack = createStackNavigator();

function AuthStackNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name="SignInScreen" component={SignInScreen} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
            <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
        </Stack.Navigator>
    );
}

export default AuthStackNavigator