import React from 'react';

import { StyleSheet, Text, View, Button, AppRegistry, processColor, Dimensions } from 'react-native';
import Fire from '../../environment.config';

import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";
import { modulo } from 'react-native-reanimated';
import DetailsTable from '../shared/DetailsTable';

  

class MainChart extends React.Component {

    state = {
        moodData: [],
        labels: [],
        loading: true,
        dateRange: '',
        data: []
    }

    constructor(props) {
        super(props);
        this.state.dateRange = props.dateRange
    }

    componentDidMount() {
        let moodData = [];
        let labels = [];
        let days = Fire.database().ref("/users/ajsdkfla;jsdflka/Days");
        days.on("value", snapshot => {
            const state = snapshot.val();
            this.setState({data: state});
            if(state){
                for (const [key, value] of Object.entries(state)) {
                    labels.push(value.date)
                    moodData.push(parseInt(value.mood));
                }
                this.setState({moodData, labels, loading: false})
                // data = state;
            }
        });

    }

    render () {
        if (this.state.loading) {
            return (
                <Text>Loading...</Text>
            )
        } else {

            return (
                <React.Fragment>

                    <LineChart
                        onDataPointClick={(props) =>
                            console.log('data point clicked', props)
                        }
                        data={{
                            labels: this.state.labels,
                            datasets: [
                                {
                                data: this.state.moodData
                                }
                            ]
                        }}
                        width={Dimensions.get("window").width} // from react-native
                        height={220}
                        yAxisLabel=""
                        yAxisSuffix=""
                        yAxisInterval={1} // optional, defaults to 1
                        chartConfig={{
                        backgroundColor: "#e26a00",
                        backgroundGradientFrom: "#fb8c00",
                        backgroundGradientTo: "#ffa726",
                        decimalPlaces: 2, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16
                        },
                        propsForDots: {
                            r: "6",
                            strokeWidth: "2",
                            stroke: "#ffa726"
                        }
                        }}
                        bezier
                        style={{
                        marginVertical: 8,
                        borderRadius: 16
                        }}
                    />
                    <DetailsTable data={this.state.data} />
                </React.Fragment>
            )
        }
    }
}

export default MainChart;