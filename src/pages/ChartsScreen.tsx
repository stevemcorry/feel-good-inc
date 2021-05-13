import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import {Picker} from '@react-native-picker/picker';


import MainChart from '../charts/MainChart';


export default function ChartsScreen({ navigation }) {

    const [selectedDateRange, setSelectedDateRange] = useState("7");
    const [openPicker, setOpenPicker] = useState(false);


    function togglePicker() {
        return !openPicker
    }

    return (
        <View style={styles.container}>
            <Text>This is the chart screen</Text>
            {openPicker ? (
                <Picker
                    enabled={openPicker}
                    selectedValue={selectedDateRange}
                    onValueChange={(itemValue, itemIndex) => {
                        setSelectedDateRange(itemValue);
                        setOpenPicker(false);
                    }
                    }>
                    <Picker.Item label="Past 7 days" value="7" />
                    <Picker.Item label="Past 30 days" value="30" />
                    <Picker.Item label="Past 90 days" value="90" />
                    <Picker.Item label="Past year" value="365" />
                </Picker>

            ) : (
                <Button title="Select Date Range" onPress={() => setOpenPicker(true)}/>
            )}
            <MainChart dateRange={setSelectedDateRange}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    },
    chart: {
        flex: 1
    }
});