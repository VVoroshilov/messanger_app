import React, {Component} from 'react';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatsList from "./chats_list";
import ContactList from "./contact_list";
import Chat from "./chat";
import PersonProfile from "./person";
import SettingsList from "./settings";
import Icons from 'react-native-vector-icons/MaterialIcons';


const Tab = createBottomTabNavigator();
const ChatStack = createNativeStackNavigator();

function ChatStackScreen(route) {
    return (
      <ChatStack.Navigator>
        <ChatStack.Screen name="ChatsList" component={ChatsList} options={{ headerShown: false }} />
        <ChatStack.Screen name="Chat" component={Chat} options={{ headerShown: false}}/>
        <ChatStack.Screen name="Profile" component={PersonProfile} options={{ headerShown: false }}/>
      </ChatStack.Navigator>
    );
  }


function ContactStackScreen(route) {
  return (
    <ChatStack.Navigator>
      <ChatStack.Screen name="ContactList" component={ContactList} options={{ headerShown: false }} />
      <ChatStack.Screen name="Profile" component={PersonProfile} options={{ headerShown: false }}/>
    </ChatStack.Navigator>
  );
}

export default class App extends React.Component{
    render(){
        return (
        <Tab.Navigator initialRouteName="Chats" 
        screenOptions={{
          "tabBarHideOnKeyboard": "true",
          tabBarStyle:{
            backgroundColor: "#1a222c"}}}>
            <Tab.Screen
            name="Contacts"
            component={ContactStackScreen}
            options={{ 
              tabBarStyle: {
                fontSize: 14, 
                backgroundColor: "#1a222c"},
                headerShown: false,
                tabBarIcon: () => (
                  <Icons name="supervised-user-circle" color={"#b4c2d3"} size={28} />
                ) }
              }
            />

            <Tab.Screen
            name="Chats"
            component={ChatStackScreen}
            options={{ 
              tabBarStyle: {fontSize: 14, backgroundColor: "#1a222c"},
              headerShown: false,
              display: this.props.navigation.getState().routes[this.props.navigation.getState().index].name === "Chat" ? "none":"flex",
              tabBarIcon: () => (
                <Icons name="messenger-outline" color={"#b4c2d3"} size={28} />
              ) }}/>

            <Tab.Screen
            name="Settings"
            component={SettingsList}
            options={{ 
              tabBarStyle: {fontSize: 14, backgroundColor: "#1a222c"},
              headerShown: false,
              tabBarIcon: () => (
                <Icons name="build-circle" color={"#b4c2d3"} size={28} />
              ) }}/>
        </Tab.Navigator>
        );
    }

}