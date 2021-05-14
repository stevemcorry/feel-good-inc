import React, { useEffect, useState } from 'react';
import { Button, FlatList, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { globalStyles } from '../shared/Global';

export default function TableData({data, moodData}) {


    return (
        <View style={styles.table}>
            <View style={styles.tableHeader}>
                <Text style={[globalStyles.titleText, globalStyles.whiteText]}>Mood Frequency over {moodData.length} days</Text>
            </View>
            <View style={styles.tableContent}>
                <View style={styles.tableColumn}>
                    <Text style={styles.tableRow}>☹️</Text>
                    <Text style={styles.tableRow}>😒</Text>
                    <Text style={styles.tableRow}>😐</Text>
                    <Text style={styles.tableRow}>🙂</Text>
                    <Text style={styles.tableRow}>😁</Text>
                </View>
                <View style={styles.tableColumn}>
                    <Text style={styles.tableRow}>{moodData.filter(x => x == 1).length} day(s)</Text>
                    <Text style={styles.tableRow}>{moodData.filter(x => x == 2).length} day(s)</Text>
                    <Text style={styles.tableRow}>{moodData.filter(x => x == 3).length} day(s)</Text>
                    <Text style={styles.tableRow}>{moodData.filter(x => x == 4).length} day(s)</Text>
                    <Text style={styles.tableRow}>{moodData.filter(x => x == 5).length} day(s)</Text>
                </View>
            </View>
        </View>
        
    )
}

const styles = StyleSheet.create({
    table: {
        marginVertical: 20,
    },
    tableHeader: {
        backgroundColor: '#222',
        fontSize: 20,
    },
    tableContent: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    tableColumn: {
    },
    tableRow: {
        height: 30,
        fontSize: 20,
        borderWidth: 1,
        borderColor: 'black',
        paddingHorizontal: 10,
        paddingVertical: 3
    }
})