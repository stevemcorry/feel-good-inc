import React, { useEffect, useState } from 'react';

import { StyleSheet, Text, View, Button, AppRegistry, processColor, Dimensions, Pressable, ScrollView } from 'react-native';
import Fire from '../../environment.config';

import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";
import { Picker } from '@react-native-picker/picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';

import DetailsTable from '../shared/DetailsTable';
import {globalStyles} from '../shared/Global'
import TableData from '../components/TableData';
  

export default function MainChart(props) {

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [moodData, setMoodData] = useState([]);
    // const [temperatureData, setTemperatureData] = useState([]);
    // const [screenTimeData, setScreenTimeData] = useState([]);
    const [labels, setLabels] = useState([]);
    const [openPicker, setOpenPicker] = useState(false);
    const [openDataPicker, setOpenDataPicker] = useState(false);
    const [openDetails, setOpenDetails] = useState(false);
    const [datasets, setDatasets] = useState([]);
    


    function togglePicker() {
        return !openPicker
    }

    useEffect(() => {
        updateChart();  
    }, [props.selectedDateRange]);

    function updateChart() {
        let tempMoodData: any = [];
        // let tempTempData: any = [];
        // let tempScreenData: any = [];
        let tempLabels:any = [];
        let dataArr:any = []
        let chartArr:any = []
        let days = Fire.database().ref("/users/ajsdkfla;jsdflka/days").orderByChild("date").limitToLast(props.selectedDateRange);
        days.on("value", snapshot => {
            const state = snapshot.val();
            if(state){
                for (const [key, value] of Object.entries(state)) {
                    dataArr.push(value);
                    tempLabels.push(value.date.substring(0,5));
                    tempMoodData.push(parseInt(value['mood']));
                    // tempTempData.push((parseInt(value['temperature'])/100) * 5);
                    // tempScreenData.push(parseInt(value['screenTime'])/60);
                }
                setLabels(tempLabels);
                setMoodData(tempMoodData);
                // setTemperatureData(tempTempData);
                // setScreenTimeData(tempScreenData);
                setIsLoading(false);
                setDatasets([{
                    data: tempMoodData,
                    color: () => 'blue',
                },
                // {
                //     data: tempTempData,
                //     color: () => 'blue'
                // },
                // {
                //     data: tempScreenData,
                //     color: () => 'green'
                // }
                ])
                setData(dataArr);
            }
        });
    }

    return (
        <ScrollView style={styles.scrollView}>

        { isLoading ? (
            <Text>Loading...</Text>
            ) : (
            <React.Fragment>
                <Text style={globalStyles.titleText}>Check Your Mood Over Time</Text>
                <LineChart
                    onDataPointClick={(clickInfo) => {
                        let item = data.filter(obj => obj.date == labels[clickInfo.index] + '/2021')[0];
                        props.navigation.navigate('DayDetails', {item: item});
                    }}
                    data={{
                        labels: labels,
                        datasets: datasets
                    }}
                    width={Dimensions.get("window").width} // from react-native
                    height={300}
                    withInnerLines={false}
                    verticalLabelRotation={45}
                    chartConfig={{
                    backgroundColor: "#e26a00",
                    backgroundGradientFrom: "#fb8c00",
                    backgroundGradientTo: "#ffa726",
                    decimalPlaces: 0, // optional, defaults to 2dp
                    color: (opacity = 1) => 'white',
                    labelColor: (opacity = 1) => 'white',
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "7",
                        strokeWidth: "3",
                        stroke: "#ffa726"
                    }
                    }}
                    bezier
                    style={{
                    marginVertical: 8,
                    }}
                />
                {/* <View style={styles.legend}>
                    <TouchableOpacity onPress={() => {
                        setShowMood(!showMood);
                        updateChart()
                    }}>
                        <Text>Toggle Mood: </Text>
                        <FontAwesome name='square' size={16} color='red'/>
                    </TouchableOpacity>
                </View> */}
                {openPicker ? (
                    <Picker
                        enabled={openPicker}
                        selectedValue={props.selectedDateRange}
                        onValueChange={(itemValue, itemIndex) => {
                            props.setSelectedDateRange(itemValue);
                            setOpenPicker(false);
                        }
                        }>
                        <Picker.Item label="Past 7 days" value={7} />
                        <Picker.Item label="Past 14 days" value={14} />
                        {/* <Picker.Item label="Past 30 days" value={30} />
                        <Picker.Item label="Past 90 days" value={90} /> */}
                    </Picker>

                ) : (
                    <Pressable onPress={() => setOpenPicker(true)} style={[globalStyles.btn, styles.dateRangeBtn]}><Text style={globalStyles.buttonText}>Change Date Range</Text></Pressable>

                )}
                <TouchableOpacity onPress={() => setOpenDetails(!openDetails)}>
                    <View style={styles.detailsHeader}>
                        {openDetails ? (
                            <React.Fragment>
                                <Text style={globalStyles.buttonText}>Day Details</Text>
                                <FontAwesome name="arrow-down" size={18} color="white"/>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <Text style={globalStyles.buttonText}>Day Details (click to expand)</Text>
                                <FontAwesome name="arrow-up" size={18} color="white"/>
                            </React.Fragment>
                        )}

                    </View>

                    {openDetails ? (
                        <DetailsTable data={data} navigation={props.navigation}/>
                    ) : (
                        null
                    )}
                </TouchableOpacity>

                {/* <TableData data={data} /> */}

            </React.Fragment>
            )
        }
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    detailsHeader: {
        height: 50,
        backgroundColor: '#222',
        color: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    dateRangeBtn: {
        backgroundColor: 'orange',
        width: '60%',
        alignSelf: 'center',
        padding: 5,
        alignItems: 'center',
        borderRadius: 6
    },
    scrollView: {
        flex: 1,
        height: Dimensions.get("window").height
    }
})