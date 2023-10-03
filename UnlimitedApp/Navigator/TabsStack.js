import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Alert,
  ImageBackground,
} from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import * as React from "react"
import { FontAwesome5 } from "@expo/vector-icons"
import HomePageStack from "../Navigator/HomePageStack"
import GamificationStack from "../Navigator/GamificationStack"
import PerfilStack from "./PerfilStack"
import AgendaStack from "./AgendaStack"
import styles from "./TabsStackStyle"

const Tab = createBottomTabNavigator()

const TabsStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        showLabel: false,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "#333333",
          elevation: 0,
          height: 90,
        },
      }}
    >
      <Tab.Screen
        name="HomePageTab"
        component={HomePageStack}
        options={{
          headerShown: false,
          tabBarLabel: "HomePage",
          gestureEnabled: false,
          tabBarInactiveTintColor: "#82265B",
          tabBarActiveTintColor: "#82265B",
          tabBarShowLabel: false,
          headerTitleAlign: "center",
          title: "HomePage",

          tabBarIcon: ({ focused }) => (
            <View
              style={{
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
              }}
            >
              {focused === true ? (
                <View
                  style={{
                    backgroundColor: "white",
                    height: 80,
                    width:'70%',
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 1,
                  }}
                >
                  <FontAwesome5
                    name={focused ? "home" : "home"}
                    color={focused ? '#000000' : '#FFFFFF'}
                    size={focused ? 35 : 30}
                  />
                </View>
              ) : (
                <FontAwesome5
                    name={focused ? "home" : "home"}
                    color={focused ? "#000000" : "#FFFFFF"}
                    size={focused ? 35 : 30}
                  />
              )}
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="AgendaTab"
        component={AgendaStack}
        options={{
          headerShown: false,
          tabBarLabel: "Agenda",
          gestureEnabled: false,
          tabBarInactiveTintColor: "#82265B",
          tabBarActiveTintColor: "#82265B",
          tabBarShowLabel: false,
          headerTitleAlign: "center",
          title: "HomePage",

          tabBarIcon: ({ focused }) => (
            <View
              style={{
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
              }}
            >
              {focused === true ? (
                <View
                  style={{
                    backgroundColor: "white",
                    height: 80,
                    width:'70%',
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 1,
                  }}
                >
                  <FontAwesome5
                    name={focused ? "calendar" : "calendar"}
                    color={focused ? '#000000' : '#FFFFFF'}
                    size={focused ? 35 : 30}
                  />
                </View>
              ) : (
                <FontAwesome5
                    name={focused ? "calendar" : "calendar"}
                    color={focused ? "#000000" : "#FFFFFF"}
                    size={focused ? 35 : 30}
                  />
              )}
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="GamificationTab"
        component={GamificationStack}
        options={{
          headerShown: false,
          tabBarLabel: "Gamification",
          gestureEnabled: false,
          tabBarInactiveTintColor: "#82265B",
          tabBarActiveTintColor: "#82265B",
          tabBarShowLabel: false,
          headerTitleAlign: "center",
          title: "HomePage",

          tabBarIcon: ({ focused }) => (
            <View
              style={{
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
              }}
            >
              {focused === true ? (
                <View
                  style={{
                    backgroundColor: "white",
                    height: 80,
                    width:'70%',
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 1,
                  }}
                >
                  <FontAwesome5
                    name={focused ? "trophy" : "trophy"}
                    color={focused ? '#000000' : '#FFFFFF'}
                    size={focused ? 35 : 30}
                  />
                </View>
              ) : (
                <FontAwesome5
                    name={focused ? "trophy" : "trophy"}
                    color={focused ? "#000000" : "#FFFFFF"}
                    size={focused ? 35 : 30}
                  />
              )}
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="PerfilTab"
        component={PerfilStack}
        options={{
          headerShown: false,
          tabBarLabel: "Perfil",
          gestureEnabled: false,
          tabBarInactiveTintColor: "#82265B",
          tabBarActiveTintColor: "#82265B",
          tabBarShowLabel: false,
          headerTitleAlign: "center",
          title: "HomePage",

          tabBarIcon: ({ focused }) => (
            <View
              style={{
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
              }}
            >
              {focused === true ? (
                <View
                  style={{
                    backgroundColor: "white",
                    height: 80,
                    width:'70%',
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 1,
                  }}
                >
                  <FontAwesome5
                    name={focused ? "user" : "user"}
                    color={focused ? '#000000' : '#FFFFFF'}
                    size={focused ? 35 : 30}
                  />
                </View>
              ) : (
                <FontAwesome5
                    name={focused ? "user" : "user"}
                    color={focused ? "#000000" : "#FFFFFF"}
                    size={focused ? 35 : 30}
                  />
              )}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default TabsStack
