import { View, Text } from "react-native"
import React from "react"
import Login from "../Paginas/Login/Login"
import { createStackNavigator } from "@react-navigation/stack"
import Registo from "../Paginas/Registo/Registo"
import RecuperarPassword from "../Paginas/RecuperarPassword/RecuperarPassword"
import HomePage from "../Paginas/HomePage/HomePage"

const Stack = createStackNavigator()

function LoginStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="Registo"
        component={Registo}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="RecuperarPassword"
        component={RecuperarPassword}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  )
}

export default LoginStack
