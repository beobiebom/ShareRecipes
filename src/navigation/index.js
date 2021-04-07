import React from 'react'
import {createStackNavigator,CardStyleInterpolators} from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import {SignIn, SignUp,Home,Chat,Add,Profile} from "../screens/index"

import Icon from "react-native-vector-icons/Ionicons";


const Stack=createStackNavigator();

export function SignStack(){
    return(
        <Stack.Navigator 
            mode="modal"
            screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
            }}
        >
            <Stack.Screen name="SignIn" component={SignIn} options={{headerShown:null,}}/>
            <Stack.Screen name="SignUp" component={SignUp} options={{headerShown:null,}}/> 
        </Stack.Navigator>
    )
}

const Tab=createMaterialBottomTabNavigator();

export function HomeStack(){
    return(
        <Tab.Navigator shifting 
            tabBarOptions={{
                activeTintColor: 'black',
            }}
        >
            <Tab.Screen name="Home" component={Home} 
                options={{
                    tabBarLabel:"Home",
                    tabBarColor:"#f7f3e9",
                    tabBarIcon:() => (
                        <Icon name="home-outline" size={26} color="black"/>
                    ),
                }} 
            />
            <Tab.Screen name="Chat" component={Chat} 
                options={{
                    tabBarLabel:"Chat",
                    tabBarColor:"#f7f3e9",
                    tabBarIcon:() => (
                        <Icon name="chatbox" size={26} color="black"/>
                    ),
                }} 
               
            />
            <Tab.Screen name="Add" component={Add} 
                options={{
                    tabBarLabel:"Add",
                    tabBarColor:"#f7f3e9",
                    tabBarIcon:() => (
                        <Icon name="add" size={26} color="black"/>
                    ),
                }}
            />
            <Tab.Screen name="Profile" component={Profile} 
                options={{
                    tabBarLabel:"Profile",
                    tabBarColor:"#f7f3e9",
                    tabBarIcon:() => (
                        <Icon name="people" size={26} color="black"/>
                    ),
                }} 
            />
        </Tab.Navigator>
    )
}