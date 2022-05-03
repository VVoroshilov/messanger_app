import React, { useRef } from 'react';
import { StyleSheet, Text, View, SafeAreaView,  TextInput, Image, Pressable, Alert, FlatList, ActivityIndicator, TouchableOpacity, Button} from 'react-native';

import * as api from "../api/MyApi";
import * as dbAPI from "../api/DB";
import SQLite from 'react-native-sqlite-storage';
import Message from "../components/message";
import ChatBar from "../components/chat_bar";
import InputBar from "../components/input_bar";
import { Avatar } from 'react-native-paper';
import Icons from 'react-native-vector-icons/MaterialIcons';

const defaultPicture = "iVBORw0KGgoAAAANSUhEUgAAAgAAAAIAAgMAAACJFjxpAAAADFBMVEXFxcX////p6enW1tbAmiBwAAAFiElEQVR4AezAgQAAAACAoP2pF6kAAAAAAAAAAAAAAIDbu2MkvY0jiuMWWQoUmI50BB+BgRTpCAz4G6C8CJDrC3AEXGKPoMTlYA/gAJfwETawI8cuBs5Nk2KtvfiLW+gLfK9m+r3X82G653+JP/zjF8afP1S//y+An4/i51//AsB4aH+/QPD6EQAY/zwZwN8BAP50bh786KP4+VT+3fs4/noigEc+jnHeJrzxX+NWMDDh4g8+EXcnLcC9T8U5S/CdT8bcUeBEIrwBOiI8ki7Ba5+NrePgWUy89/nYyxQ8Iw3f+pWY4h1gb3eAW7sDTPEOsLc7wK1TIeDuDB+I/OA1QOUHv/dFsZQkhKkh4QlEfOULYz2nGj2/Nn1LmwR/86VxlCoAW6kCsHRGANx1RgCMo5Qh2EsZgrXNQZZShp5Liv7Il8eIc5C91EHY2hxk6bwYmNscZIReDBwtCdhbErC1JGBpScBcOgFMLQsZMQs5Whayd+UQsLYsZGlZyNyykKllISNmIUfAwifw8NXvTojAjGFrdYi11SGWVoeYWx1i6lmQCiEjFkKOVgjZ+xxIhZCtFULWHkCqxCw9gNQKmP9vNHzipdEPrRcxtVbAeDkAvve0iM2QozVD9hfjhp4YP/UrkJYDbD2AtBxgfSkAvvHEeNcDSAsilgtAWxIy91J8AXgZAJ5e33+4tuACcAG4AFwALgBXRXQB6AFcB5MXAuA6nl9/0Vx/011/1V5/1/dfTPJvRtdnu/zL6beeFO/7r+fXBYbrEkt/j+i6ytXfpuvvE/ZXOnsA/a3a/l5xf7O6v1t+Xe/vOyz6HpO8yyboM8o7rfJes77bru83THk48p7TvOs27zvOO6/73vO++z7l4cgnMPQzKPopHC0N9noSSz6LJp/Gk88jyicy5TOp6qlc+VyyfDJbPpuuns6XzyfMJzTmMyrrKZ35nNJ8Ums+q7af1tvPK+4nNodEnPKp3fnc8npyez67/qVP7+/fL8hfcMjfsOhf8cjfMclfcnn9+BkOnLECP8Q58OYeyJ40eoyF6Ee/En/JHlP6mIlRVXprF4BxtAvArV0AxtEuALd2ARhHuwDc2gVgHPX/hFv9fMBddjIGeKg/WCxlCsI46u+Ga5mCcJd+sIG9UkGAW32ZbApFAHhod4Bb3eo04h3god0BbiUHYApVCNjbHeBW+QDAXT4a7qg7r7e214057vg0QhkEHkoSwq0kIdydXw4/Q3H8hjYJ3vL0WConBJhCHQaOToeBrU0BljYFmEoVgHGUKgAPnREAt84IgLuqFgAYSUEOAHszDwuAtSkHAZhLGYIpdCLgKGUIHtocZG1zkLmUIRhxDnJU1RDA1uYga5uDzKUOwhTnIEfnxcDe5iBrcyQAYGlzkKkUYhhxDrKXQgxbSwLWUohhbknA1JKAEZOAvSUBW0sC1pYEzC0JmFoSMMJyCDhaFrK3JGDtyiFgaVnI3LKQqWUhI2YhR8tC9paFrC0LWVoWMrcsZGpZyIhZyNGykL2rSIGtlQHWVgZYWhlgbmWAqZUBRiwDHK0MsLcywNbKAGsOoNUhllaHmFsdYmp1iBHrEEerQ+w5gFYI2VodYm11iKXVIeYcQCuETK0QMmIh5MgBtELI3gohWyuErDmAVolZWiFkzgG0SszUKjGjfj6gVmKOVonZcwCtFbB9HQC+ozWDbz1bvGu9iKW1AuYcQOtFTLEX1GbIaFegN0OOHEBrhuw5gNYM2XIArRuz5gDacoB3bTnAEktxXQ4wfw0AvveM8b4tiJjSJOwLIsbXsAKeNeKCiOO3D+AVbUl0AfjGs8ZPbUnIdgFoa1LWC0BblfMuB9AeC1j6gqQE0J9LmC8AOYD2ZMb7i4bt2ZTpWoHfPoB7Tj2fXzT8N1X41vkq/QHOAAAAAElFTkSuQmCC"
export default class App extends React.Component {

