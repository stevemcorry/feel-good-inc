import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from '../pages/LoginScreen';
import RegistrationScreen from '../pages/RegistrationScreen';

const Tab = createBottomTabNavigator();

export default function LoginPages({ navigation }) {
    return (
      <Tab.Navigator
        backBehavior="none"
        tabBarOptions={{
          labelStyle: {
            fontSize: 16,
            fontFamily: "NunitoBold",
            margin: 15,
          },
        }}
      >
        <Tab.Screen
          name="Login"
          component={LoginScreen}
          options={{ tabBarLabel: "Login" }}
        />
        <Tab.Screen
          name="Register"
          component={RegistrationScreen}
          options={{ tabBarLabel: "Register" }}
        />
      </Tab.Navigator>
    );
  }