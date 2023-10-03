import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import Gamification from "../Paginas/Gamification/Gamification"
import QrCode from "../Paginas/QRCode/QrCode"
import EscreverQrCode from "../Paginas/QRCode/EscreverQrCode"

const Stack = createStackNavigator()

function GamificationStack() {
  return (
    <Stack.Navigator initialRouteName="Gamification">
      <Stack.Screen
        name="Gamification"
        component={Gamification}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />

      <Stack.Screen
        name="QrCode"
        component={QrCode}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />

      <Stack.Screen
        name="EscreverQrCode"
        component={EscreverQrCode}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  )
}

export default GamificationStack
