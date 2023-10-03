import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native"
import React, { useState, useEffect } from "react"
import styles from "./RecuperarPasswordStyle"
import { FontAwesome5 } from "@expo/vector-icons"
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth"
import { auth } from "../../Config/firebase"
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

const db = getFirestore()
const utilizadoresRef = collection(db, "Utilizador")
let listaUtilizadores = []
onSnapshot(utilizadoresRef, (snapshot) => {
  let mounted = true
  if (mounted) {
    listaUtilizadores = []
    snapshot.docs.forEach((doc) => {
      listaUtilizadores.push(doc.id)
    })
  }
  return () => (mounted = false)
})

const RecuperarPassword = ({ navigation }) => {
  //Constantes
  const [email, setEmail] = useState("")
  const [errorPedido, setErrorPedido] = useState(false)
  const [user, setUser] = useState()

  const enviarEmail = () => {
    let existe = false
    listaUtilizadores.forEach((item) => {
      if (item === email) {
        existe = true
        sendPasswordResetEmail(getAuth(), email)
        Alert.alert(
          "Email para redefinir a senha enviado! Verificar a caixa de entrada e o Spam"
        )
        return
      }
    })
    if (existe) setErrorPedido(false)
    else setErrorPedido(true)
  }

  useEffect(() => {
    const auth = getAuth()
    onAuthStateChanged(auth, (user1) => {
      if (user1) {
        const uid = user1.uid
        setUser(user1)
      } else {
      }
    })
  }, [])

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView} bounces={false}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss()
          }}
        >
          <>
            {/* Retangulo de fundo */}
            <View style={{ height: 130, backgroundColor: "#F2F3F5" }}>
              {/* Logo pequneo */}
              <View style={styles.retanguloFundo} />
              <View style={styles.logoView}>
                <Image
                  style={styles.logo}
                  source={require("../Login/unlimitedLogo.png")}
                />
              </View>
            </View>
            {/* Registar */}
            <View style={styles.tituloView}>
              <Text style={styles.alterarTitulo}>Alterar Palavra-Passe</Text>
            </View>
            {/* Email */}
            <View style={styles.emailView}>
              <FontAwesome5 style={styles.emailIcon} name="envelope" />
              <TextInput
                style={styles.emailInput}
                keyboardType="email-address"
                placeholderTextColor="white"
                placeholder="Colocar Email"
                autoCapitalize="none"
                type="text"
                onChangeText={(text) => setEmail(text)}
                value={email}
              ></TextInput>
            </View>
            {/* Registar */}
            <TouchableOpacity
              style={styles.enviarEmailBtn}
              onPress={() => enviarEmail()}
            >
              <Text style={styles.enviarEmailText}>Enviar Email</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.returnLoginBtn}
              onPress={() => navigation.navigate("Login")}
            >
              <FontAwesome5 style={styles.returnArrowLeft} name="arrow-left" />
              <Text style={styles.returnLoginText}>
                Voltar ao Iniciar Sessão
              </Text>
            </TouchableOpacity>
          </>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  )
}

export default RecuperarPassword
