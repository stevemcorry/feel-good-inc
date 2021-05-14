import React, { useEffect } from 'react';
import { Button, StyleSheet, View, Text, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DayCard from './DayCard';


export default function DetailsTable({ data, navigation }) {

    return (
        <React.Fragment>
      
            <FlatList
                data={data}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate('DayDetails', {item: item})} >
                            <DayCard key={item.date} item={item} />
                        </TouchableOpacity>
                    )
                }}
                
            />
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 6,
        elevation: 3,
        backgroundColor: '#fff',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: .3,
        shadowRadius: 2,
        marginHorizontal: 4,
        marginVertical: 6
    },
    cardContent: {
        marginHorizontal: 18,
        marginVertical: 20,
    }
})