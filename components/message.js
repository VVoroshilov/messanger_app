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
  const sending_time = message.sending_time;
  const message_text = message.message_text === null ? null : message.message_text;
  const isMyMessage = (sender_id, my_id) => {
    return sender_id === my_id
  }
  const message_title = isMyMessage(message.sender_id, user_id) === true? "Me: " : this.props.nickname;

  return (
    <View style={[styles.container, {backgroundColor: isMyMessage(message.sender_id, user_id) === true ? "#f7cf46" : "#FFFFFF"}]}>
        <View style={styles.col}>
            <View style={styles.chat_header}>
                <Text style={styles.name}>
                    {message_title}
                </Text>

                <Text style={styles.time}>
                    {sending_time}
                </Text>
            </View>

            <Text style={styles.email}>
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
      flexDirection: 'row',
      alignItems: 'center',
      padding: 12,
      borderBottomColor: '#000000',
      borderBottomWidth: 0.5,
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
    },
    col: {
        flex:1,
      marginLeft: 10,
      justifyContent: "space-around",
    },
    name: {
      fontSize: 16,
      color: '#2e2e2e',
    },
    time: {
        fontSize: 12,
        color: '#2e2e2e',      },
    email: {
      marginTop: 10,
      fontSize: 13,
      color: '#000000',
    },
    chat_header:{
        flex:1,
        alignItems: "baseline",
    }
  });