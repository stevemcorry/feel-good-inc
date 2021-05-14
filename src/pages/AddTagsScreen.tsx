import React, { useState, Component, useEffect } from 'react';
import Fire from '../../environment.config';
import { StyleSheet, Text, View, Button, TextInput, Pressable, SafeAreaView, ScrollView } from 'react-native';


import { AntDesign } from '@expo/vector-icons'; 

class AddTagsScreen extends React.Component{

    state = {
        text: "",
        tagData: {},
        tags: <Text>Loading..</Text>,
        activeChildren: [],
        showInput: false,
        showDelete: false,
        toggleText: "New"
    }
    

    componentDidMount() {
        this.getData();
    }

    getData(){
        let uid = "ajsdkfla;jsdflka"
        let ref = Fire.database().ref("/users/" + uid + "/tags");
        ref.on("value", snapshot => {
            const data = snapshot.val();
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
        if(Object.keys(data).length !== 0){
            let children:Array<any> = [];
            Object.entries(data).forEach(([key, value]) => {
                children.push(value);
            });
            this.setState({tags: this.getChildren(children)});
        }
    }

    addActiveTag(key:any){ 
        let arr:Array<[]> = this.state.activeChildren;
        arr.push(key);
        this.setState({activeChildren: arr});
        this.showTags("");
        this.sendTags(arr);
    }

    removeActiveTag(key:any){ 
        let arr:Array<[]> = this.state.activeChildren;
        if(arr.indexOf(key) != -1){
            arr.splice(arr.indexOf(key), 1);
            this.setState({activeChildren: arr});
           this.sendTags(arr);
        } 
        this.showTags("");
    }
    sendTags(arr){
        let newArr = Object.values(this.state.tagData);
        let tags = [];
        arr.map((val:any)=>{
            tags.push(newArr[val])
        })
        this.props.setTags(tags);
    }
    addTag(tag:string){
        let uid = "ajsdkfla;jsdflka"
        Fire.database().ref("/users/" + uid + "/tags").push(tag);
        this.setState({text: ""});
    }
    deleteTag(key:any){
        let uid = "ajsdkfla;jsdflka"
        Fire.database().ref("/users/" + uid + "/tags/" + Object.keys(this.state.tagData)[key]).remove();
    }

    getChildren(data:Array<[]>) {
         if(!this.state.showDelete){
            return <View style={styles.tagView}>{data.map((val, key:any)=>{
                if(this.state.activeChildren.indexOf(key) != -1){
                    return <Pressable key={key} onPress={()=>{this.removeActiveTag(key)}} style={[styles.tagPill, styles.activePill]}><Text>{val}</Text></Pressable>
                } else{   
                    return <Pressable key={key} onPress={()=>{this.addActiveTag(key)}} style={styles.tagPill}><Text>{val}</Text></Pressable>
                }
            })}</View>
        } else{
            return <View style={styles.tagView}>{data.map((val, key:any)=>{  
                return <Pressable key={key} onPress={()=>{this.deleteTag(key)}} style={[styles.tagPill, styles.deletePill]}><AntDesign name="close" size={9} color="#333"/><Text>{val}</Text></Pressable>
            })}</View>
        }
    }
    toggleInput() {
        this.setState({
            showInput: !this.state.showInput,
            toggleText: (this.state.showInput ? "New" : "Cancel")
        });
    }
    toggleDelete() {
        this.setState({showDelete: true});
        setTimeout(()=>{
            this.showTags("");
        },20)
    }
    deleteOff() {
        this.setState({showDelete: false});
        setTimeout(()=>{
            this.showTags("");
        },20)
    }
    changeText(val:any){
        this.setState({text: val})
    }
    
    render() {

        return (
            <View style={styles.wrapper}>
                <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-around", alignItems: "center"}}>
                    {!this.state.showDelete ? <AntDesign name="delete" onPress={() => this.toggleDelete()} size={25} color="#333"/> : <AntDesign name="close" onPress={() => this.deleteOff()} size={25} color="#333"/>}
                    
                    <Text style={styles.h1}>Add Tags</Text>
                    {!this.state.showInput ? <AntDesign name="plussquareo" onPress={() => this.toggleInput()} size={25} color="#333"/> : <AntDesign name="close" onPress={() => this.toggleInput()} size={25} color="#333"/>}
                </View>
                {
                    this.state.showInput ? 
                    (<View style={styles.addTag}>
                        <TextInput style={styles.input}
                            onChangeText={(val)=>{this.changeText(val)}}
                            value={this.state.text}
                            placeholder="Tag Name"
                            />
                        <Button title="Save Tag" onPress={() => this.addTag(this.state.text)}/>
                    </View>) :
                    (null)
                }
                <SafeAreaView style={styles.container}>
                    <ScrollView>
                        <Text style={styles.scrollView}>{this.state.tags}</Text>
                    </ScrollView>
                </SafeAreaView>
            </View>
        );
    }
}

export default AddTagsScreen;

const styles = StyleSheet.create({
    wrapper: { 
        flex: 1,
        alignItems: 'center',
        marginTop: 30, 
        maxHeight: 300,
        overflow: 'hidden',
        width: '100%'
    },
    h1: {
      fontSize: 24,
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
        flexWrap: 'wrap',
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
    deletePill: {
        flexDirection: 'row',
        backgroundColor: '#ff4d4d',
        borderColor: '#ff4d4d'
    },
    activePill: {
        backgroundColor: 'lightblue'
    },
    addTag: {
        width: "100%", 
        flexDirection: "row", 
        justifyContent: "center", 
        alignItems: "center",
        marginTop: 20
    },
    container: {
        paddingBottom: 10
    },
    scrollView: {
        paddingBottom: 10
    }
  });
  