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

  tituloView: {
    width: "100%",
    alignSelf: "center",
    justifyContent: "center",
  },

  alterarTitulo: {
    textAlign: "center",
    marginTop: 25,
    color: "#16508D",
    fontSize: 28,
    fontWeight: "700",
    letterSpacing: 0.5,
  },

  emailView: {
    width: "80%",
    height: 50,
    backgroundColor: "#174162",
    marginTop: 120,
    alignSelf: "center",
    flexDirection: "row",
  },

  emailIcon: {
    color: "white",
    fontSize: 24,
    width: 50,
    paddingTop: 14,
    paddingLeft: 14,
  },

  emailInput: {
    fontSize: 18,
    width: "100%",
    color: "white",
  },

  enviarEmailBtn: {
    width: "50%",
    height: 50,
    backgroundColor: "#174162",
    marginTop: 70,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },

  enviarEmailText: {
    fontSize: 20,
    fontWeight: "400",
    color: "white",
    letterSpacing: 1,
  },

  returnLoginBtn: {
    marginTop: 160,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  returnLoginText: {
    fontSize: 22,
    fontWeight: "600",
    color: "#16508D",
  },

  returnArrowLeft: {
    color: "#174162",
    fontSize: 24,
    width: 50,
    paddingLeft: 14,
  },
})

export default styles
