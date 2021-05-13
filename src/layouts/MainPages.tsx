import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../pages/HomeScreen';
import ProfileScreen from '../pages/ProfileScreen';
import TrackerScreen from '../pages/TrackerScreen';

const Tab = createBottomTabNavigator();



export default function MainPages({ navigation }) {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Tracker" component={TrackerScreen} />
      </Tab.Navigator>
    );
  }