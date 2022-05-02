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

    this.state={
        user_id: this.props.route.params.find_user_id,
        picture: null,
        username: null,
        nickname: null,
        bio: null,
        data: null,
        onPressBtn: () => this.props.navigation.goBack()
    }
    this.get_user_data = this.get_user_data.bind(this);
    this.get_user_data();
  }  
  // Main screen method (request to API for login and inserting server response to the local DB)
    async get_user_data(){
        console.log("fetching user data");
      if (this.state.user_id != null){
          console.log("api post /user/get request send");
        server_response = await api.get_user(this.state.user_id);
        if (await server_response.status === true){
            console.log("got reponse with user data")
            this.setState(this.state.data =  await server_response.response)
            this.setState({picture: await server_response.response.pictures[0].picture != null ? await server_response.response.pictures[0].picture : defaultPicture})
            this.setState({username: await server_response.response.username})
            this.setState({nickname: await server_response.response.nickname})
            this.setState({bio: await server_response.response.bio == null ? "Empty..." : await server_response.response.bio})
        }else{
            if (await server_response.db_error === true){
                // Alert.alert("Error", 
                // "Error on the server side or with your internet connection. Try again.",
                // [
                //     { text: "OK", onPress: () => this.get_messages_data() }
                // ]);
                this.get_user_data()
            }else{
            }
        }
      }else{
          console.log("user_id null");
      }
    }
    renderRow = (cells) => {
        return cells.map((cell) => (
          <View style={styles.cell} key={cell.title}>
          <Text style={styles.cellTitle}>{cell.title}</Text>
          <Text style={styles.cellValue}>{cell.value}</Text>
          </View>
        ));
        };

    render(){
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.backBtn}>
                    <TouchableOpacity  onPress={this.state.onPressBtn}>
                        <Icons name={'arrow-back'} size={35} color='#fff' style={{marginLeft: '0%'}}/>
                    </TouchableOpacity>
                </View>

                <View style={{alignItems:"center"}}>
                    <Avatar.Image size={175} source={{uri: `data:image/jpeg;base64,${this.state.picture}`}} style={{marginTop:20}}/>
                    <View style={styles.userinfo}>
                        {this.renderRow([
                        {title: 'Username', value: this.state.username},
                        {title: 'Nickname', value: this.state.nickname},
                        {title: 'Bio', value: this.state.bio},
                        ])}
                    </View>
                </View>

            </SafeAreaView>

        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000"
  },
  userinfo: {
    width: "80%",
  },
  cell: {
    marginTop: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderRadius: 15,
    backgroundColor: "#1a222c",
    padding: 10
  },
  cellTitle: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  cellValue: {
    marginTop: 10,
    fontSize: 16,
    color: '#4f9bec',
  },
  backBtn:{
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop: 10,
    marginLeft: 10
},
});