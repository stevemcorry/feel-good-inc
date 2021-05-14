import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import Fire from '../../environment.config';
import { UserObj } from '../interfaces/userObj.interface';
import AsyncStorage from '@react-native-async-storage/async-storage';

class ProfileScreen extends React.Component {
  private styles = StyleSheet.create({
    mainText: {
        color: 'black',
        fontSize: 28,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        marginBottom: 10,
    },
    minorText: {
      color: 'black',
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    dataText: {
      color: 'black',
      fontSize: 20,
      textAlign: 'center',
      marginBottom: 15,
    },
  });

  constructor(props){
    super(props);
    this.state = {
        userName: '',
        firstName: '',
        lastName: '',
    }
  }

componentDidMount() {  
  this.getUserProfile();
}

askPerm() {
  Permissions.askAsync(Permissions.NOTIFICATIONS).then((res)=>{
    console.log('asked?', res)
  })
}
getPerm() {
  Permissions.getAsync(Permissions.NOTIFICATIONS).then((res)=>{
    if(res.status == "undetermined" ){
      console.log('oops');
      this.askPerm();
    }
  }).catch((err)=>{
    console.log('bad', err)
  })
}

askLocation() {
  Location.requestForegroundPermissionsAsync().then(res=>{
    console.log('asked', res)
    this.getLocationData();
  }).catch((err)=>{
    console.log('err', err)
  })
}

getLocation() {
  Location.getForegroundPermissionsAsync().then((res)=>{
    console.log('granted? ', res)
    if(!res.granted){
      this.askLocation();
    } else{
      this.getLocationData();
    }
  })  
}

getLocationData() {
  Location.getCurrentPositionAsync().then(res=>{
    console.log('lat, long', res.coords.latitude, res.coords.longitude);
    this.fetchWeather(res.coords.latitude, res.coords.longitude)
  })
}

fetchWeather(lat = 25, lon = 25) {
  let API_KEY = "bd983320b907dc1327135e27f143f442"
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`
  )
    .then(res => res.json())
    .then(json => {
      this.getTempAndWeather(json);
    });
}

getTempAndWeather(json){
  let tempF = (json.main.temp * (9/5)) + 32;
  let weather = json.weather[0].description;
  let city = json.name;
  console.log(tempF, weather, city)
}

async setStateMembers(snapshot: any): void {
  let profiles = [];
  let userName: string = '';
  let firstName: string = '';
  let lastName: string = '';
  const userObject: UserObj = JSON.parse(await AsyncStorage.getItem('@userObj'));
    snapshot.forEach(function(data) {
        profiles.push(data);
    });

    profiles.forEach(function(profile) {
      if (profile.child("userName").val() === userObject?.email) {
        userName = profile.child("userName").val();
        firstName = profile.child("firstName").val();
        lastName = profile.child("lastName").val();
      }
    })
  this.setState({userName, firstName, lastName})
}

async getUserProfile(){
  let uid = "ajsdkfla;jsdflka";  
  Fire.database().ref("/users/" + uid + "/profile/").once("value", (snapshot) => this.setStateMembers(snapshot));
}
render(){
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={this.styles.mainText}>Current User Profile</Text>
        <View>
          <Text style={this.styles.minorText}>First Name: </Text>
          <Text style={this.styles.dataText}>{this.state.firstName}</Text>
          <Text style={this.styles.minorText}>Last Name: </Text>
          <Text style={this.styles.dataText}>{this.state.lastName}</Text>
          <Text style={this.styles.minorText}>Username: </Text>
          <Text style={this.styles.dataText}>{this.state.userName}</Text>          
        </View>
        {/* <Button
          title="Notification Permissions"
          onPress={() => getPerm()}
        />
        <Button
          title="Location Permissions"
          onPress={() => getLocation()}
        /> */}
      </View>
    );
  }  
}

export default ProfileScreen