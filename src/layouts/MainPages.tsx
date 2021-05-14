import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../pages/HomeScreen';
import ProfileScreen from '../pages/ProfileScreen';
import TrackerScreen from '../pages/TrackerScreen';
import ChartStackScreen from '../pages/ChartStackScreen';

const Tab = createBottomTabNavigator();

export default function MainPages({ navigation }) {
    return (
      <Tab.Navigator
        tabBarOptions={{
          labelStyle: {
            fontSize: 16,
            fontFamily: "NunitoBold",
            margin: 15,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ tabBarLabel: "Home" }}
        />
        <Tab.Screen
          name="Charts"
          component={ChartStackScreen}
          options={{ tabBarLabel: "Charts" }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ tabBarLabel: "Profile" }}
        />
        <Tab.Screen
          name="Tracker"
          component={TrackerScreen}
          options={{ tabBarLabel: "Tracker" }}
        />
      </Tab.Navigator>
    );
  }