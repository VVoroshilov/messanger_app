import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Image, Text, View} from 'react-native';


export default class App extends Component {
  render = () => {
  const message = this.props.message;
  const user_id = this.props.user;
  const onPress = this.props.onPress;
  const multimedia = message.multimedia[0] == null ? null : message.multimedia.map(picture => {
    return(  <Image source={{uri: `data:image/jpeg;base64,${picture}`}} key={picture} resizeMode={'contain'} style={styles.picture}
    />)
  })

  const sending_time = message.sending_time
  const message_text = message.message_text === null ? null : message.message_text;
  const isMyMessage = (sender_id, my_id) => {
    return sender_id === my_id
  }
  const message_title = isMyMessage(message.sender_id, user_id) === true? "Me: " : this.props.nickname;

  return (
    <View style={[styles.container, 
    {backgroundColor: isMyMessage(message.sender_id, user_id) === true ? "#486a93" : "#24303f"},
    {marginLeft: isMyMessage(message.sender_id, user_id) === true ? "25%" : "5%"}]}>
        <View style={styles.col}>
            <View style={styles.chat_header}>
                <Text style={styles.name}>
                    {message_title}
                </Text>

                <Text style={styles.time}>
                    {sending_time}
                </Text>
            </View>

            <Text style={styles.message}>
                {message_text}
            </Text>

            <View style={styles.multimedia_view}>
                {multimedia}
            </View>
        </View>
    </View>
  );
  };
}


const styles = StyleSheet.create({
    container: {
      flex:1,
      width: "70%",
      flexDirection: 'row',
      alignItems: 'flex-start',
      padding: 12,
      borderRadius: 35,
      margin:5
    },
    multimedia_view:{
        flex:1,
        flexDirection: 'row',
        flexWrap:"wrap",
        alignItems: "center",
        justifyContent: "center",
    },
      picture: {
      width: "90%",
      height: 200,
      borderRadius: 3,
      margin: 5,
      resizeMode: 'contain'
    },
    col: {
        flex:1,
      marginLeft: 10,
      justifyContent: "space-around",
    },
    name: {
      fontSize: 16,
      color: '#FFFFFF',
    },
    time: {
        fontSize: 12,
        color: '#8d9baa',      },
    message: {
      marginTop: 10,
      fontSize: 14,
      color: '#FFFFFF',
    },
    chat_header:{
        flex:1,
        alignItems: "flex-start",
        justifyContent: "space-between"
    }
  });