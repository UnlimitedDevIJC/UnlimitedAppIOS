import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import HomePage from "../Paginas/HomePage/HomePage"
import Notification from "../Paginas/Notificacoes/Notification"

const Stack = createStackNavigator()

function HomePageStack() {
  return (
    <Stack.Navigator initialRouteName="HomePage">
      <Stack.Screen
        name="HomePage"
        component={HomePage}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="Notificacoes"
        component={Notification}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  )
}

export default HomePageStack
