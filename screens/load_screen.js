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

  }
  
  componentDidMount(){
    dbAPI.createTables();
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
                    this.props.navigation.replace("Main");
                  }else{
                    this.props.navigation.replace("Login");
                  }
              },
              error => {
                  console.log("error after selecting rows");
                  console.log(error.message);
              }
          )
      })
}



  render(){
  
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={require("../images/logo.png")} />
        <Text style={styles.logo}>Pigeongram</Text>
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
  image: {
    marginBottom: 20,
    width: 100,
    height: 100
  }
});