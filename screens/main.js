import React, {Component} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatsList from "./chats_list";

const Tab = createBottomTabNavigator();

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
component={ChatsList}
options={{ headerShown: false }}/>

<Tab.Screen
name="Settings"
component={ChatsList}
options={{ headerShown: false }}/>
</Tab.Navigator>
);
}

}