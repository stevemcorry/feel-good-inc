import React, { useEffect, useState } from 'react';
import { Button, FlatList, Text, View, TouchableOpacity } from 'react-native';
import { globalStyles } from '../shared/Global';

export default function TableData({data, moodData}) {


    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.titleText}>Mood Frequency over {moodData.length} days</Text>
            <Text style={globalStyles.emoji}>☹️ -  {moodData.filter(x => x == 1).length} day(s)</Text>
            <Text style={globalStyles.emoji}>😒 -  {moodData.filter(x => x == 2).length} day(s)</Text>
            <Text style={globalStyles.emoji}>😐 -  {moodData.filter(x => x == 3).length} day(s)</Text>
            <Text style={globalStyles.emoji}>🙂 -  {moodData.filter(x => x == 4).length} day(s)</Text>
            <Text style={globalStyles.emoji}>😁 -  {moodData.filter(x => x == 5).length} day(s)</Text>
        </View>
        
    )
}