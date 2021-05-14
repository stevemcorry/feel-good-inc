import React from "react";
import { StyleSheet, Button, Text, View, TextInput, TouchableWithoutFeedback, Keyboard } from "react-native";
import { LoginForm } from "../layouts/LoginForm";

export default function LoginScreen({ navigation }) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>      
        <Text style={styles.mainText}>Login to Happiness</Text>
        <View>        
            <LoginForm navigation={navigation}/>        
        </View>      
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  error: {
      color: 'red'
  },
  mainText: {
    color: 'black',
    fontSize: 28,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginBottom: 10
  },
 })