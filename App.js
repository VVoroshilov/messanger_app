/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "./screens/login";
import SignUp from "./screens/signup";
import MainScreen from "./screens/main";
import LoadScreen from "./screens/load_screen";


const Stack = createNativeStackNavigator();


const App: () => Node = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoadScreen">

      <Stack.Screen 
        name="LoadScreen" 
        component={LoadScreen} 
        options={{ headerShown: false }}/>

        <Stack.Screen 
        name="Signup" 
        component={SignUp} 
        options={{ headerShown: false }}/>

        <Stack.Screen 
        name="Login" 
        component={Login}
        options={{ headerShown: false }} />

        <Stack.Screen 
        name="Main" 
        component={MainScreen}
        options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
