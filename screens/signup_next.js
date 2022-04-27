import React from 'react';
import { StyleSheet, Text, View, TextInput, Image, Pressable} from 'react-native';

export default class App extends React.Component {
  state={
    nickname:"",
    bio:""
  }
  render(){
    return (
      <View style={styles.container}>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Nickname..." 
            placeholderTextColor="#000000"
            onChangeText={text => this.setState({nickname:text})}/>
        </View>
        <View style={styles.BioView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Bio..." 
            placeholderTextColor="#000000"
            onChangeText={text => this.setState({bio:text})}/>
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
        onPress={() => {
        }
        }>
          <Text style={styles.loginText}>Sign up!</Text>
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
    justifyContent: "flex-start",
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
    marginBottom:20,
    justifyContent:"center",
    padding:20,
    borderColor: "#000000",
    borderWidth: 1
  },
  BioView:{
    width:"80%",
    backgroundColor:"#FFFFFF",
    borderRadius:25,
    height:150,
    marginBottom:20,
    paddingTop: 0,
    justifyContent: "flex-start",
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
});