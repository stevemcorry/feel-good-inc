import React from 'react';
import Fire from '../../environment.config';
import { StyleSheet, Text, View, Button, TouchableOpacity, Pressable } from 'react-native';
import AddTagsScreen from './AddTagsScreen';
import UserDayObj from '../shared/UserDayObj.model';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserObj from '../interfaces/userObj.interface';


function getFormattedDate(date) {
  var year = date.getFullYear();

  var month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : '0' + month;

  var day = date.getDate().toString();
  day = day.length > 1 ? day : '0' + day;
  
  return month + '/' + day + '/' + year;
}

class TrackerScreen extends React.Component{

  constructor(props){
      super(props);
      this.state = {
          tags: null,
          mood: 0,
          location: "",
          weather: "",
          temp: 0,
          dataEntered: false
      }
  }

  setMood = (mood: number) => {
      console.log(mood);
      this.setState({mood})
  }

  componentDidMount() {
    if(this.state.location == ""){
      this.getLocation();
    }
    let uid = "ajsdkfla;jsdflka";
    let ref = Fire.database().ref("/users/" + uid + "/Days");
    let self = this;
    ref.orderByChild('date').limitToLast(1).on("child_added", function(snapshot){
      var data = snapshot.val();
      console.log(data);
      if(data.date == getFormattedDate(new Date())){
        alert('you already entered data for today.');
        self.setState({dataEntered: true});
      }
    });
    this.getUserObj();
  }

  sendObj = () => {
    if(this.state.mood == 0){
      alert('Please select how you felt today');
      return;
    }
    let date = getFormattedDate(new Date());
    let usr = new UserDayObj(this.state.mood, this.state.tags, date, this.state.temp, this.state.weather, this.state.location);
    let uid = "ajsdkfla;jsdflka";
    Fire.database().ref("/users/" + uid + "/Days").push(usr);
  }

  handleCallback = (childData) =>{
    this.setState({tags: childData})
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
    let tempF = Math.round((json.main.temp * (9/5)) + 32)
    let weather = json.weather[0].description;
    let city = json.name;
    console.log(tempF, weather, city)
    this.setState({
      temp: tempF,
      weather: weather,
      location: city
    })
  }

  async getUserObj() {
    try {
      // const value = await AsyncStorage.getItem('@userObj')
      const jsonValue: UserObj = await AsyncStorage.getItem('@userObj');
      console.log(jsonValue);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(err) {
      console.log("getUserObj: %s", err);
    }
  }

  render(){
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <Text style={{ fontSize: 24, marginTop: 20 }}>
          How did you feel today, { this.state.user }?
        </Text>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity onPress={() => this.setMood(5)}
            style={[btnStyles.btn, this.state.mood == 5 ? btnStyles.activeBtn : null ]}>
            <Text style={btnStyles.emoji}>😁</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.setMood(4)}
            style={[btnStyles.btn, this.state.mood == 4 ? btnStyles.activeBtn : null ]}>
            <Text style={btnStyles.emoji}>🙂</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.setMood(3)}
            style={[btnStyles.btn, this.state.mood == 3 ? btnStyles.activeBtn : null ]}>
            <Text style={btnStyles.emoji}>😐</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.setMood(2)}
            style={[btnStyles.btn, this.state.mood == 2 ? btnStyles.activeBtn : null ]}>
            <Text style={btnStyles.emoji}>😒</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.setMood(1)}
            style={[btnStyles.btn, this.state.mood == 1 ? btnStyles.activeBtn : null ]}>
            <Text style={btnStyles.emoji}>☹️</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.hr}></View>
          
        <AddTagsScreen setTags={this.handleCallback} />

        <View style={styles.hr}></View>

        <View style={{ flex: 1, marginTop: 0 }}>
          <Text style={{ fontSize: 24, marginTop: 24 }}>Weather Data:</Text>
          {
            this.state.location == "" ?
              (<View>
                <Text>Loading</Text>
              </View>)
            :
            (<View>
              <Text>Location: {this.state.location}</Text>
              <Text>Weather: {this.state.weather}</Text>
              <Text>Temp: {this.state.temp}°</Text>
            </View>)
          }
          </View>

        
        {this.state.dataEntered ? <Pressable onPress={()=>{this.sendObj()}} style={[btnStyles.btn, btnStyles.saveBtn]}><Text style={btnStyles.save}>Edit Day</Text></Pressable>: <Pressable onPress={()=>{this.sendObj()}} style={[btnStyles.btn, btnStyles.saveBtn]}><Text style={btnStyles.save}>Save Day</Text></Pressable>}
      </View>
    );
    }
  }

const AppButton = ({onPress, title, key, mood}) => (
<TouchableOpacity onPress={onPress} style={[btnStyles.btn, mood == key ? btnStyles.activeBtn : null ]}>
    <Text style={btnStyles.emoji}>{title}</Text>
</TouchableOpacity>
)

const btnStyles  = StyleSheet.create({
    btn: {
        marginRight: 8,
        marginLeft: 8,
        marginTop: 30,
        marginBottom: 30,
        backgroundColor: "transparent",
    },
    activeBtn: {
      borderBottomWidth: 2,
    },
    emoji: { fontSize: 35 },
    saveBtn: {
      backgroundColor: 'blue',
      borderRadius: 5,
      padding: 5,
      paddingLeft: 8,
      paddingRight: 8
    },
    save: {
      color: 'white',
      fontSize: 24
    }
});
const styles  = StyleSheet.create({
  hr:{
    borderTopWidth: 1,
    borderColor: 'lightgrey',
    width: '90%'
  }
});

  export default TrackerScreen