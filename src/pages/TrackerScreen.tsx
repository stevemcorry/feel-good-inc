import React from 'react';
import Fire from '../../environment.config';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function TrackerScreen() {
    const uid = "ajsdkfla;jsdflka";
    const setMood = (mood: number) => {
        console.log(mood);
        Fire.database().ref("/users/" + uid + "/Days/mood/").set(mood);
    }
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>How did you feel today?</Text>
        <Button
          title="Great"
          onPress={() => setMood(5)}
        />
        <Button
          title="Good"
          onPress={() => setMood(4)}
        />
        <Button
          title="Ok"
          onPress={() => setMood(3)}
        />
        <Button
          title="Been better"
          onPress={() => setMood(2)}
        />
        <Button
          title="Not well"
          onPress={() => setMood(1)}
        />
      </View>
    );
  }