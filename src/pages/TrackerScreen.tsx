import React from 'react';
import Fire from '../../environment.config';
import { StyleSheet, Text, View, Button } from 'react-native';
import AddTagsScreen from './AddTagsScreen';
import UserDayObj from '../shared/UserDayObj.model';

class TrackerScreen extends React.Component{
  
  constructor(props){
      super(props);
      this.state = {
          tags: null,
          mood: 5
      }
  }

  setMood = (mood: number) => {
      console.log(mood);
      this.setState({mood})
  }

  sendObj = () => {

    console.log(this.state.mood, this.state.tags)
    let usr = new UserDayObj(this.state.mood, this.state.tags);
    let uid = "ajsdkfla;jsdflka";
      Fire.database().ref("/users/" + uid + "/Days/mood/").set(usr);
  }

  handleCallback = (childData) =>{
    console.log(childData)
    this.setState({tags: childData})
  }

  render(){
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>How did you feel today?</Text>
        <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: "row" }}>
          <Button
            title="Great"
            onPress={() => this.setMood(5)}
          />
          <Button
            title="Good"
            onPress={() => this.setMood(4)}
          />
          <Button
            title="Ok"
            onPress={() => this.setMood(3)}
          />
          <Button
            title="Been better"
            onPress={() => this.setMood(2)}
          />
          <Button
            title="Not well"
            onPress={() => this.setMood(1)}
          />
        </View>
        <AddTagsScreen setTags={this.handleCallback}></AddTagsScreen>

        <Button
            title="Save Day"
            onPress={() => this.sendObj()}
          />

      </View>
      );
    }
  }

  export default TrackerScreen