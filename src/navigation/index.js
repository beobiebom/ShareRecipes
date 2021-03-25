import React from 'react'
import {createStackNavigator,CardStyleInterpolators} from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import {SignIn, SignUp} from "../screens/index"

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
        <Tab.Navigator>
            <Tab.Screen name="Home" component/>
        </Tab.Navigator>
    )
}