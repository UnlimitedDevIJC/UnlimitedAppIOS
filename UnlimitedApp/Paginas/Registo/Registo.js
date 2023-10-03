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
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth"
import { auth } from "../../Config/firebase"
import { firebase } from "../../Config/firebase"
import React, { useState, useEffect, useRef } from "react"
import styles from "./RegistoStyle"
import { FontAwesome5 } from "@expo/vector-icons"
import SelectDropdown from "react-native-select-dropdown"

const db = getFirestore()
const universidadeRef = collection(db, "Universidade")

let listaUniversidadesData = []
let listaUniversidades = new Set()

onSnapshot(universidadeRef, (snapshot) => {
  snapshot.docs.forEach((doc) => {
    listaUniversidadesData.push({ ...doc.data(), id: doc.id })
  })

  listaUniversidadesData.forEach((item) => {
    listaUniversidades.add(item.nome)
  })

  listaUniversidades = Array.from(listaUniversidades)
})

const Registo = ({ navigation }) => {
  const [nome, setNome] = useState("")
  const nomeRef = useRef(null)
  const [email, setEmail] = useState("")
  const emailRef = useRef(null)
  const [password, setPassword] = useState("")
  const passwordRef = useRef(null)
  const [checkPassword, setCheckPassword] = useState("")
  const checkPasswordRef = useRef(null)
  const [telemovel, setTelemovel] = useState("")
  const telemovelRef = useRef(null)
  const [universidade, setUniversidade] = useState("")
  const [anoEscolar, setAnoEscolar] = useState("")
  const [linkedIn, setLinkedIn] = useState("")
  const [curriculo, setCurriculo] = useState("")
  const [errorRegisterPassword, setErrorRegisterPassword] = useState(true)
  const [errorCodigo, setErrorCodigo] = useState()
  const [verPalavraPasse, setVerPalavraPasse] = useState(true)
  const [codigo, setCodigo] = useState("")
  const [paginaRegister, setPaginaRegister] = useState(1)

  //Variaveis
  let anos = ["1", "2", "3", "4", "5"]

  //Funções

  // Criar Utilizador - Chave primária "Email"
  function adicionarUtilizador() {
    const ref = collection(db, "Utilizador")
    let existe = false
    getDocs(ref)
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          if (doc.id == email) {
            existe = true
            Alert.alert("Esse email já foi utilizado!")
          }
        })
      })
      .then(() => {
        if (existe == false) {
          setDoc(doc(db, "Utilizador", email), {
            nome: nome,
            email: email,
            telemovel: telemovel,
            universidade: universidade,
            anoEscolar: anoEscolar,
            pontos: 0,
            linkedIn: linkedIn,
            curriculo: curriculo,
            codigoAcademia: codigo,
          })
        }
      })
  }

  function adicionarUtilizadorUtils() {
    const ref = collection(db, "UtilizadorUtils")
    let existe = false
    getDocs(ref)
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          if (doc.id == email) {
            existe = true
            Alert.alert("Esse email já foi utilizado!")
          }
        })
      })
      .then(() => {
        if (existe == false) {
          setDoc(doc(db, "UtilizadorUtils", email), {
            codigosEventos: [],
            notificacoes: [],
            notificacoesDelete: [],
          })
        }
      })
  }

  function hasMatchingRecord(list, universidade, codigo) {
    for (const faculdade of list) {
      if (universidade === faculdade.nome && codigo === faculdade.academiaCodigo) {
        console.log(faculdade)
        return true;
      }
    }
    return false;
  }
  
  function verificarCodigo() {
    if (hasMatchingRecord(listaUniversidadesData, universidade, codigo)) {
      setErrorCodigo(false)
      console.log(errorCodigo)
    } else {
      setErrorCodigo(true)
    }
  }

  // Regista na Firebase
  const handleSignUp = () => {
    verificarCodigo()
    if (errorRegisterPassword == false && errorCodigo == false) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
          const user = userCredentials.user
          // adicionarUtilizador()
          // adicionarUtilizadorUtils()
          navigation.navigate("Login")
          Alert.alert("Inicia sessão para entrares na tua conta")
        })
        .catch((error) => alert(error.message))
    }
  }

  function verificarCredenciais() {
    if (password.length < 6) {
      setErrorRegisterPassword(true)
      Alert.alert("A password não tem caracteres suficientes!")
      setPaginaRegister(1)
    } else if (checkPassword !== password) {
      setErrorRegisterPassword(true)
      Alert.alert("As palavra-passes não coincidem!")
      setPaginaRegister(1)
    } else if (telemovel.length < 9) {
      setErrorRegisterPassword(true)
      Alert.alert("O número de telemóvel não tem números suficientes!")
      setPaginaRegister(1)
    } else {
      setErrorRegisterPassword(false)
      setPaginaRegister(2)
    }
  }

  const focusNextInput = (nextInputRef) => {
    nextInputRef.current.focus()
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView} bounces={false}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss()
          }}
        >
          <>
            <View style={{ height: 130, backgroundColor: "#F2F3F5" }}>
              <View style={styles.retanguloFundo} />
              <View style={styles.logoView}>
                <Image
                  style={styles.logo}
                  source={require("../Login/unlimitedLogo.png")}
                />
              </View>
            </View>

            {paginaRegister == 1 ? (
              <View>
                {/* Registar */}
                <Text style={styles.registarTitulo}>Registar</Text>
                {/* Nome */}
                <View style={styles.nomeView}>
                  <FontAwesome5 style={styles.nomeIcon} name="user" />
                  <TextInput
                    style={styles.nomeInput}
                    placeholderTextColor="white"
                    returnKeyType="next"
                    onSubmitEditing={() => focusNextInput(emailRef)}
                    ref={nomeRef}
                    placeholder="Nome"
                    type="text"
                    onChangeText={(text) => setNome(text)}
                    value={nome}
                  ></TextInput>
                </View>

                {/* Email */}
                <View style={styles.emailView}>
                  <FontAwesome5 style={styles.emailIcon} name="envelope" />
                  <TextInput
                    style={styles.emailInput}
                    placeholderTextColor="white"
                    returnKeyType="next"
                    onSubmitEditing={() => focusNextInput(telemovelRef)}
                    ref={emailRef}
                    placeholder="Email"
                    autoCapitalize="none"
                    type="text"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                  ></TextInput>
                </View>

                {/* Numero Telemovel */}
                <View style={styles.telemovelView}>
                  <FontAwesome5 style={styles.telemovelIcon} name="mobile" />
                  <TextInput
                    style={styles.telemovelInput}
                    placeholderTextColor="white"
                    returnKeyType="next"
                    onSubmitEditing={() => focusNextInput(passwordRef)}
                    ref={telemovelRef}
                    placeholder="Número de Telemóvel"
                    type="text"
                    onChangeText={(text) => setTelemovel(text)}
                    value={telemovel}
                  ></TextInput>
                </View>

                {/* Password */}
                <View style={styles.passwordView}>
                  <FontAwesome5 style={styles.passwordIcon} name="lock" />
                  <TextInput
                    style={styles.passwordInput}
                    placeholderTextColor="white"
                    placeholder="Palavra-Passe"
                    type="text"
                    returnKeyType="next"
                    onSubmitEditing={() => focusNextInput(checkPasswordRef)}
                    ref={passwordRef}
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    secureTextEntry={verPalavraPasse}
                  ></TextInput>
                  <TouchableOpacity style={styles.verPassBtn}>
                    {verPalavraPasse ? (
                      <FontAwesome5
                        name="eye"
                        onPress={() => setVerPalavraPasse(false)}
                        color={"white"}
                        size={18}
                      />
                    ) : (
                      <FontAwesome5
                        name="eye-slash"
                        onPress={() => setVerPalavraPasse(true)}
                        color={"red"}
                        size={18}
                      />
                    )}
                  </TouchableOpacity>
                </View>

                {/* Confirmar Password */}
                <View style={styles.checkpassView}>
                  <FontAwesome5 style={styles.checkpassIcon} name="lock" />
                  <TextInput
                    style={styles.checkpassInput}
                    placeholderTextColor="white"
                    placeholder="Confirmar Palavra-Passe"
                    type="text"
                    returnKeyType="next"
                    ref={checkPasswordRef}
                    onChangeText={(text) => setCheckPassword(text)}
                    value={checkPassword}
                    secureTextEntry={verPalavraPasse}
                  ></TextInput>
                </View>

                {/* Instituicao de ensino */}
                <View style={styles.escolaView}>
                  <FontAwesome5 style={styles.escolaIcon} name="school" />
                  <SelectDropdown
                    dropdownStyle={{
                      width: "40%",
                      borderRadius: 5,
                    }}
                    buttonStyle={{
                      width: "85%",
                      height: "100%",
                      backgroundColor: "transparent",
                      textAlign: "left",
                    }}
                    defaultButtonText={"Universidade"}
                    buttonTextStyle={{
                      color: "white",
                      fontSize: 18,
                      textAlign: "left",
                      margin: 0,
                      padding: 0,
                      position: "absolute",
                      right: 0,
                    }}
                    data={listaUniversidades}
                    onSelect={(selectedItem, index) => {
                      setUniversidade(selectedItem)
                    }}
                  />
                </View>

                {/* Ano de Escolaridade */}
                <View style={styles.anoescolaView}>
                  <FontAwesome5
                    style={styles.anoescolaIcon}
                    name="graduation-cap"
                  />
                  <SelectDropdown
                    dropdownStyle={{
                      width: "40%",
                      borderRadius: 5,
                    }}
                    buttonStyle={{
                      width: "85%",
                      height: "100%",
                      backgroundColor: "transparent",
                      textAlign: "left",
                    }}
                    defaultButtonText={"Ano de escolaridade"}
                    buttonTextStyle={{
                      color: "white",
                      fontSize: 18,
                      textAlign: "left",
                      margin: 0,
                      padding: 0,
                      position: "absolute",
                      right: 0,
                    }}
                    data={anos}
                    onSelect={(selectedItem, index) => {
                      setAnoEscolar(selectedItem)
                    }}
                  />
                </View>

                {/* Registar */}
                {email === "" ||
                telemovel === "" ||
                nome === "" ||
                password === "" ||
                checkPassword === "" ||
                universidade === "" ||
                anoEscolar === "" ? (
                  <TouchableOpacity
                    disabled={true}
                    style={styles.registarBtnDisable}
                  >
                    <Text style={styles.registarText}>Continuar</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.registarBtn}
                    onPress={() => verificarCredenciais()}
                  >
                    <Text style={styles.registarText}>Continuar</Text>
                  </TouchableOpacity>
                )}
                {/* Retornar a login */}
                <TouchableOpacity
                  style={styles.returnLoginBtn}
                  onPress={() => navigation.navigate("Login")}
                >
                  <Text style={styles.returnLoginText}>
                    Já tens uma conta?{" "}
                    <Text style={{ color: "#16508D" }}>Inicia Sessão</Text>
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                <View
                  style={{
                    top: 75,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "#174162",
                      fontSize: 30,
                      fontWeight: "600",
                    }}
                  >
                    Já podes pedir o código!
                  </Text>
                </View>
                <View style={{ top: 200 }}>
                  <TextInput
                    placeholderTextColor="#174162"
                    placeholder="Colocar Código"
                    autoCapitalize="none"
                    type="text"
                    onChangeText={(codigo) => setCodigo(codigo)}
                    value={codigo}
                    style={styles.codigoInput}
                  ></TextInput>

                  {/* Butão para Registar novo utilizador */}
                  <View style={styles.registarView}>
                    <TouchableOpacity
                      style={styles.registarButton}
                      onPress={() => handleSignUp()}
                    >
                      <Text style={styles.registarText}>Entrar</Text>
                    </TouchableOpacity>
                  </View>
                  {/* Retornar a login */}
                  <TouchableOpacity
                    style={styles.returnLoginBtnCodigo}
                    onPress={() => navigation.navigate("Login")}
                  >
                    <Text style={styles.returnLoginText}>
                      Já tens uma conta?{" "}
                      <Text style={{ color: "#16508D" }}>Inicia Sessão</Text>
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Registo
