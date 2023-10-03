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

  editProfileBtn: {
    width: "15%",
    position: "absolute",
    top: 50,
    right: 15,
    alignSelf: "flex-end",
  },

  editProfileIcon: {
    fontSize: 35,
    color: "#174162",
  },

  perfilContainer: {
    width: "100%",
    height: "100%",
    marginTop: 30
  },

  perfilImageContainer: {
    height: "55%",
    width: "50%",
    alignSelf: "center",
    zIndex: 1,
  },

  perfilImage: {
    width: 150,
    height: 150,
    alignSelf: "center",
  },

  perfilDataContainer: {
    backgroundColor: "white",
    width: "80%",
    alignSelf: "center",
    position: "absolute",
    top: 130,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 20,
  },

  perfilNomeContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },

  perfilNome: {
    fontSize: 22,
    color: "black",
    fontWeight: "700",
    letterSpacing: 0.8,
    padding: 5,
    fontFamily:'Oswald-Regular'
  },

  perfilDetalhesContainer: {
    width: "100%",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    height: 40,
  },

  perfilDetalhes: {
    fontSize: 18,
    color: "black",
    fontWeight: "600",
    letterSpacing: 0.8,
    padding: 5,
    width: "80%",
    textAlign: "center",
    fontFamily:'Oswald-Regular'
  },

  perfilPontos: {
    fontSize: 24,
    color: "#174162",
    fontWeight: "700",
    letterSpacing: 0.8,
    padding: 5,
    fontFamily:'Oswald-Regular'
  },

  perfilLogout: {
    width: "80%",
    height: "15%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#174162",
    marginTop: "3%",
    alignSelf: "center",
    marginBottom: "15%",
  },

  logout: {
    fontSize: 20,
    fontWeight: 600,
    color: "white",
    fontFamily:'Oswald-Regular'
  },
})

export default styles
