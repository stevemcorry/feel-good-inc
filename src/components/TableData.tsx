import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';

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

            {tableData.map((value, key) => <Text key={key}>{value.date}</Text>)}

            {moodTableData.map((value, key) => {
                return (
                    <View key={key}>
                        <Text>{key + 1}: {value.length}</Text>
                    </View>
                )
            })}
            
        </React.Fragment>
        
    )
}