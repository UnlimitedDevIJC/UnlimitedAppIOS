import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import LoginStack from "../Navigator/LoginStack"
import TabsStack from "../Navigator/TabsStack"

const Stack = createStackNavigator()

function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LoginStack"
        component={LoginStack}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="TabsStack"
        component={TabsStack}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  )
}
export default MainStack
