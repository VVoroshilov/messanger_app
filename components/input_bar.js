import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Image, Text, View, TextInput, AppRegistry, Alert} from 'react-native';
import Icons from 'react-native-vector-icons/AntDesign';
import * as api from '../api/MyApi';
export default class App extends React.Component {

    constructor(props){
      super(props);
  
      this.state={
        changeBar: this.props.changeBar,
        chat_id: this.props.chat_id,
        user_id: this.props.user_id,
        token: this.props.token,
        receiver_id: this.props.receiver_id,
        refreshChat: this.props.refresh,
        message_text: "",
        multimedia:[],
        height: 35,
      }
      this.onTextChange = this.onTextChange.bind(this);
      this.send_message_btn = this.send_message_btn.bind(this);
    }  

    onTextChange(text){
        this.setState({message_text: text, validMessage: true})
      }


    async send_message_btn(){
        let message_text = this.state.message_text;
        let multimedia = this.state.multimedia;
        let user_id = this.state.user_id;
        let token = this.state.token;
        let chat_id = this.state.chat_id;
        let receiver_id = this.state.receiver_id;

        if(message_text != null || multimedia != []){
            console.log("sending message");
            try{
                console.log(user_id, token, chat_id, receiver_id, message_text, multimedia);
                const response = await api.send_message(user_id, token, chat_id, receiver_id, message_text, multimedia);
                if (await response.status === true){
                    this.setState({message_text:"", multimedia: []});
                    this.state.refreshChat();
                  }
                  else{
                    if(await response.db_error === true){
                      Alert.alert("Error", "Error on the server side. Try again.");
                    }
                  }
            }catch(error){
                console.error(error.message);
                Alert.alert("Error", "Something went wrong. Try again.");
            }
        }
    }



    render(){
      return (
            <View style={styles.window_header} onPress={() => this.state.onPressSend()}>
                <TouchableOpacity style={{width:"10%", alignItems: "center"}}onPress={() => this.state.onPressAtch()}>
                    <Icons name={'paperclip'} size={30} color='#fff' style={{marginLeft: '0%'}}/>
                </TouchableOpacity>
  
                <View style={styles.inputView} >
                    <TextInput  
                        style={[styles.inputText, {height: Math.max(35, this.state.height)}]}
                        placeholder="Write a message..." 
                        placeholderTextColor="#000000"
                        multiline={true} 
                        maxLength={4000}
                        value={this.state.message_text}
                        onChangeText={this.onTextChange}
                        onContentSizeChange={(event) => {
                            this.setState({ height: event.nativeEvent.contentSize.height });
                            this.state.changeBar(Math.min((0.07/35) * this.state.height, 0.5));
                        }}/>
                </View>

                <TouchableOpacity onPress={this.send_message_btn}>
                    <Icons name={'enter'} size={30} color='#fff' style={{marginLeft: '0%'}}/>
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
    window_header:{
        flex:1,
        flexDirection: "row",
        backgroundColor: "#000000",
        justifyContent: "space-evenly",
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
      height:"100%",
      justifyContent:"center",
    },
    inputText:{
      height:35,
      margin:10,
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