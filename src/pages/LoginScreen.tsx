import React from "react";
import { StyleSheet, Button, Text, View, TextInput } from "react-native";
import { LoginForm } from "../layouts/LoginForm";

export default function LoginScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
       <Text>Login to Happiness</Text>
       <View>
        <LoginForm navigation={navigation}/>
       </View>
    </View>
  );
}