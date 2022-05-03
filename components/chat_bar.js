import React, {Component} from 'react';
import {StyleSheet, SafeAreaView, TouchableOpacity, Image, Text, View} from 'react-native';
import { Avatar } from 'react-native-paper';
import Icons from 'react-native-vector-icons/MaterialIcons';


const defaultPicture = "iVBORw0KGgoAAAANSUhEUgAAAgAAAAIAAgMAAACJFjxpAAAADFBMVEXFxcX////p6enW1tbAmiBwAAAFiElEQVR4AezAgQAAAACAoP2pF6kAAAAAAAAAAAAAAIDbu2MkvY0jiuMWWQoUmI50BB+BgRTpCAz4G6C8CJDrC3AEXGKPoMTlYA/gAJfwETawI8cuBs5Nk2KtvfiLW+gLfK9m+r3X82G653+JP/zjF8afP1S//y+An4/i51//AsB4aH+/QPD6EQAY/zwZwN8BAP50bh786KP4+VT+3fs4/noigEc+jnHeJrzxX+NWMDDh4g8+EXcnLcC9T8U5S/CdT8bcUeBEIrwBOiI8ki7Ba5+NrePgWUy89/nYyxQ8Iw3f+pWY4h1gb3eAW7sDTPEOsLc7wK1TIeDuDB+I/OA1QOUHv/dFsZQkhKkh4QlEfOULYz2nGj2/Nn1LmwR/86VxlCoAW6kCsHRGANx1RgCMo5Qh2EsZgrXNQZZShp5Liv7Il8eIc5C91EHY2hxk6bwYmNscZIReDBwtCdhbErC1JGBpScBcOgFMLQsZMQs5Whayd+UQsLYsZGlZyNyykKllISNmIUfAwifw8NXvTojAjGFrdYi11SGWVoeYWx1i6lmQCiEjFkKOVgjZ+xxIhZCtFULWHkCqxCw9gNQKmP9vNHzipdEPrRcxtVbAeDkAvve0iM2QozVD9hfjhp4YP/UrkJYDbD2AtBxgfSkAvvHEeNcDSAsilgtAWxIy91J8AXgZAJ5e33+4tuACcAG4AFwALgBXRXQB6AFcB5MXAuA6nl9/0Vx/011/1V5/1/dfTPJvRtdnu/zL6beeFO/7r+fXBYbrEkt/j+i6ytXfpuvvE/ZXOnsA/a3a/l5xf7O6v1t+Xe/vOyz6HpO8yyboM8o7rfJes77bru83THk48p7TvOs27zvOO6/73vO++z7l4cgnMPQzKPopHC0N9noSSz6LJp/Gk88jyicy5TOp6qlc+VyyfDJbPpuuns6XzyfMJzTmMyrrKZ35nNJ8Ums+q7af1tvPK+4nNodEnPKp3fnc8npyez67/qVP7+/fL8hfcMjfsOhf8cjfMclfcnn9+BkOnLECP8Q58OYeyJ40eoyF6Ee/En/JHlP6mIlRVXprF4BxtAvArV0AxtEuALd2ARhHuwDc2gVgHPX/hFv9fMBddjIGeKg/WCxlCsI46u+Ga5mCcJd+sIG9UkGAW32ZbApFAHhod4Bb3eo04h3god0BbiUHYApVCNjbHeBW+QDAXT4a7qg7r7e214057vg0QhkEHkoSwq0kIdydXw4/Q3H8hjYJ3vL0WConBJhCHQaOToeBrU0BljYFmEoVgHGUKgAPnREAt84IgLuqFgAYSUEOAHszDwuAtSkHAZhLGYIpdCLgKGUIHtocZG1zkLmUIRhxDnJU1RDA1uYga5uDzKUOwhTnIEfnxcDe5iBrcyQAYGlzkKkUYhhxDrKXQgxbSwLWUohhbknA1JKAEZOAvSUBW0sC1pYEzC0JmFoSMMJyCDhaFrK3JGDtyiFgaVnI3LKQqWUhI2YhR8tC9paFrC0LWVoWMrcsZGpZyIhZyNGykL2rSIGtlQHWVgZYWhlgbmWAqZUBRiwDHK0MsLcywNbKAGsOoNUhllaHmFsdYmp1iBHrEEerQ+w5gFYI2VodYm11iKXVIeYcQCuETK0QMmIh5MgBtELI3gohWyuErDmAVolZWiFkzgG0SszUKjGjfj6gVmKOVonZcwCtFbB9HQC+ozWDbz1bvGu9iKW1AuYcQOtFTLEX1GbIaFegN0OOHEBrhuw5gNYM2XIArRuz5gDacoB3bTnAEktxXQ4wfw0AvveM8b4tiJjSJOwLIsbXsAKeNeKCiOO3D+AVbUl0AfjGs8ZPbUnIdgFoa1LWC0BblfMuB9AeC1j6gqQE0J9LmC8AOYD2ZMb7i4bt2ZTpWoHfPoB7Tj2fXzT8N1X41vkq/QHOAAAAAElFTkSuQmCC"

export default class App extends React.Component {

    constructor(props){
      super(props);
  
      this.state={
        onPressBar: this.props.onPressBar,
        onPressBtn: this.props.onPressBtn,
        picture: this.props.picture == null ? defaultPicture : this.props.picture ,
        nickname: this.props.nickname,
      }

    }  
    
    render(){
      return (
            <SafeAreaView style={styles.window_header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => this.state.onPressBtn()}>
                    <Icons name={'arrow-back'} size={30} color='#fff' style={{marginLeft: '0%'}}/>
                </TouchableOpacity>

                <TouchableOpacity style={styles.user_header} onPress={() => this.state.onPressBar()}>
                    <Avatar.Image size={50} source={{uri: `data:image/jpeg;base64,${this.state.picture}`}} style={{margin:5, backgroundColor: "#FFFFFF"}}/>
                    <View style={styles.chat_header}>
                        <Text style={styles.name}>
                            {this.state.nickname}
                        </Text>
                    </View>
                </TouchableOpacity>
            </SafeAreaView>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFFFFF"
    },
    backBtn:{
        flex: 0.15,
        justifyContent: "center",
        alignItems: "center"
    },
    window_header:{
        flex:1,
        flexDirection: "row",
        backgroundColor: "#000000",
        justifyContent: "center",
        alignItems: "center"
    },
    user_header:{
        flex:0.85,
        flexDirection: "row",
        backgroundColor: "#000000",
        justifyContent: "flex-start",
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