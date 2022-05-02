import React, {Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatsList from "./chats_list";
import Chat from "./chat";
import PersonProfile from "./person";


const Tab = createBottomTabNavigator();
const ChatStack = createNativeStackNavigator();

function ChatStackScreen() {
    return (
      <ChatStack.Navigator>
        <ChatStack.Screen name="ChatsList" component={ChatsList} options={{ headerShown: false }} />
        <ChatStack.Screen name="Chat" component={Chat} options={{ headerShown: false, tabBarStyle: {display: 'none'}}}/>
        <ChatStack.Screen name="Profile" component={PersonProfile} options={{ headerShown: false }}/>
      </ChatStack.Navigator>
    );
  }

export default class App extends React.Component{
    render(){
        return (
        <Tab.Navigator initialRouteName="Chats">
            <Tab.Screen
            name="Contacts"
            component={ChatsList}
            options={{ headerShown: false }}/>

            <Tab.Screen
            name="Chats"
            component={ChatStackScreen}
            options={{ headerShown: false }}/>

            <Tab.Screen
            name="Settings"
            component={ChatsList}
            options={{ headerShown: false }}/>
        </Tab.Navigator>
        );
    }

}