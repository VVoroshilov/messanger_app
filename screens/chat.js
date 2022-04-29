import React from 'react';
import { StyleSheet, Text, View, TextInput, Image, Pressable, Alert, FlatList, ActivityIndicator, TouchableOpacity, Button} from 'react-native';

import * as api from "../api/MyApi";
import * as dbAPI from "../api/DB";
import SQLite from 'react-native-sqlite-storage';
import Message from "./message";
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
        nickname: this.props.nickname
    }
    this.get_messages_data = this.get_messages_data.bind(this);
    // this.get_messages_data();
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
            <TouchableOpacity style={styles.window_header}>
                <TouchableOpacity onPress={console.log("pressed")}>
                    <Icons name={'arrow-back'} size={30} color='#fff' style={{marginLeft: '3%'}}/>
                </TouchableOpacity>

                <Avatar.Image size={50} source={{uri: `data:image/jpeg;base64,${this.state.picture}`}} />
                <View style={styles.chat_header}>
                    <Text style={styles.name}>
                        {this.state.nickname}
                    </Text>
                </View>
            </TouchableOpacity>
            <View>
                {/* <FlatList
                data={this.state.data}
                renderItem={this.renderItem}
                keyExtractor={item => item.message_id}
                ListEmptyComponent={<View style={{flex:1, alignItems: "center", justifyContent:"center"}}><ActivityIndicator size="large" /></View>}
                /> */}
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