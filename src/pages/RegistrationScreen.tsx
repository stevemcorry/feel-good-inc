import React from "react";
import { StyleSheet, Button, Text, View, TextInput, TouchableWithoutFeedback, Keyboard } from "react-native";
import { RegistrationForm } from "../layouts/RegistrationForm";

export default function RegistrationScreen({ navigation }) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.mainText}>Please Fill Out The Following:</Text>
        <View>
          <RegistrationForm navigation={navigation}/>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  error: {
      color: 'red',
      marginBottom: 15,
  },
  mainText: {
    color: 'black',
    fontSize: 28,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
 })