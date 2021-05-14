import React, { useEffect } from 'react';
import { Text, View, FlatList, Button, Pressable, StyleSheet } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';

import { globalStyles } from '../shared/Global';

export default function DayDetailsScreen({navigation, route}) {

    const dayData = route.params.item; 

    return(
        <View style={[globalStyles.container, styles.dayDetailsContainer]}>
            <Button onPress={() => navigation.goBack()} title='Back to Chart' />
            <View style={styles.dayDetailsContent}>
                <Text>Date: {dayData.date}</Text>
                <Text>Health/Fitness: {dayData.healthFitness}</Text>
                <Text>Mood: {dayData.mood}</Text>
                <Text>Precipitation: {dayData.precipitation}</Text>
                <Text>Screen Time: {dayData.screenTime} minutes</Text>
                <Text>Temperature: {dayData.temperature} degrees Fahrenheit</Text>
                <View style={globalStyles.tags}>
                    <Text>
                        Tags: 
                    </Text>
                    <FlatList
                        data={dayData.tags}
                        renderItem={({item}) => {
                            return (
                                <Text style={globalStyles.tag}>{item}</Text>
                            )
                        }}
                        
                    />
                </View>
                
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    dayDetailsContainer: {
        flex: 1,
        alignItems: 'center'
    },
    dayDetailsContent: {
        width: '100%',
        margin: 20,
        padding: 15,
        backgroundColor: '#D3D3D3',
        justifyContent: 'center',
        alignItems: 'center'
    }
})