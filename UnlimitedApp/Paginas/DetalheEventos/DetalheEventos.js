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
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  deleteDocs,
  setDoc,
  doc,
  getDocs,
} from "firebase/firestore"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import React, { useState, useEffect } from "react"
import styles from "./DetalheEventosStyle"
import { FontAwesome5, FontAwesome } from "@expo/vector-icons"

const DetalheEventos = ({ route, navigation }) => {
  const db = getFirestore()
  const ref = collection(db, "EventoUtilizador")

  const [utilizador, setUtilizador] = useState("null")
  const [inscrito, setInscrito] = useState(false)
  const [imageCodigo, setImageCodigo] = useState()
  const [imageCodigoEvento, setImageCodigoEvento] = useState()

  const imageData = `${route.params.item.foto}`

  let utilizadorRef = null
  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      const auth = getAuth()
      onAuthStateChanged(auth, (user) => {
        if (user) {
          utilizadorRef = doc(db, "Utilizador", user.email)
          onSnapshot(utilizadorRef, { includeMetadataChanges: true }, (doc) => {
            if (doc.exists()) {
              setUtilizador(doc.data())
              setImageCodigo(route.params.item.foto)
            } else {
              console.log("No such document!")
            }
          })
        } else {
        }
      })
    }
    return () => {
      isMounted = false
    }
  }, [])

  let listaEventoUtilizador = []

  onSnapshot(ref, (snapshot) => {
    let mounted = true
    if (mounted) {
      listaEventoUtilizador = []
      snapshot.docs.forEach((doc) => {
        listaEventoUtilizador.push({ ...doc.data(), id: doc.id })
      })

      for (let i = 0; i < listaEventoUtilizador.length; i++) {
        if (
          listaEventoUtilizador[i].idEvento == route.params.item.id &&
          listaEventoUtilizador[i].utilizador == utilizador.email
        ) {
          setInscrito(true)
        }
      }
    }
    return () => (mounted = false)
  })

  function inscrever() {
    getDocs(ref).then(() => {
      if (inscrito == false) {
        setDoc(doc(db, "EventoUtilizador", route.params.item.id), {
          idEvento: route.params.item.id,
          utilizador: utilizador.email,
        })
      }
    })

    if (inscrito == true) {
      Alert.alert("Já estás inscrito para este evento! Esperamos-te lá!")
    } else {
      Alert.alert("Estás inscrito! Esperamos-te lá!")
    }

    navigation.navigate("Agenda")
  }
  
  const goBack = () => {
    navigation.goBack()
  }

  return (
    <SafeAreaView style={{ backgroundColor: "#1A649F", flex: 1 }}>
      <ScrollView
        style={{ flex: 1, marginBottom: 45, backgroundColor: "#F2F3F5" }}
        bounces={false}
      >
        <View
          style={{
            width: "100%",
            padding: 10,
            marginBottom: 20,
            height: 125,
          }}
        >
          <View
            style={{
              width: "120%",
              transform: [{ rotateZ: "-15deg" }],
              height: "120%",
              left: "-10%",
              top: "-70%",
              backgroundColor: "#1A649F",
              shadowColor: "#000",
              shadowOffset: {
                width: 5,
                height: 8,
              },
              shadowOpacity: 0.35,
              shadowRadius: 3.84,
              elevation: 40,
            }}
          ></View>
          <TouchableOpacity style={styles.goBackBtn} onPress={goBack}>
            <FontAwesome5 name="arrow-left" style={styles.goBackIcon} />
          </TouchableOpacity>
          <View
            style={{
              width: "100%",
              position: "absolute",
              top: "24%",
            }}
          >
            <Image
              style={{
                width: 85,
                height: 85,
                alignSelf: "center",
              }}
              source={require("../Login/unlimitedLogo.png")}
            />
          </View>
        </View>
        <View style={styles.eventoLogo}>
          <Image
            style={{ height: 300, width: "100%" }}
            source={{ uri: `data:image/png;base64,${imageData}` }}
          />
        </View>

        <View
          style={{
            height: "80%",
            width: "100%",
            top: "-80%",
          }}
        >
          <View style={styles.eventoTituloBox}>
            <Text style={styles.eventoTitulo}>{route.params.item.tema}</Text>
          </View>
          <View style={styles.descricaoEventoBox}>
            <Text style={styles.descricao}>
              <Text style={{ fontWeight: 600 }}>Descrição: </Text>
              {route.params.item.descricao}
            </Text>
            <Text style={styles.descricao}>
              <Text style={{ fontWeight: 600 }}>Data: </Text>
              {route.params.item.data}
            </Text>
            <Text style={styles.descricao}>
              <Text style={{ fontWeight: 600 }}>Local: </Text>
              {route.params.item.local}
            </Text>
            <Text style={styles.descricao}>
              <Text style={{ fontWeight: 600 }}>Hora inicio: </Text>
              {route.params.item.horaInicio}
            </Text>
            <Text style={styles.descricao}>
              <Text style={{ fontWeight: 600 }}>Hora final: </Text>
              {route.params.item.horaFim}
            </Text>
          </View>
          <View style={styles.inscreverBotaoBox}>
            <TouchableOpacity
              onPress={() => inscrever()}
              style={styles.inscreverBotao}
            >
              <Text style={styles.inscreverText}>Inscrever</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("QrCode")}>
              <FontAwesome5
                style={{ fontSize: 50, color: "#174162" }}
                name="qrcode"
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default DetalheEventos
