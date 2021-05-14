import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import {Picker} from '@react-native-picker/picker';

import Fire from '../../environment.config';

import MainChart from '../charts/MainChart';
import UserDayObj from '../shared/UserDayObj.model';


export default function ChartsScreen({ navigation }) {

    const [selectedDateRange, setSelectedDateRange] = useState(7);

    function addDummyData() {
        let dummyDay: UserDayObj = {
            date: '05/12/2021', 
            mood: Math.floor(Math.random() * 5) + 1 , 
            tags: ['friends', 'walk'],
            temperature: 65,
            precipitation: 'none',
            location: ['park'],
            screenTime: 300,
            healthFitness: 'good'
        }
        let uid =  "ajsdkfla;jsdflka"
        let ref = Fire.database().ref("/users/" + uid + "/days").push(dummyDay)
    }

    return (
        <View style={styles.container}>
            <MainChart 
                selectedDateRange={selectedDateRange} 
                setSelectedDateRange={setSelectedDateRange} 
                navigation={navigation}
            />
            {/* <Button title='add dummy data' onPress={addDummyData} /> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    }
});