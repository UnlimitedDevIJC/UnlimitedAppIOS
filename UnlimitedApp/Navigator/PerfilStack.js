import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import Perfil from "../Paginas/Perfil/Perfil"
import EditarPerfil from "../Paginas/EditarPerfil/EditarPerfil"

const Stack = createStackNavigator()

function PerfilStack() {
  return (
    <Stack.Navigator initialRouteName="Perfil">
      <Stack.Screen
        name="Perfil"
        component={Perfil}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />

      <Stack.Screen
        name="EditarPerfil"
        component={EditarPerfil}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  )
}

export default PerfilStack
