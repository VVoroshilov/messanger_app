import React from 'react';
import { StyleSheet, SafeAreaView, Text, View, TextInput, TouchableOpacity, Image, Pressable, Alert, FlatList, ActivityIndicator} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as api from "../api/MyApi";
import SQLite from 'react-native-sqlite-storage';
import ContactListItem from "../components/contact_list_item";
import Icons from 'react-native-vector-icons/AntDesign';
export default class App extends React.Component {

  constructor(props){
    super(props);

    this.state={
        username:"",
        user_id: null,
        token: null, 
        data: null
    }
    this.getUser =  this.getUser.bind(this);
    this.getUser();
    this.search_user = this.search_user.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
  }  

  componentDidMount(){
    this.getUser();
    this.willFocusSubscription = this.props.navigation.addListener(
      'focus',
      () => {
        this.getUser();
      }
    );
  }

  componentWillUnmount() {
    this.willFocusSubscription();
  }

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


  onUsernameChange(username){
    this.setState({username: username});
  }

  // Main screen method (request to API for login and inserting server response to the local DB)
    async search_user(){
      if (this.state.username.length > 1){
            console.log("post /user/find");
        server_response = await api.find_user(this.state.username);
        if (await server_response.status === true){
            console.log("got response from server")
            if(await server_response.response[0].user_id != null){
                this.setState(this.state.data = await server_response.response)
            }
        }else{
            if (await server_response.db_error === true){
                // Alert.alert("Error", 
                // "Error on the server side or with your internet connection. Try again.",
                // [
                //     { text: "OK", onPress: () => this.get_chats_data() }
                // ]);
                this.search_user()
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
          <ContactListItem
            user={item}
            onPress={
            () => this.props.navigation.push("Profile", {find_user_id: this.state.data[0].user_id, sender_id: this.state.user_id,
              token: this.state.token})
        }
          />
          );
        };

  render(){
    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.header_container}>
                <View style={styles.inputView} >
                    <TextInput  
                        style={styles.inputText}
                        placeholder="Username..." 
                        placeholderTextColor="#FFFFFF"
                        maxLength={45}
                        onChangeText={this.onUsernameChange}/>
                </View>
                <TouchableOpacity style={styles.backBtn} onPress={() => this.search_user()}>
                        <Icons name={'enter'} size={30} color='#fff' style={{marginLeft: '0%'}}/>
                </TouchableOpacity>
            </View>

            <FlatList
            data={this.state.data}
            extraData={this.state.data}
            renderItem={this.renderItem}
            keyExtractor={item => item.user_id}
            ListEmptyComponent={<View style={{marginTop:"60%", marginLeft:"30%"}}><Text style={{color: "#FFFFFF"}}>Find people by username</Text></View>}
            />
        </SafeAreaView>

    );
  }
}

const styles = StyleSheet.create({
    header_container:{
        flexDirection: "row",
        alignItems:"center",
        justifyContent: "center"
    },

  container: {
    flex: 1,
    backgroundColor: "#000000"
  },
  logo:{
    fontWeight:"bold",
    fontSize:50,
    color:"#000000",
    marginBottom:40
  },
  inputView:{
    flex: 0.8 ,
    backgroundColor:"#24303f",
    borderRadius:10,
    height:50,
    justifyContent:"center",
    padding:20,
    marginTop: 15,
    borderColor: "#000000",
    borderWidth: 1
  },  
    backBtn:{
    flex: 0.15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5
},
  inputText:{
    height:50,
    color:"#FFFFFF"
  },
  loginBtn:{
    width:"80%",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  }
});