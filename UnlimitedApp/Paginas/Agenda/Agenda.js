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
  FlatList,
  Alert,
  ImageBackground,
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
import { getAuth, onAuthStateChanged } from "firebase/auth"
import styles from "./AgendaStyle"
import { FontAwesome5, FontAwesome } from "@expo/vector-icons"
import React, { useState, useEffect } from "react"
import SelectDropdown from "react-native-select-dropdown"

const db = getFirestore()
const colRef = collection(db, "Evento")
const academiaRef = collection(db, "Academia")
const palavraChaveRef = collection(db, "PalavrasChave")

let listaEventos = []
let listaEventosFiltradaPrimeira = []
let filtros = new Set()

let listaAcademia = []

let listaPalavrasChave = []

onSnapshot(academiaRef, (snapshot) => {
  let existe = true
  if (existe) {
    snapshot.docs.forEach((doc) => {
      listaAcademia.push({ ...doc.data(), id: doc.id })
    })
  }
  return () => (existe = false)
})

onSnapshot(palavraChaveRef, (snapshot) => {
  let existe = true
  if (existe) {
    snapshot.docs.forEach((doc) => {
      listaPalavrasChave.push({ ...doc.data(), id: doc.id })
    })
  }
  return () => (existe = false)
})

onSnapshot(colRef, (snapshot) => {
  let mounted = true
  if (mounted) {
    listaEventos = []
    snapshot.docs.forEach((doc) => {
      listaEventos.push({ ...doc.data(), id: doc.id })
    })
    filtros = [...new Set(listaPalavrasChave.map((item) => item.palavraChave))]
    filtros.unshift("Todos")
  }
  return () => (mounted = false)
})

