import React, { useEffect } from 'react';
import { Text, View, FlatList, Button, Pressable } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';

import { globalStyles } from '../shared/Global';

export default function DayDetailsScreen({navigation, route}) {

    const dayData = route.params.item;

    useEffect(() => {
        console.log(dayData);
    }, [])

    return(
        <View>
            <Pressable onPress={() => navigation.goBack()} style={globalStyles.backBtn}>
                
                <Text style={globalStyles.backBtn}>Back to Chart</Text>
                </Pressable>
            <Text>{dayData.date}</Text>
            <Text>{dayData.healthFitness}</Text>
            <Text>{dayData.mood}</Text>
            <Text>{dayData.precipitation}</Text>
            <Text>{dayData.screenTime}</Text>
            <Text>{dayData.temperature}</Text>
            <FlatList
                data={dayData.tags}
                renderItem={({item}) => {
                    return (
                        <Text>{item}</Text>
                    )
                }}
                
            />
        </View>
    )

}