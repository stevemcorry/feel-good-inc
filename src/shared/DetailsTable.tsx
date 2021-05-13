import React from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';


export default function DetailsTable({ data }) {
    return (
        <React.Fragment>
            <Button title='maybe' onPress={() => console.log('from details table', data)} />
      
            <FlatList
                  data={data}
                  renderItem={({ item }) => (
                    <View style={styles.card}>
                        <View style={styles.cardContent}>
                            <Text>{item.mood}</Text>
                        </View>
                    </View>
                  )}
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