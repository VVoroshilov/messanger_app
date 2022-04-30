import React from 'react';
import { StyleSheet, Text, View, TextInput, Image, Pressable, ScrollView, Alert} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as api from "../api/MyApi";


export default class App extends React.Component {

  constructor(props){
    super(props);

    this.state={
      email:"",
      password:"",
      username:"",
      nickname:"",
      bio:"",
      emailValid: true,
      passwordValid: true,
      usernameValid:true,
      nicknameValid:true,
      formValid: false
    }
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onNicknameChange = this.onNicknameChange.bind(this);
    this.onBioChange = this.onBioChange.bind(this);
    this.signup_btn = this.signup_btn.bind(this);
  }  

  // state methods
  validateEmail(email){
    const EmailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    return EmailRegex.test(email) && email.length<=255;
  }

  validatePassword(password){
    return password.length >= 6;
  }

  validateUsername(username){
    return username.length >= 2;
  }

  validateNickname(nickname){
    return nickname.length >= 2;
  }

  validateForm(){
    this.setState({formValid: this.state.emailValid && this.state.passwordValid 
      && this.state.email.length > 0 && this.state.password.length > 0
      && this.state.usernameValid && this.state.username.length > 0
      && this.state.nicknameValid && this.state.nickname.length > 0})
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

  onUsernameChange(username){
    var validUsername = this.validateUsername(username);
    this.setState({username: username, usernameValid: validUsername})
    this.validateForm()
  }

  onNicknameChange(nickname){
    var validNickname = this.validateNickname(nickname);
    this.setState({nickname: nickname, nicknameValid: validNickname})
    this.validateForm()
  }

  onBioChange(bio){
    this.setState({bio: bio})
  }


  async signup_btn(){
    if (this.state.formValid){
      let login = this.state.email;
      let password = this.state.password;
      let username = this.state.username;
      let nickname = this.state.nickname;
      let bio = this.state.bio;
    try{
      const response = await api.sign_up(login, password, username, nickname, bio);
      if (await response.status === true){
        Alert.alert(
          "Success",
          "Your account was registered",
          [
            { text: "Login", onPress: () => this.props.navigation.navigate("Login") }
          ]
        )
      }
      else{
        if(await response.db_error === true){
          Alert.alert("Error", "Error on the server side. Try again.");
        }
        else{
          if(await response.login === true){
            Alert.alert("Error", "Username is busy");
          }
          else{
            if(await response.username === true){
              Alert.alert("Error", "Login is busy");
            }else{
              Alert.alert("Error", "Login and username are busy");
            }
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
    let showUsernameError = this.state.usernameValid === true ? "#FFFFFF" : "red";
    let showNicknameError = this.state.nicknameValid === true ? "#FFFFFF" : "red";
    return (
      <ScrollView>
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

          <View style={styles.inputView} >
            <TextInput  
              style={styles.inputText}
              placeholder="Username..." 
              placeholderTextColor="#000000"
              onChangeText={this.onUsernameChange}/>
          </View>
          <View style={styles.errorView}>
            <Text style={{color: showUsernameError}}>Username length must be 2 or more</Text>
          </View>
          <View style={styles.inputView} >
            <TextInput  
              style={styles.inputText}
              placeholder="Nickname..." 
              placeholderTextColor="#000000"
              onChangeText={this.onNicknameChange}/>
          </View>
          <View style={styles.errorView}>
            <Text style={{color: showNicknameError}}>Nickname length must be 2 or more</Text>
          </View>
          <View style={styles.BioView}>
            <TextInput  
              style={styles.BioinputText}
              placeholder="Bio..." 
              placeholderTextColor="#000000"
              onChangeText={this.onBioChange}
              multiline={true} 
              numberOfLines={4}
              maxLength={200} />
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
          onPress={this.signup_btn}>
            <Text style={styles.loginText}>Sign up</Text>
          </Pressable>
          <Pressable 
          style={{marginTop: 10, marginBottom:15}}
          onPress={() => this.props.navigation.navigate("Login")}>
            <Text style={styles.signupText}>Have an account? Login.</Text>
          </Pressable>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
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
    marginBottom:5,
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
    color:"#000000",
    fontSize:14
  },
  image: {
    marginTop: 40,
    marginBottom: 20,
    width: 125,
    height: 125
  },
  BioView:{
    width:"80%",
    backgroundColor:"#FFFFFF",
    borderRadius:25,
    height:125,
    marginBottom:20,
    paddingTop: 0,
    justifyContent: "flex-start",
    padding:20,
    borderColor: "#000000",
    borderWidth: 1
  },
  BioinputText: {
    height:125,
    color:"#000000"
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