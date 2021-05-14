import React, { useEffect, useState } from 'react';
import { Button, FlatList, Text, View, TouchableOpacity } from 'react-native';

export default function TableData({data}) {

    const [tableData, setTableData] = useState(data);
    const [moodTableData, setMoodTableData] = useState([[],[],[],[],[]]);

    useEffect(() => {
        console.log('hi')
        setTableData(data);
        sortByMood();
    },[moodTableData])

    function sortByMood() {
        let moods = [[],[],[],[],[]];
        for (let table of tableData) {
            moods[table.mood - 1].push(table)
        }
        setMoodTableData(moods);
        console.log('moods?', moodTableData);
    }

    return (
        <React.Fragment>
            <FlatList
                data={moodTableData}
                renderItem={({ item, index }) => {
                    return (
                        <View key={index}>
                        <Text>{index + 1}: {item.length}</Text>
                    </View>
                    )
                }}
                
            /> 
        </React.Fragment>
        
    )
}