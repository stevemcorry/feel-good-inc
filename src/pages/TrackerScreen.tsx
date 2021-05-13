import React from 'react';
import Fire from '../../environment.config';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
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
      <View
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <Text style={{ fontSize: 24, marginTop: 20 }}>
          How did you feel today?
        </Text>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <AppButton title="😁" onPress={() => this.setMood(5)} />
          <AppButton title="🙂" onPress={() => this.setMood(4)} />
          <AppButton title="😐" onPress={() => this.setMood(4)} />
          <AppButton title="😒" onPress={() => this.setMood(3)} />
          <AppButton title="☹️" onPress={() => this.setMood(1)} />
        </View>

        <AddTagsScreen setTags={this.handleCallback} />

        <Button title="Save Day" onPress={() => this.sendObj()} />
      </View>
    );
    }
  }

const AppButton = ({onPress, title}) => (
<TouchableOpacity onPress={onPress} style={btnStyles.btn}>
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
    emoji: { fontSize: 35 }
});

  export default TrackerScreen