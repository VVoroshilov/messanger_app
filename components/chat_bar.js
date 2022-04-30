import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Image, Text, View} from 'react-native';
import { Avatar } from 'react-native-paper';
import Icons from 'react-native-vector-icons/MaterialIcons';

export default class App extends React.Component {

    constructor(props){
      super(props);
  
      this.state={
        onPressBar: this.props.onPressBar,
        onPressBtn: this.props.onPressBtn,
        picture: this.props.picture,
        nickname: this.props.nickname
      }

    }  
    
    render(){
      return (
            <View style={styles.window_header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => this.state.onPressBtn()}>
                    <Icons name={'arrow-back'} size={30} color='#fff' style={{marginLeft: '0%'}}/>
                </TouchableOpacity>

                <TouchableOpacity style={styles.user_header} onPress={() => this.state.onPressBar()}>
                    <Avatar.Image size={50} source={{uri: `data:image/jpeg;base64,${this.state.picture}`}} style={{margin:5}}/>
                    <View style={styles.chat_header}>
                        <Text style={styles.name}>
                            {this.state.nickname}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFFFFF"
    },
    backBtn:{
        flex: 0.15,
        justifyContent: "center",
        alignItems: "center"
    },
    window_header:{
        flex:1,
        flexDirection: "row",
        backgroundColor: "#000000",
        justifyContent: "center",
        alignItems: "center"
    },
    user_header:{
        flex:0.85,
        flexDirection: "row",
        backgroundColor: "#000000",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    chat_header:{
      alignItems: "center"
  },
    logo:{
      fontWeight:"bold",
      fontSize:50,
      color:"#000000",
      marginBottom:40
    },
    inputView:{
      width:"80%",
      backgroundColor:"#FFFFFF",
      borderRadius:25,
      height:50,
      justifyContent:"center",
      padding:20,
      borderColor: "#000000",
      borderWidth: 1
    },
    inputText:{
      height:50,
      color:"#000000"
    },
    forgot:{
      color:"white",
      fontSize:11
    },
    loginBtn:{
      width:"80%",
      borderRadius:25,
      height:50,
      alignItems:"center",
      justifyContent:"center",
      marginTop:40,
      marginBottom:10
    },
    loginText:{
      color:"#FFFFFF"
    },
    signupText:{
      color:"#000000"
    },
    image: {
      marginBottom: 20,
      width: 100,
      height: 100
    },
    errorView: {
      width:"70%",
      marginBottom: 10
    },
    textError: {
      fontSize: 12, 
      alignSelf: "flex-start"
    },
    name: {
      fontSize:18,
      color: '#FFFFFF',
    },
    time: {
        fontSize: 12,
        color: '#000000'},
    email: {
      marginTop: 10,
      fontSize: 13,
      color: '#000000',
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      objectFit: "cover"
    },
  });