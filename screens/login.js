import React from 'react';
import { StyleSheet, Text, View, TextInput, Image, Pressable, Alert} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as api from "../api/MyApi";
import * as dbAPI from "../api/DB";
import SQLite from 'react-native-sqlite-storage';

export default class App extends React.Component {

  constructor(props){
    super(props);

    this.state={
      email:"",
      password:"",
      emailValid: true,
      passwordValid: true,
      formValid:false
    }
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.login_btn = this.login_btn.bind(this);
    this.getUser = this.getUser.bind(this);
  }
  
  componentDidMount(){
    this.getUser();
  }

  // state methods
  validateEmail(email){
    const EmailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    return EmailRegex.test(email) && email.length<=255;
  }

  validatePassword(password){
    return password.length >= 6;
  }

  validateForm(){
    this.setState({formValid: this.state.emailValid && this.state.passwordValid && this.state.email.length > 0 && this.state.password.length > 0})
  }

  onEmailChange(email){
    var validEmail = this.validateEmail(email);
    this.setState({email: email, emailValid: validEmail})
    this.validateForm()
  }

  onPasswordChange(password){
    var validPassword = this.validatePassword(password);
    this.setState({password: password, passwordValid: validPassword})
    this.validateForm()
  }
  // DB methods
  addUser = (user_id, token, active=true) => {
    const db = SQLite.openDatabase({name : "App.db"})
    return db.transaction(tx => {
        tx.executeSql(
            "INSERT INTO USERS VALUES(?, ?, ? )",
            [user_id, token, active],
            () => {
                console.log("row inserted successsfully");

            },
            error => {
                console.log("error after inserting row");
                console.log(error.message);
        }
        )
    })
}


getUser = () => {
  const db = SQLite.openDatabase({name : "App.db"});
  return db.transaction(tx => {
          tx.executeSql(
              "SELECT * FROM USERS",
              [],
              (sqlTxn, res) => {
                  if(res.rows.length > 0){
                    this.props.navigation.navigate("Main");
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
  async login_btn(){
    dbAPI.deleteUser();
    if (this.state.formValid){
      let login = this.state.email;
      let password = this.state.password;
    try{
      dbAPI.createTables();
      const response = await api.login(login, password);
      if (await response.status === true){
        result = this.addUser(await response.user_id, await response.token, true);
        this.props.navigation.replace("Main");
      }
      else{
        if(await response.db_error === true){
          Alert.alert("Error", "Error on the server side. Try again.");
        }
        else{
          if(await response.login === true){
            Alert.alert("Error", "Wrong password");
          }
          else{
            Alert.alert("Error", "This account doesn't exist");
          }
        }
      }
      
    }
    catch(error){
      console.error(error.message);
      Alert.alert("Error", "Something went wrong. Try again.");
    }
    }
  }


  render(){
    let showEmailError = this.state.emailValid === true ? "#FFFFFF" : "red";
    let showPasswordError = this.state.passwordValid === true ? "#FFFFFF" : "red";
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={require("../images/logo.png")} />
        <Text style={styles.logo}>Pigeongram</Text>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Email..." 
            placeholderTextColor="#000000"
            onChangeText={this.onEmailChange}/>
        </View>
        <View style={styles.errorView}>
          <Text style={styles.textError, {color: showEmailError}}>Wrong email address</Text>
        </View>
        
        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="Password..." 
            placeholderTextColor="#000000"
            onChangeText={this.onPasswordChange}/>
        </View>
        <View style={styles.errorView}>
          <Text style={{color: showPasswordError}}>Password length must be 6 or more</Text>
        </View>
        <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed
              ? '#A0A0A0'
              : '#000000'
          },
          styles.loginBtn
        ]}
        onPress={this.login_btn}>
          <Text style={styles.loginText}>LOGIN</Text>
        </Pressable>

        <Pressable 
          style={{marginTop: 10, marginBottom:15}}
          onPress={() => this.props.navigation.navigate("Signup")}>
            <Text style={styles.signupText}>New there? Sign up.</Text>
          </Pressable>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center'
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