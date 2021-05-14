import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DayCard({ item }) {

    return (
        <View style={styles.card}>
            <Text>Date: {item.date}</Text>
            <Text>Mood: {item.mood}</Text>
            <View style={styles.tags}>
                <Text>
                    Tags: 
                </Text>
                {item.tags.map((tag)=><View key={Math.random()} style={styles.tag}><Text style={styles.tagText}>{tag}</Text></View>)}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 6,
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#a9a9a9',
        borderRadius: 10

    },
    tags: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tag: {
        margin: 5,
        paddingHorizontal: 7,
        paddingVertical: 2,
        borderRadius: 5,
        backgroundColor: '#222',
    },
    tagText: {
        color: 'white'
    }
})