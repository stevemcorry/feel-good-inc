import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function ProfileScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>This is the profile screen nerds</Text>
        <Button
          title="Go to details"
          onPress={() => navigation.navigate('Details')}
        />
        <Button
          title="Go to tracker"
          onPress={() => navigation.navigate('Tracker')}
        />
      </View>
    );
  }