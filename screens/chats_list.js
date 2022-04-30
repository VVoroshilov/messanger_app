import React from 'react';
import { StyleSheet, Text, View, TextInput, Image, Pressable, Alert, FlatList} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as api from "../api/MyApi";
import * as dbAPI from "../api/DB";
import SQLite from 'react-native-sqlite-storage';
import ChatListItem from "../components/chat_list_item";
export default class App extends React.Component {

  constructor(props){
    super(props);

    this.state={
        user_id: null,
        token: null,
        data: null,
        refresh: 0,
    }
    this.getUser = this.getUser.bind(this);
    this.get_chats_data = this.get_chats_data.bind(this);
    this.getUser();
  }  

  // DB methods
  getUser = () => {
    const db = SQLite.openDatabase({name : "App.db"});
    return db.transaction(tx => {
            tx.executeSql(
                "SELECT * FROM USERS",
                [],
                (sqlTxn, res) => {
                    if(res.rows.length > 0){
                        result = res.rows.item(0);
                        console.log("Selected user_id, token: ")
                        this.setState({user_id: result.user_id});
                        this.setState({token: result.token});
                        console.log(this.state.user_id);
                        console.log(this.state.token);
                        this.get_chats_data();
                    }else{
                        console.log("nothing selected")
                    }
                },
                error => {
                    console.log("error after selecting rows");
                    console.log(error.message);
                }
            )
        })
}
  // Main screen method (request to API for login and inserting server response to the local DB)
    async get_chats_data(){
        console.log("fetching data");
      if (this.state.user_id != null && this.state.token != null){
          console.log("api post /chats request send");
        server_response = await api.get_chats(this.state.user_id, this.state.token);
        if (await server_response.status === true){
            console.log("got reponse with chats")
            this.setState(this.state.data = await server_response.response)
        }else{
            if (await server_response.db_error === true){
                Alert.alert("Error", 
                "Error on the server side or with your internet connection. Try again.",
                [
                    { text: "OK", onPress: () => this.get_chats_data() }
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
          <ChatListItem
            chat={item}
            onPress={() => this.props.navigation.push("Chat" , 
            { chat_id: item.chat_id, 
              user_id: this.state.user_id, 
              token: this.state.token, 
              nickname: item.nickname, 
              receiver_id:null,
              picture: item.picture,})}
          />
          );
        };

  render(){
    return (
        <View style={styles.container}>
            <FlatList
            data={this.state.data}
            user={this.state.user_id}
            renderItem={this.renderItem}
            keyExtractor={item => item.chat_id}
            />
        </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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
  }
});