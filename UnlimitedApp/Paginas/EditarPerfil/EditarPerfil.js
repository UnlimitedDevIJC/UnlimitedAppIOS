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
  Linking,
  Modal,
} from "react-native"
import {
  getFirestore,
  collection,
  onSnapshot,
  updateDoc,
  deleteDoc,
  addDoc,
  deleteDocs,
  getDoc,
  doc,
  QuerySnapshot,
} from "firebase/firestore"
import { getAuth, onAuthStateChanged, deleteUser } from "firebase/auth"
import styles from "./EditarPerfilStyle"
import { FontAwesome5, FontAwesome } from "@expo/vector-icons"
import React, { useEffect, useState, useSyncExternalStore } from "react"
import * as ImagePicker from "expo-image-picker"
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage"
import * as DocumentPicker from "expo-document-picker"
import SelectDropdown from "react-native-select-dropdown"
import * as FileSystem from "expo-file-system"

let listaUniversidades = new Set()
let listaUniversidadesData = []
let anos = ["1", "2", "3", "4", "5"]
const db = getFirestore()
const universidadeRef = collection(db, "Universidade")

onSnapshot(universidadeRef, (snapshot) => {
  snapshot.docs.forEach((doc) => {
    listaUniversidadesData.push({ ...doc.data(), id: doc.id })
  })

  listaUniversidadesData.forEach((item) => {
    listaUniversidades.add(item.nome)
  })

  listaUniversidades = Array.from(listaUniversidades)
})

