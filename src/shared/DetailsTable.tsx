import React, { useEffect } from 'react';
import { Button, StyleSheet, View, Text, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DayCard from './DayCard';


export default function DetailsTable({ data, navigation }) {

    return (
        <View style={styles.detailsTable}>
      
            <FlatList
                data={data}
                keyExtractor={item => item.date}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate('DayDetails', {item: item})} >
                            <DayCard item={item} />
                        </TouchableOpacity>
                    )
                }}
                
            />
        </View>
    );
}

const styles = StyleSheet.create({
    detailsTable: {
        padding: 10,
        backgroundColor: 'white',
    }
})