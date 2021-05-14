import React, { useEffect } from 'react';
import { Button, StyleSheet, View, Text, FlatList } from 'react-native';
import DayCard from './DayCard';


export default function DetailsTable({ data }) {

    return (
        <React.Fragment>
      
            <FlatList
                data={data}
                renderItem={({ item }) => <DayCard key={item.date} item={item} />}
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