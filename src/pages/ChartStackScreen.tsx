import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ChartsScreen from './ChartsScreen';
import DayDetailsScreen from './DayDetailsScreen';

const ChartStack = createStackNavigator();

export default function ChartStackScreen() {
    return (
      <ChartStack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <ChartStack.Screen name="Chart" component={ChartsScreen} />
        <ChartStack.Screen name="DayDetails" component={DayDetailsScreen} />
      </ChartStack.Navigator>
    );
  }