  constructor(props){
    super(props);
    this.props.navigation.setOptions({tabBarStyle: {display: "none"}})

    this.state={
        data: [],
        extradata: null,
        companion_id: this.props.route.params.companion_id,
        user_id: this.props.route.params.user_id,
        token: this.props.route.params.token,
        chat_id: this.props.route.params.chat_id,
        picture: this.props.route.params.picture != null? this.props.route.params.picture : defaultPicture,
        nickname: this.props.route.params.nickname,
        receiver_id: this.props.route.params.receiver_id,
        flex: 0.15, 
        message_skip: 0
    }
    this.get_messages_data = this.get_messages_data.bind(this);
    this.get_older_messages = this.get_older_messages.bind(this);
  }  

  componentDidMount(){
    this.get_messages_data();
    this.willFocusSubscription = this.props.navigation.addListener(
      'focus',
      () => {
        this.get_messages_data();
      }
    );
  }

  componentWillUnmount() {
    this.willFocusSubscription();
  }

  shouldComponentUpdate(nextProps, nextState){
    if (nextState.data != this.state.data){
      return true
    }
    return false
  }


  // Main screen method (request to API for login and inserting server response to the local DB)
    async get_messages_data(mes_amount = 30, mes_skip = 0){
        console.log("fetching messages data");
      if (this.state.user_id != null && this.state.token != null && this.state.chat_id != null){
          console.log("api post /messages/get request send");
        server_response = await api.get_messages(this.state.user_id, this.state.token, this.state.chat_id, mes_amount, mes_skip);
        if (await server_response.status === true){
            console.log("got reponse with messages")
            this.setState({data: await server_response.response})
        }else{
            if (await server_response.db_error === true){
                // Alert.alert("Error", 
                // "Error on the server side or with your internet connection. Try again.",
                // [
                //     { text: "OK", onPress: () => this.get_messages_data() }
                // ]);
                this.get_messages_data()
            }else{
                // Тут вывести, что пара id + токен недействительна на сервере.
            }
        }
      }else{
          console.log("something is null");
      }
    } 

    get_older_messages(){
      this.get_messages_data(30 + (this.state.message_skip + 30));
      this.setState({message_skip: this.state.message_skip + 30});
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
        <SafeAreaView style={styles.container}>
            <View style={{height: 60}}>
                <ChatBar 
                    picture={this.state.picture} 
                    nickname={this.state.nickname} 
                    sender_id={this.state.user_id}
                    token={this.state.token}
                    onPressBtn= {() => this.props.navigation.goBack()}
                    onPressBar={() => this.props.navigation.push("Profile", {
                      find_user_id: this.state.companion_id,
                      sender_id: this.state.user_id,
                      token: this.state.token })}/>
            </View>
            <View style={{flex:1-(this.state.flex-0.15)}}>
                <FlatList
                data={this.state.data}
                renderItem={this.renderItem}
                keyExtractor={item => item.message_id}
                ListEmptyComponent={<View style={{marginTop:"60%"}}><ActivityIndicator size="large"/></View>}
                inverted={true}
                onEndReachedThreshold={0.1}
                onEndReached={this.get_older_messages}
                extraData={this.state.data}
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
                    setChat={(chat_id) => this.setState({chat_id: chat_id})}
                    />
            </View>
        </SafeAreaView>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a222c"
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