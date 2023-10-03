import React, { useState, useEffect } from "react"
import {
  Text,
  View,
  StyleSheet,
  Button,
  FlatList,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native"
// import { BarCodeScanner } from "expo-barcode-scanner"
import {
  doc,
  getDoc,
  arrayUnion,
  updateDoc,
  collection,
  getFirestore,
  onSnapshot,
  addDoc,
} from "firebase/firestore"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import styles from "./QrCodeStyle"
import { BarCodeScanner } from "expo-barcode-scanner"
import { FontAwesome5, FontAwesome } from "@expo/vector-icons"

let listaEventos = []
let listaCodigos = []

const db = getFirestore()
const colRef = collection(db, "Evento")

onSnapshot(colRef, (snapshot) => {
  let mounted = true
  if (mounted) {
    listaEventos = []
    listaCodigos = []
    snapshot.docs.forEach((doc) => {
      listaEventos.push({ ...doc.data(), id: doc.id })
      listaCodigos.push(doc.data().codigoEvento)
    })
  }
  return () => (mounted = false)
})

const QrCode = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null)
  const [scanned, setScanned] = useState(false)
  const [text, setText] = useState("Not yet scanned")
  const [utilizador, setUtilizador] = useState(null)
  const [codigo, setCodigo] = useState("")
  const [user, setUser] = useState()
  const [utilizadorUtils, setUtilizadorUtils] = useState("null")

  const askForCameraPermission = () => {
    ;(async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status === "granted")
    })()
  }

  let utilizadorRef = null
  let utilizadorUtilsRef = null
  useEffect(() => {
    //verificar se tem login feito
    let isMounted = true
    if (isMounted) {
      const auth = getAuth()
      onAuthStateChanged(auth, (user1) => {
        if (user1) {
          utilizadorRef = doc(db, "Utilizador", user1.email)
          utilizadorUtilsRef = doc(db, "UtilizadorUtils", user1.email)
          setUser(user1)
          onSnapshot(utilizadorRef, { includeMetadataChanges: true }, (doc) => {
            if (doc.exists()) {
              setUtilizador(doc.data())
            } else {
            }
          })
          onSnapshot(
            utilizadorUtilsRef,
            { includeMetadataChanges: true },
            (doc) => {
              if (doc.exists()) {
                setUtilizadorUtils(doc.data())
              } else {
              }
            }
          )
        } else {
        }
      })
    }
    return () => {
      isMounted = false
    }
  }, [])

  function testarCodigo() {
    if (
      listaCodigos.includes(codigo) &&
      !utilizadorUtils.codigosEventos.includes(codigo)
    ) {
      let aux = (
        parseInt(utilizador.pontos) + parseInt(getPontos(codigo))
      ).toString()
      console.log(aux)
      Alert.alert("Adicionado")
      utilizadorRef = doc(db, "Utilizador", user.email)
      updateDoc(utilizadorRef, {
        pontos: aux,
      })
      console.log(utilizador.pontos)
      utilizadorUtilsRef = doc(db, "UtilizadorUtils", user.email)
      updateDoc(utilizadorUtilsRef, {
        codigosEventos: arrayUnion(codigo),
      })
    } else {
      Alert.alert("Já adicionaste!")
    }
  }

  function getPontos(code) {
    let aux = listaEventos.filter((item) => {
      return item.codigoEvento == code
    })
    return aux[0].pontosAtribuidos
  }

  useEffect(() => {
    askForCameraPermission()
  }, [])

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true)
    setText(data)
    setCodigo(data)
    console.log("Type: " + type + "\nData: " + data)
  }

  // Check permissions and return the screens
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>
    )
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button
          title={"Allow Camera"}
          onPress={() => askForCameraPermission()}
        />
      </View>
    )
  }

  const goBack = () => {
    navigation.goBack()
  }


  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView} bounces={false}>
        <View style={styles.headerContainer}>
          <View style={styles.headerRetangulo}></View>
          <TouchableOpacity style={styles.goBackBtn} onPress={goBack}>
            <FontAwesome5 name="arrow-left" style={styles.goBackIcon} />
          </TouchableOpacity>
          <View style={styles.headerLogoContainer}>
            <Image
              style={styles.headerLogo}
              source={require("../Login/unlimitedLogo.png")}
            />
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.barCodeBox}>
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={styles.barCode}
            />
          </View>
        </View>
        <View style={styles.buttonsBox}>
          <TouchableOpacity
            style={styles.buttonLogin}
            onPress={() => {
              setScanned(false)
              testarCodigo()
            }}
          >
            <Text style={styles.textButtonLogin}> Ler QR Code </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonLogin}
            onPress={() => {
              navigation.navigate("EscreverQrCode")
            }}
          >
            <Text style={styles.textButtonLogin}> Escrever Código </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default QrCode
