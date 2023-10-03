import MainStack from "./Navigator/MainStack"
import { NavigationContainer } from "@react-navigation/native"
import * as Font from "expo-font"
import { useEffect } from "react"

export default function App() {
  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        "Oswald-Regular": require("../UnlimitedApp/assets/fonts/Oswald-Regular.ttf"),
      })
    }
    loadFont()
  }, [])

  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  )
}
