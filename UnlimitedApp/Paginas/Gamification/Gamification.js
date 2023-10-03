import {
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native"
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  deleteDocs,
  getDoc,
  doc,
  QuerySnapshot,
} from "firebase/firestore"
import React, { useState, useEffect } from "react"
import styles from "./GamificationStyle"
import { FontAwesome5, FontAwesome } from "@expo/vector-icons"
import QrCode from "../QRCode/QrCode"

const db = getFirestore()
const gamificationRef = collection(db, "Gamification")

let gamification = []

onSnapshot(gamificationRef, (snapshot) => {
  let existe = true
  if (existe) {
    snapshot.docs.forEach((doc) => {
      gamification.push({ ...doc.data(), id: doc.id })
    })
  }
  return () => (existe = false)
})

const Gamification = ({ navigation }) => {
  const [imageGamifictaion, setImageGamification] = useState()

  const image = `${imageGamifictaion}`

  useEffect(() => {
    for (let i = 0; i < gamification.length; i++) {
      setImageGamification(gamification[i].fotoGamification)
    }
  })

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView} bounces={false}>
        <View style={{ width: "100%", height: 130 }}>
          <View style={{ width: "100%", height: "100%" }}>
            <View style={styles.retanguloFundo} />
            <View style={styles.logoView}>
              <Image
                style={styles.logo}
                source={require("../Login/unlimitedLogo.png")}
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.notificationBtn}
            onPress={() => navigation.navigate("QrCode")}
          >
            <FontAwesome5 style={styles.notificationIcon} name="qrcode" />
          </TouchableOpacity>
          <View style={{ width: "100%", height: "100%", top: "-15%" }}>
            <View style={styles.titleView}>
              <Text style={styles.titleText}>
                Já conheces os nossos prémios?
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{ height: 550, width: 430, top: 100 }}
        >
          <Image
              style={{
                width: "100%",
                height: "100%",
              }}
              source={{ uri: `data:image/png;base64,${image}` }}
            />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Gamification
