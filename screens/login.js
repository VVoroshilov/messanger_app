import React from 'react';
import { StyleSheet, Text, View, TextInput, Image, Pressable, Alert} from 'react-native';
import * as api from "../api/MyApi";
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: "MessangerDB",
    location:"default"
  },
  () => { },
  error => {console.log(error)}
)

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

//   // Database methods
  createAllTables = () => {
    db.transaction((tx) => {
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS "
            + "Users"
            + "(user_id INTEGER PRIMARY KEY, token TEXT NOT NULL);"
            + "CREATE TABLE IF NOT EXISTS"
            + "Chats"
            + "(chat_id INTEGER PRIMARY KEY, key TEXT);"
        )
    })
  }


  setUserData = async (user_id, token, active=true) => {
    try {
        await db.transaction(async (tx) => {
            await tx.executeSql(
                "INSERT INTO Users (user_id, token, active) VALUES (?,?,?)",
                [user_id, token, active],
                (tx, results) => {
                  if (results.rowsAffected > 0) {
                    Alert.alert(
                      'Success',
                      'You are Registered Successfully'
                      // ,
                      // [
                      //   {
                      //     text: 'Ok',
                      //     onPress: () => navigation.navigate('HomeScreen'),
                      //   },
                      // ],
                      // { cancelable: false }
                    );
                  } else Alert.alert("error", 'Registration Failed');
                }
            );
        })
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
  }



  getData = () => {
    try {
        db.transaction((tx) => {
            tx.executeSql(
                "SELECT user_id, token FROM Users",
                [],
                (tx, results) => {
                    var len = results.rows.length;
                    if (len > 0) {
                        // navigation.navigate('Home');
                        Alert.alert(results.rows.item(0).user_id.toString(), results.rows.item(0).token)
                    }
                }
            )
        })
    } catch (error) {
        console.log(error);
    }
}


  

  // Main screen method (request to API for login)
  async login_btn(){
    if (this.state.formValid){
      let login = this.state.email;
      let password = this.state.password;
    try{
      const response = await api.login(login, password);
      if (await response.status === true){
        if (this.setUserData(response.user_id, response.token) === true) {
          Alert.alert(response.user_id.toString(), response.token);
        }else{
          Alert.alert("error", "local db didn't insert values =(");
        }
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
      console.error(error);
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