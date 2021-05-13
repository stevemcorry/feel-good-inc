import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import { NavigationContainer, NavigationHelpersContext } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainPages from './src/layouts/MainPages';
import TrackerScreen from './src/pages/TrackerScreen';

import Fire from './environment.config';
import RegistrationScreen from './src/pages/RegistrationScreen';
import AddTagsScreen from './src/pages/AddTagsScreen';


function login(navigation){
  Fire.auth().signInAnonymously().then((res)=>{
    console.log(res,'logged in?')
    navigation.navigate('Home')
  }).catch((err)=>{
    console.log('nope ',err)
  })
}
function logout(){
  Fire.auth().signOut().then((res)=>{
    console.log(res,'Logged out')
  }).catch((err)=>{
    console.log('didt log out ',err)
  })
}
function register(){

}

function LoginScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      <Text>Details Screen</Text>
      <Button
        title="Login"
        onPress={() => login(navigation)}
      />
      <Button
        title="Register"
        onPress={() => navigation.navigate('Register')}
      />
      <Button
        title="Logout"
        onPress={() => logout()}
      />
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={MainPages} />
        <Stack.Screen name="Register" component={RegistrationScreen} />
        <Stack.Screen name="Details" component={LoginScreen} />
        <Stack.Screen name="Tracker" component={TrackerScreen} />
        <Stack.Screen name="AddTags" component={AddTagsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
