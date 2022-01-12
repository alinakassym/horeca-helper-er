import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SignInScreen} from './SignInScreen';
import {SignUpScreen} from './SignUpScreen';
import {WelcomeScreen} from './WelcomeScreen';

const RootStack = createStackNavigator();

export const RootStackScreen = () => (
  <RootStack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <RootStack.Screen name="Welcome" component={WelcomeScreen} />
    <RootStack.Screen name="SignIn" component={SignInScreen} />
    <RootStack.Screen name="SignUp" component={SignUpScreen} />
  </RootStack.Navigator>
);
