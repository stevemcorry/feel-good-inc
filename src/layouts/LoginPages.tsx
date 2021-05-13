import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from '../pages/LoginScreen';
import RegistrationScreen from '../pages/RegistrationScreen';

const Tab = createBottomTabNavigator();

export default function LoginPages({ navigation }) {
    return (
      <Tab.Navigator backBehavior='none'>
        <Tab.Screen name="Login" component={LoginScreen} />
        <Tab.Screen name="Register" component={RegistrationScreen} />
      </Tab.Navigator>
    );
  }