const EditarPerfil = ({ navigation }) => {
  const [utilizador, setUtilizador] = useState("null")
  const [user, setUser] = useState()
  const [image, setImage] = useState(null)
  const [image2, setImage2] = useState(null)
  const [uploading, setUploading] = useState(null)
  const [document, setDocument] = useState(null)
  const [isLogin, setIsLogin] = useState(false)
  const [isModalVisible, setModalVisible] = useState(false)

  const handleConfirm = () => {
    handleDelete()
    navigation.navigate("Login")
    Alert.alert("A tua conta foi eliminada")
  }

  const storage = getStorage()
  const storageRef = ref(storage, "imagens/" + utilizador.email)

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
              setIsLogin(true)
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

  const handleUpdate = async () => {
    utilizadorRef = doc(db, "Utilizador", user.email)
    updateDoc(utilizadorRef, {
      nome: utilizador.nome,
      email: utilizador.email,
      telemovel: utilizador.telemovel,
      universidade: utilizador.universidade,
      anoEscolar: utilizador.anoEscolar,
      curriculo: document,
      linkedIn: utilizador.linkedIn,
    }).then(() => {
      navigation.navigate("Perfil")
    })
    uploadImage()
    // uploadDocument()
  }

  const handleDelete = async () => {
    const auth = getAuth()
    const userToDelete = auth.currentUser

    try {
      user.delete()

      deleteUser(userToDelete).then(() => {
        utilizadorRef = doc(db, "Utilizador", user.email)
        deleteDoc(utilizadorRef)
      })

      navigation.navigate("Login")
    } catch (error) {
      console.error("Error deleting user and document:", error)
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    })

    if (!result.canceled) {
      const source = { uri: result.assets[0].uri }
      console.log(source)
      setImage(source)
    } else {
      console.log("Image selection canceled.")
    }
    console.log(storageRef)
  }

  const uploadImage = async () => {
    if (!image || !image.uri) {
      console.log("Image is null or has no URI.")
      return
    }

    setUploading(true)

    try {
      const response = await fetch(image.uri)
      const blob = await response.blob()
      var ref = uploadBytes(storageRef, blob).then((snapshot) => {})
      await ref

      setUploading(false)
      Alert.alert("Photo Uploaded!")
      setImage(null)
    } catch (e) {
      console.log("Error uploading image:", e)
      setUploading(false)
    }
  }

  const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        resolve(reader.result.split(",")[1])
      }
      reader.onerror = (error) => {
        reject(error)
      }
      reader.readAsDataURL(blob)
    })
  }

  const pickAndUploadFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({})

      if (result && !result.canceled) {
        const fileBlob = await fetch(result.uri).then((response) =>
          response.blob()
        )
        const base64Data = await blobToBase64(fileBlob)
        setDocument(base64Data)

        console.log("File uploaded successfully!")
      }
    } catch (error) {
      console.error("Error picking/uploading file:", error)
    }
  }

  async function getImage() {
    getDownloadURL(ref(storage, "imagens/" + utilizador.email))
      .then((url) => {
        setImage2(url)
        const xhr = new XMLHttpRequest()
        xhr.responseType = "blob"
        xhr.onload = (event) => {
          const blob = xhr.response
        }
        xhr.open("GET", url)
        xhr.send()

        const img = document.getElementById("myimg")
        img.setAttribute("src", url)
      })
      .catch((error) => {})
  }

  useEffect(() => {
    getImage()
  }, [isLogin])

  const ConfirmationModal = ({ isVisible, message, onCancel, onConfirm }) => {
    return (
      <Modal
        transparent={true}
        animationType="slide"
        visible={isVisible}
        onRequestClose={onCancel}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.messageText}>Queres eliminar a tua conta?</Text>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => {
                onConfirm()
                onCancel()
              }}
            >
              <Text style={styles.buttonText}>Sim</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
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
                style={{
                  width: "15%",
                  position: "absolute",
                  top: 50,
                  right: 15,
                  alignSelf: "flex-end",
                }}
                onPress={() => setModalVisible(true)}
              >
                <FontAwesome5
                  style={{
                    fontSize: 34,
                    color: "red",
                  }}
                  name="trash"
                />
                <ConfirmationModal
                  isVisible={isModalVisible}
                  onCancel={() => setModalVisible(false)}
                  onConfirm={handleConfirm}
                ></ConfirmationModal>
              </TouchableOpacity>
            </View>

            <View
              style={{
                width: "100%",
                flex: -10,
                zIndex: 20,
                marginTop: 20,
              }}
            >
              <TouchableOpacity style={styles.editFotoBtn} onPress={pickImage}>
                {image2 ? (
                  <Image source={{ uri: image2 }} style={styles.perfilImage} />
                ) : (
                  <Image
                    style={styles.perfilImage}
                    source={require("../Perfil/default.jpeg")}
                  />
                )}
                <FontAwesome5 name="pen" style={styles.editFotoIcon} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: "100%",
                flex: 1,
                alignItems: "center",
                marginBottom: 50,
              }}
            >
              <View
                style={{
                  width: "80%",
                  flex: 1,
                  backgroundColor: "#ffffff",
                  alignItems: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 6,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 20,
                  top: -20,
                }}
              >
                <TextInput
                  style={styles.perfilNomeContainer}
                  onChangeText={(text) =>
                    setUtilizador({ ...utilizador, nome: text })
                  }
                >
                  <Text style={styles.perfilNome}>
                    {utilizador ? utilizador.nome : ""}
                  </Text>
                </TextInput>
                <TextInput
                  style={styles.perfilDetalhesContainer}
                  onChangeText={(text) =>
                    setUtilizador({ ...utilizador, telemovel: text })
                  }
                >
                  <Text style={styles.perfilDetalhes}>
                    {utilizador ? utilizador.telemovel : ""}
                  </Text>
                </TextInput>
                <View style={styles.escolaView}>
                  <SelectDropdown
                    dropdownStyle={{
                      width: "50%",
                    }}
                    buttonStyle={{
                      width: "100%",
                      backgroundColor: "transparent",
                      textAlign: "center",
                    }}
                    defaultButtonText={
                      utilizador ? utilizador.universidade : "Universidade"
                    }
                    buttonTextStyle={{
                      fontSize: 18,
                      color: "black",
                      fontFamily: "Oswald-Regular",
                      textAlign: "center",
                    }}
                    data={listaUniversidades}
                    onSelect={(selectedItem, index) => {
                      setUtilizador({
                        ...utilizador,
                        universidade: selectedItem,
                      })
                    }}
                  />
                </View>
                <View style={styles.escolaView}>
                  <SelectDropdown
                    dropdownStyle={{
                      width: "50%",
                    }}
                    buttonStyle={{
                      width: "100%",
                      backgroundColor: "transparent",
                      textAlign: "center",
                    }}
                    defaultButtonText={
                      utilizador
                        ? utilizador.anoEscolar + "º Ano"
                        : "Ano Escolar"
                    }
                    buttonTextStyle={{
                      fontSize: 18,
                      color: "black",
                      fontFamily: "Oswald-Regular",
                      textAlign: "center",
                    }}
                    data={anos}
                    onSelect={(selectedItem, index) => {
                      setUtilizador({
                        ...utilizador,
                        anoEscolar: selectedItem,
                      })
                    }}
                  />
                </View>
                <TouchableOpacity
                  style={styles.perfilDetalhesContainer}
                  onPress={pickAndUploadFile}
                >
                  {utilizador.curriculo ? (
                    <Text style={styles.perfilDetalhes}>
                      CV - {utilizador.nome}
                    </Text>
                  ) : (
                    <Text style={styles.perfilDetalhes}>Inserir Currículo</Text>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL(
                      "https://www.adobe.com/pt/acrobat/online/compress-pdf.html"
                    )
                  }
                >
                  <Text style={{ marginTop: 10, fontSize: 12 }}>
                    Compacta o teu currículo Aqui!
                  </Text>
                </TouchableOpacity>
                <TextInput
                  style={styles.perfilDetalhesContainer}
                  onChangeText={(text) =>
                    setUtilizador({ ...utilizador, linkedIn: text })
                  }
                >
                  {utilizador.linkedIn ? (
                    <Text style={styles.perfilDetalhes}>
                      LinkedIn - {utilizador.nome}
                    </Text>
                  ) : (
                    <Text style={styles.perfilDetalhes}>Inserir LinkedIn</Text>
                  )}
                </TextInput>
                <TouchableOpacity
                  style={styles.guardarBtn}
                  onPress={() => handleUpdate()}
                >
                  <Text style={styles.guardarTexto}>Guardar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.perfilBtn}
                  onPress={() => navigation.navigate("Perfil")}
                >
                  <Text style={styles.guardarTexto}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  )
}

export default EditarPerfil
