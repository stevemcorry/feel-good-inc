import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';


import Fire from '../../environment.config';


function getData(){
    let ref = Fire.database().ref("/test/data");
        ref.on("value", snapshot => {
            console.log(snapshot)
        const state = snapshot.val();
        if(state){
            console.log('data', state)
        }
        });
}
function setData(){
    let obj = {
        first: 'fe',
        last: 'last'
    }
    let uid =  "ajsdkfla;jsdflka"
    let ref = Fire.database().ref("/test/data/"+ uid).set(obj)
}

export default function HomeScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.text}>Home Screen</Text>
        <Button
          title="Register For Happiness"
          onPress={() => navigation.navigate('Registration')}
          title="Add Tags"
          onPress={() => navigation.navigate('AddTags')}
        />
        <Button
          title="Go to details"
          onPress={() => navigation.navigate('Details')}
        />
        <Button
          title="Get data"
          onPress={() => getData()}
        />
        <Button
          title="set data"
          onPress={() => setData()}
        />
      </View>
    );
  }


const styles = StyleSheet.create({
    text: {
        color: 'blue'
    }
})