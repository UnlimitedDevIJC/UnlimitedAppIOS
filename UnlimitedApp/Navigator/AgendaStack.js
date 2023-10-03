import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import Agenda from "../Paginas/Agenda/Agenda"
import DetalheEventos from "../Paginas/DetalheEventos/DetalheEventos"
import QrCode from "../Paginas/QRCode/QrCode"
import EscreverQrCode from "../Paginas/QRCode/EscreverQrCode"

const Stack = createStackNavigator()

function AgendaStack() {
  return (
    <Stack.Navigator initialRouteName="Agenda">
      <Stack.Screen
        name="Agenda"
        component={Agenda}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="DetalheEvento"
        component={DetalheEventos}
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

export default AgendaStack
