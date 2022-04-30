import React from 'react';
import { StyleSheet, Text, View, TextInput, Image, Pressable, Alert, FlatList, ActivityIndicator, TouchableOpacity, Button} from 'react-native';

import * as api from "../api/MyApi";
import * as dbAPI from "../api/DB";
import SQLite from 'react-native-sqlite-storage';
import Message from "../components/message";
import ChatBar from "../components/chat_bar";
import InputBar from "../components/input_bar";
import { Avatar } from 'react-native-paper';
import Icons from 'react-native-vector-icons/MaterialIcons';

export default class App extends React.Component {

  constructor(props){
    super(props);

    this.state={
        data: null,
        user_id: this.props.user_id,
        token: this.props.token,
        chat_id: this.props.chat_id,
        picture: this.props.picture,
        nickname: this.props.nickname,
        receiver_id: this.props.receiver_id,
        flex: 0.07, 
    }
    this.get_messages_data = this.get_messages_data.bind(this);
    this.get_messages_data();
  }  
  // Main screen method (request to API for login and inserting server response to the local DB)
    async get_messages_data(){
        console.log("fetching messages data");
      if (this.state.user_id != null && this.state.token != null && this.state.chat_id != null){
          console.log("api post /messages/get request send");
        server_response = await api.get_messages(this.state.user_id, this.state.token, this.state.chat_id);
        if (await server_response.status === true){
            console.log("got reponse with messages")
            this.setState(this.state.data = await server_response.response)
        }else{
            if (await server_response.db_error === true){
                Alert.alert("Error", 
                "Error on the server side or with your internet connection. Try again.",
                [
                    { text: "OK", onPress: () => this.get_messages_data() }
                ]);
            }else{
                // Тут вывести, что пара id + токен недействительна на сервере.
            }
        }
      }else{
          console.log("user_id null");
      }
    }


    renderItem = ({item}) => {
        return (
          <Message
            message={item}
            user={this.state.user_id}
            chat={this.state.chat_id}
            nickname={this.state.nickname}
          />
          );
        };

  render(){
    return (
        <View style={styles.container}>
            <View style={{flex:0.1}}>
                <ChatBar 
                    picture={this.state.picture} 
                    nickname={this.state.nickname} 
                    onPressBtn= {() => console.log("button pressed")}
                    onPressBar={() => console.log("bar pressed")}/>
            </View>
            <View style={{flex:0.9-(this.state.flex-0.07)}}>
                <FlatList
                data={this.state.data}
                renderItem={this.renderItem}
                keyExtractor={item => item.message_id}
                ListEmptyComponent={<View style={{flex:1, alignItems: "center", justifyContent:"center"}}><ActivityIndicator size="large" /></View>}
                />
            </View>
            <View style={{flex: this.state.flex}}>
                <InputBar
                    chat_id={this.state.chat_id} 
                    user_id= {this.state.user_id}
                    token= {this.state.token}
                    receiver_id={this.state.receiver_id}
                    changeBar={(inputBarHeight) => this.setState({flex: inputBarHeight})}
                    refresh={this.get_messages_data}
                    />
            </View>
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
      flex:0.1,
      flexDirection: "row",
      backgroundColor: "#87CEFA",
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