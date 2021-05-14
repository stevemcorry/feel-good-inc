import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import { NavigationContainer, NavigationHelpersContext } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainPages from './src/layouts/MainPages';
import LoginPages from './src/layouts/LoginPages';
import Fire from './environment.config';
import { useFonts } from "expo-font";

const Stack = createStackNavigator();

function logout(navigation){
  Fire.auth().signOut().then(()=>{
    console.log('Logged out');
    navigation.navigate('Login');
  }).catch((err)=>{
    console.log('didn\'t log out ',err);
  })
}

export default function App() {
  const [loaded] = useFonts({
    Nunito: require("./assets/fonts/Nunito-Regular.ttf"),
    NunitoLight: require("./assets/fonts/Nunito-Light.ttf"),
    NunitoBold: require("./assets/fonts/Nunito-SemiBold.ttf"),
  });
  if (!loaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginPages} />
        <Stack.Screen name="Home" component={MainPages} options={({navigation}) => ({
            headerLeft: null,
            headerRight: () => <Button title="Logout" onPress={() => logout(navigation)} />
          })}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
