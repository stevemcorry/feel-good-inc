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

  componentDidMount() {
    if(this.state.location == ""){
      this.getLocation();
    }
    // let uid = "ajsdkfla;jsdflka";
    this.getUserUid().then((uid)=>{
      if(!uid){alert('oops somethings wrong')}
      let ref = Fire.database().ref("/users/" + uid + "/days");
      let self = this;
      ref.orderByChild('date').get().then((data:any)=>{
        data = Object.values(data.val())[0];
        console.log(data)
        if(data.date == getFormattedDate(new Date())){
          alert('you already entered data for today.');
          self.setState({dataEntered: true});
        }
      })
      
      // .on("value", function(snapshot){
      //   var data = snapshot.val();
      //   console.log('ordering', data)
      //   if(data.date == getFormattedDate(new Date())){
      //     alert('you already entered data for today.');
      //     self.setState({dataEntered: true});
      //   }
      // });
      // ref.orderByChild('date').limitToLast(1).on("value", function(snapshot){
      //   var data = snapshot.val();
      //   console.log('ordering', data)
      //   if(data.date == getFormattedDate(new Date())){
      //     alert('you already entered data for today.');
      //     self.setState({dataEntered: true});
      //   }
      // });
      ref.off();
      this.getUserObj();
    })
  }
  async getUserUid(){
      return AsyncStorage.getItem('@userObj').then((res:any)=>{
        return JSON.parse(res).uid;
      }).catch(()=>{
        return false;
      })
  }

  setMood = (mood: number) => {
      this.setState({mood})
  }

  sendObj = () => {
    if(this.state.mood == 0){
      alert('Please select how you felt today');
      return;
    }
    let date = getFormattedDate(new Date());
    let usr = new UserDayObj(this.state.mood, this.state.tags, date, this.state.temp, this.state.weather, this.state.location);

    // let uid = "ajsdkfla;jsdflka";
    this.getUserUid().then((uid)=>{
      Fire.database().ref("/users/" + uid + "/days").push(usr).then(res=>{
        alert('Day Saved!');
        this.setState({
          tags: null,
          mood: 0,
          location: "",
          weather: "",
          temp: 0,
          dataEntered: false
        })
      })
    })
  }

  handleCallback = (childData) =>{
    this.setState({tags: childData})
  }

  askLocation() {
    Location.requestForegroundPermissionsAsync().then(res=>{
      this.getLocationData();
    }).catch((err)=>{
      console.log('err', err)
    })
  }
  getLocation() {
    Location.getForegroundPermissionsAsync().then((res)=>{
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