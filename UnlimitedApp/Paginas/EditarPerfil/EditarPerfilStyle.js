import { Platform, StyleSheet } from "react-native"

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#1A649F",
    flex: 1,
  },

  scrollView: {
    flex: 1,
    marginBottom: 45,
    backgroundColor: "#F2F3F5",
  },

  retanguloFundo: {
    width: "120%",
    transform: [{ rotateZ: "-15deg" }],
    height: "118%",
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
  },

  logoView: {
    width: "100%",
    position: "absolute",
    top: "17%",
  },

  logo: {
    width: 85,
    height: 85,
    alignSelf: "center",
  },

  editFotoBtn: {
    height: 150,
    width: 150,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.5,
    top: 20,
  },

  editFotoIcon: {
    top: -90,
    fontSize: 45,
    color: "white",
  },

  perfilContainer: {
    width: "100%",
    marginTop: 30,
  },

  perfilDataContainer: {
    backgroundColor: "white",
    width: "80%",
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
  },

  perfilNome: {
    fontSize: 20,
    color: "black",
    fontFamily: "Oswald-Regular",
  },

  perfilDetalhesContainer: {
    width: "80%",
    flex: 1,
    textAlign: "center",
    backgroundColor: "lightgrey",
    borderWidth: 1,
    padding: 7,
    borderColor: "#B9B6B6",
    marginTop: 20,
  },

  perfilNomeContainer: {
    width: "80%",
    flex: 1,
    textAlign: "center",
    backgroundColor: "lightgrey",
    borderWidth: 1,
    padding: 7,
    borderColor: "#B9B6B6",
    marginTop: 40,
  },

  perfilDetalhes: {
    alignSelf: "center",
    fontSize: 18,
    color: "black",
    fontFamily: "Oswald-Regular",
  },

  perfilBtn: {
    width: "80%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    padding: 5,
    marginBottom: 15,
    backgroundColor: "#174162",
    fontFamily: "Oswald-Regular",
  },

  guardarBtn: {
    width: "80%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    padding: 5,
    backgroundColor: "#174162",
    fontFamily: "Oswald-Regular",
  },

  guardarTexto: {
    fontSize: 22,
    color: "white",
    fontWeight: "600",
    letterSpacing: 1,
    fontFamily: "Oswald-Regular",
  },

  escolaView: {
    width: "80%",
    flex: 1,
    backgroundColor: "lightgrey",
    marginTop: 20,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#B9B6B6",
    textAlign: "center",
  },

  perfilImage: {
    width: 150,
    height: 150,
    alignSelf: "center",
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  messageText: {
    fontSize: 18,
    marginBottom: 20,
  },
  confirmButton: {
    backgroundColor: "green",
    padding: 10,
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: "red",
    padding: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
})

export default styles
