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
  TextInput,
} from "react-native"
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
import { list, listAll } from "@firebase/storage"

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

const EscreverQrCode = ({ navigation }) => {
  const [codigo, setCodigo] = useState()
  const [utilizador, setUtilizador] = useState("null")
  const [evento, setEvento] = useState()
  const [utilizadorUtils, setUtilizadorUtils] = useState("null")
  const [user, setUser] = useState()

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

  function getPontos(code) {
    let aux = listaEventos.filter((item) => {
      return item.codigoEvento == code
    })
    return aux[0].pontosAtribuidos
  }

  function testarCodigo() {
    if (
      listaCodigos.includes(codigo) &&
      !utilizadorUtils.codigosEventos.includes(codigo)
    ) {
      let aux = (
        parseInt(utilizador.pontos) + parseInt(getPontos(codigo))
      ).toString()
      Alert.alert("Adicionado")
      utilizadorRef = doc(db, "Utilizador", user.email)
      updateDoc(utilizadorRef, {
        pontos: aux,
      })
      utilizadorUtilsRef = doc(db, "UtilizadorUtils", user.email)
      updateDoc(utilizadorUtilsRef, {
        codigosEventos: arrayUnion(codigo),
      })
    } else {
      Alert.alert("Já adicionaste!")
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView} bounces={false}>
        <View style={styles.headerContainer}>
          <View style={styles.headerRetangulo}></View>
          <View style={styles.headerLogoContainer}>
            <Image
              style={styles.headerLogo}
              source={require("../Login/unlimitedLogo.png")}
            />
          </View>
        </View>
        <View style={styles.codeContainer}>
          <View style={styles.codeInput}>
            <TextInput
              placeholderTextColor="#174162"
              placeholder="Colocar Código"
              autoCapitalize="none"
              type="text"
              onChangeText={(text) => setCodigo(text)}
              value={codigo}
              style={styles.input}
            ></TextInput>
          </View>
        </View>
        <View style={styles.btnBox}>
          <TouchableOpacity
            style={styles.btnSubmeter}
            onPress={() => testarCodigo()}
          >
            <Text style={styles.btnSubmeterText}>Submeter Código</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnSubmeter}
            onPress={() => {
              navigation.navigate("QrCode")
            }}
          >
            <Text style={styles.btnSubmeterText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default EscreverQrCode