const Agenda = ({ navigation }) => {
  const [filtro, setFiltro] = useState("")
  const [utilizador, setUtilizador] = useState("null")
  const [academia, setAcademia] = useState("")
  const [value, setValue] = useState("")
  const [user, setUser] = useState()
  const [listaEventosFiltrada, setListaEventosFiltrada] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  let utilizadorRef = null
  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      const auth = getAuth()
      onAuthStateChanged(auth, (user1) => {
        if (user1) {
          utilizadorRef = doc(db, "Utilizador", user1.email)
          setUser(user1)
          onSnapshot(utilizadorRef, { includeMetadataChanges: true }, (doc) => {
            if (doc.exists()) {
              setUtilizador(doc.data())
              setIsLoggedIn(true)
            } else {
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

  function compararData(evento) {
    const currentDay = new Date().getDate()
    const currentMonth = new Date().getMonth() + 1
    const currentYear = new Date().getFullYear()

    const currentDate = new Date(
      currentYear + "-" + currentMonth + "-" + currentDay
    )

    const eventoData = new Date(evento.data)

    if (eventoData.getTime() > currentDate.getTime()) {
      return true
    } else if (eventoData.getTime() === currentDate.getTime()) {
      return true
    } else {
      return false
    }
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(colRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data())
      const filteredEvents = data.filter((item) => {
        return (
          parseInt(item.pontosVisiveis) <= parseInt(utilizador.pontos) &&
          item.academiaCodigo === utilizador.codigoAcademia &&
          item.anoEscolar <= utilizador.anoEscolar &&
          compararData(item) &&
          item.visivel === "true" &&
          item.universidade === utilizador.universidade
        )
      })
      setListaEventosFiltrada(filteredEvents)
    })

    return () => unsubscribe()
  }, [isLoggedIn])

  function _renderItem(item) {
    return (
      <ItemLista
        item={item.item}
        utilizador={utilizador}
        navigation={navigation}
      />
    )
  }

  function alterarAcademias() {
    for (let i = 0; i < listaAcademia.length; i++) {
      if (listaAcademia[i].codigo == utilizador.codigoAcademia) {
        setAcademia(listaAcademia[i])
      }
    }
  }

  function alterarFiltro(item) {
    alterarAcademias()
    setValue(item)

    if (isLoggedIn && item == "Todos") {
      const filteredList = listaEventos.filter((evento) => {
        return (
          parseInt(item.pontosVisiveis) <= parseInt(utilizador.pontos) &&
          evento.academiaCodigo == utilizador.codigoAcademia &&
          evento.academiaCodigo == academia.codigo &&
          evento.anoEscolar <= utilizador.anoEscolar &&
          compararData(evento) &&
          evento.visivel === "true" &&
          evento.universidade == utilizador.universidade
        )
      })
      setListaEventosFiltrada(filteredList)
    } else {
      const filteredList = listaEventos.filter((evento) => {
        for (let i = 0; i < listaPalavrasChave.length; i++) {
          if (listaPalavrasChave[i].idEvento == evento.id) {
            return (
              parseInt(item.pontosVisiveis) <= parseInt(utilizador.pontos) &&
              evento.academiaCodigo == utilizador.codigoAcademia &&
              evento.academiaCodigo == academia.codigo &&
              listaPalavrasChave[i].palavraChave == item &&
              evento.anoEscolar <= utilizador.anoEscolar &&
              compararData(evento) &&
              evento.visivel === "true" &&
              evento.universidade == utilizador.universidade
            )
          }
        }
      })
      setListaEventosFiltrada(filteredList)
    }
  }

  function alterarFiltroManual(text) {
    setFiltro(text)

    if (text == "") {
      const filteredList = listaEventos.filter((item) => {
        return (
          parseInt(item.pontosVisiveis) <= parseInt(utilizador.pontos) &&
          item.anoEscolar <= utilizador.anoEscolar &&
          item.academiaCodigo == utilizador.codigoAcademia &&
          compararData(item) &&
          item.visivel === "true" &&
          item.universidade == utilizador.universidade
        )
      })
      setListaEventosFiltrada(filteredList)
    } else {
      const filteredList = listaEventos.filter((item) => {
        return (
          parseInt(item.pontosVisiveis) <= parseInt(utilizador.pontos) &&
          String(item.tema.toLowerCase()).includes(text.toLowerCase()) &&
          item.anoEscolar <= utilizador.anoEscolar &&
          item.academiaCodigo == utilizador.codigoAcademia &&
          compararData(item) &&
          item.visivel === "true" &&
          item.universidade == utilizador.universidade
        )
      })
      setListaEventosFiltrada(filteredList)
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
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

          {/* Barra de Pesquisa e filtro / palavras-chave*/}
          <View style={styles.searchView}>
            <TextInput
              placeholder="Pesquisa..."
              type="text"
              onChangeText={(text) => alterarFiltroManual(text)}
              value={filtro}
              style={styles.searchInput}
            />
            <SelectDropdown
              data={filtros}
              onSelect={(selectedItem, index) => {
                alterarFiltro(selectedItem)
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem
              }}
              rowTextForSelection={(item, index) => {
                return item
              }}
              renderDropdownIcon={(isOpened) => {
                return (
                  <FontAwesome5
                    name={"filter"}
                    color={"#444"}
                    style={styles.filterIcon}
                  />
                )
              }}
              defaultValue={"Todos"}
              defaultButtonText="Todos"
              dropdownIconPosition="left"
              rowTextStyle={{ fontWeight: "600" }}
              buttonStyle={{
                width: "20%",
                height: 40,
                backgroundColor: "transparent",
              }}
              dropdownStyle={{
                width: "40%",
                position: "absolute",
                left: "55%",
                borderRadius: 5,
              }}
            />
          </View>
          <FlatList
            data={listaEventosFiltrada}
            initialNumToRender={3}
            renderItem={(item) => _renderItem(item)}
            keyExtractor={(item) => {
              return item.id
            }}
          />
          <View style={{ zIndex: -1, height: 50, marginTop: 10 }}></View>
        </>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}

class ItemLista extends React.PureComponent {
  render() {
    return (
      <>
        <TouchableOpacity
          style={{ zIndex: 0 }}
          onPress={() =>
            this.props.navigation.navigate("DetalheEvento", {
              item: this.props.item,
            })
          }
        >
          <View style={styles.cardView}>
            <View style={styles.cardInfo}>
              <Text style={styles.cardNome}>{this.props.item.tema}</Text>
              <Text style={styles.cardData}>Data: {this.props.item.data}</Text>
              <Text style={styles.cardData}>
                Horário: {this.props.item.horaInicio} - {this.props.item.horaFim}
              </Text>
            </View>
            <View style={styles.cardIconContainer}>
              <FontAwesome5 name={"plus-square"} style={styles.cardIcon} />
            </View>
          </View>
        </TouchableOpacity>
      </>
    )
  }
}

export default Agenda
