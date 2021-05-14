import React, { useEffect } from 'react';
import { Text, View, FlatList, Button } from 'react-native';

export default function DayDetailsScreen({navigation, route}) {

    const dayData = route.params.item;

    useEffect(() => {
        console.log(dayData);
    }, [])

    return(
        <View>
            <Button title='back to chart page' onPress={() => navigation.goBack()}/>
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