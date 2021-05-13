import React, { useState, Component, useEffect } from 'react';
import Fire from '../../environment.config';
import { StyleSheet, Text, View, Button, TextInput, Pressable } from 'react-native';



function addTag(tag:string){
    let uid = "ajsdkfla;jsdflka"
    let ref = Fire.database().ref("/users/" + uid + "/tags").push(tag)
}

class AddTagsScreen extends React.Component{

    state = {
        text: "",
        tagData: {},
        tags: <Text>Loading..</Text>,
        activeChildren: []
    }

    componentDidMount() {
        console.log('loading')
        this.getData();
    }

    getData(){
        let uid = "ajsdkfla;jsdflka"
        let ref = Fire.database().ref("/users/" + uid + "/tags");
        ref.on("value", snapshot => {
            const data = snapshot.val();
            console.log('from use ', data)
            if(data){
                this.setState({tagData: data});
                this.showTags(data);
            } else {
                console.log('No data');
            }
        });
    }

    showTags(data:any){
        if(!data){
            data = this.state.tagData;
        }
        console.log('data', this.state.tagData)
        if(Object.keys(data).length !== 0){
            console.log('inshow', data)
            let children:Array<any> = [];
            Object.entries(data).forEach(([key, value]) => {
                console.log(value)
                children.push(value);
            });
            console.log(children)
            this.setState({tags: this.getChildren(children)});
        }
    }

    addActiveTag(key:any){ 
        let arr:Array<[]> = this.state.activeChildren;
        arr.push(key);
        this.setState({activeChildren: arr});
        this.showTags("");
    }

    removeActiveTag(key:any){ 
        let arr:Array<[]> = this.state.activeChildren;
        if(arr.indexOf(key) != -1){
            arr.splice(arr.indexOf(key), 1);
            this.setState({activeChildren: arr});
        } 
        this.showTags("");
    }

    getChildren(data:Array<[]>) {
        return <View style={styles.tagView}>{data.map((val, key:any)=>{
            if(this.state.activeChildren.indexOf(key) != -1){
                return <Pressable key={key} onPress={()=>{this.removeActiveTag(key)}} style={[styles.tagPill, styles.activePill]}><Text>{val}</Text></Pressable>
            } else{   
                return <Pressable key={key} onPress={()=>{this.addActiveTag(key)}} style={styles.tagPill}><Text>{val}</Text></Pressable>
            }
        })}</View>
    }
    
    render() {

        return (
            <View style={{ flex: 1, alignItems: 'center', marginTop: 30}}>
            <Text style={styles.h1}>Add Tags</Text>
            <TextInput style={styles.input}
                value={this.state.text}
                placeholder="Tag Name"
                />
            <Button title="Save Tag" onPress={() => addTag(this.state.text)}/>
            <Text>{this.state.tags}</Text>
        </View>
        );
    }
}

export default AddTagsScreen;

const styles = StyleSheet.create({
    h1: {
      fontSize: 24,
      marginBottom: 24
    },
    input: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 4,
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 20,
        paddingRight: 20,
        minWidth: 220
    },
    tagView: {
        padding: 20,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    tagPill: {
        textAlign: 'center',
        margin: 5,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#666666',
        paddingTop: 3,
        paddingBottom: 3,
        paddingLeft: 8,
        paddingRight: 8,
    },
    activePill: {
        backgroundColor: 'lightblue'
    }
  });
  