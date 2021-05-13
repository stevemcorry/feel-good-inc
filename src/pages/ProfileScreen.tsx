import React from 'react';
import { StyleSheet, Text, View, Button, Linking } from 'react-native';

import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

// import { API_KEY } from '../../environment.config';


function askPerm() {
  Permissions.askAsync(Permissions.NOTIFICATIONS).then((res)=>{
    console.log('asked?', res)
  })
}
function getPerm() {
  Permissions.getAsync(Permissions.NOTIFICATIONS).then((res)=>{
    if(res.status == "undetermined" ){
      console.log('oops');
      askPerm();
    }
  }).catch((err)=>{
    console.log('bad', err)
  })
}

function askLocation() {
  Location.requestForegroundPermissionsAsync().then(res=>{
    console.log('asked', res)
    getLocationData();
  }).catch((err)=>{
    console.log('err', err)
  })
}
function getLocation() {
  Location.getForegroundPermissionsAsync().then((res)=>{
    console.log('granted? ', res)
    if(!res.granted){
      askLocation();
    } else{
      getLocationData();
    }
  })
  
}

function getLocationData() {
  Location.getCurrentPositionAsync().then(res=>{
    console.log('lat, long', res.coords.latitude, res.coords.longitude);
    fetchWeather(res.coords.latitude, res.coords.longitude)
  })
}

function fetchWeather(lat = 25, lon = 25) {
  let API_KEY = "bd983320b907dc1327135e27f143f442"
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`
  )
    .then(res => res.json())
    .then(json => {
      getTempAndWeather(json);
    });
}
function getTempAndWeather(json){
  let tempF = (json.main.temp * (9/5)) + 32;
  let weather = json.weather[0].description;
  console.log(tempF, weather)
}

export default function ProfileScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>This is the profile screen nerds</Text>
        <Button
          title="Go to settings"
          onPress={() => Linking.openURL('app-settings:')}
        />
        <Button
          title="Notification Permissions"
          onPress={() => getPerm()}
        />
        <Button
          title="Location Permissions"
          onPress={() => getLocation()}
        />
      </View>
    );
  }