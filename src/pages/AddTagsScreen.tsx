import React, { useState, Component, useEffect } from 'react';
import Fire from '../../environment.config';
import { StyleSheet, Text, View, Button, TextInput, Pressable } from 'react-native';



function addTag(tag:string){
    let uid = "ajsdkfla;jsdflka"
    let ref = Fire.database().ref("/users/" + uid + "/tags").push(tag)
}

export default function AddTagsScreen(){

    const [text, onChangeText] = useState("");
    const [tagData, changeTagData] = useState({});
    const [tags, setTags] = useState(<View><Text>Loading..</Text></View>);
    let arr:Array<[]> =[];
    const [activeChildren, setActiveChildren] = useState(arr);

    useEffect(() => {
        let uid = "ajsdkfla;jsdflka"
        let ref = Fire.database().ref("/users/" + uid + "/tags");
        ref.on("value", snapshot => {
            const data = snapshot.val();
            console.log('from use ', data)
            if(data){
                changeTagData(data);
                showTags();
            } else {
                console.log('No data');
            }
        });
    }, [])

    const showTags = () => {
        let data = tagData;
        if(Object.keys(data).length !== 0){
            console.log('inshow', data)
            let children:Array<any> = [];
            Object.entries(data).forEach(([key, value]) => {
                console.log(value)
                children.push(value);
            });
            console.log(children)
            setTags(getChildren(children));
        }
    }
    const addActiveTag = (key:any)=>{ 
        let arr:Array<[]> = activeChildren;
        arr.push(key);
        setActiveChildren(arr);
        showTags();
        console.log(key, activeChildren) 
    }
    const removeActiveTag = (key:string)=>{ 
        console.log(key, activeChildren) 
    }
    const getChildren = (data:Array<[]>) => {
        return <View style={styles.tagView}>{data.map((val, key:any)=>{
            if(activeChildren.indexOf(key) != -1){
                return <Pressable key={key} onPress={()=>{removeActiveTag(key)}} style={[styles.tagPill, styles.activePill]}><Text>{val}</Text></Pressable>
            } else{   
                return <Pressable key={key} onPress={()=>{addActiveTag(key)}} style={styles.tagPill}><Text>{val}</Text></Pressable>
            }
        })}</View>
    }
    
    return (
        <View style={{ flex: 1, alignItems: 'center', marginTop: 30}}>
            <Text style={styles.h1}>Add Tags</Text>
            <TextInput style={styles.input}
                onChangeText={onChangeText}
                value={text}
                placeholder="Tag Name"
            />
            <Button title="Save Tag" onPress={() => addTag(text)}/>
            <Text>{tags}</Text>
        </View>
    );
}


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
  