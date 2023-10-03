import { Platform, StyleSheet } from "react-native"

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#1A649F",
    flex: 1,
  },

  scrollView: {
    flex: 1,
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

  registarTitulo: {
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 10,
    color: "#16508D",
    fontSize: 50,
    fontWeight: "800",
    letterSpacing: 1,
  },

  nomeView: {
    width: "80%",
    height: 50,
    backgroundColor: "#174162",
    marginTop: 20,
    alignSelf: "center",
    flexDirection: "row",
  },

  nomeIcon: {
    color: "white",
    fontSize: 24,
    width: 50,
    paddingTop: 13,
    paddingLeft: 15,
  },

  nomeInput: {
    fontSize: 18,
    width: "100%",
    color: "white",
    marginLeft: 10,
  },

  emailView: {
    width: "80%",
    height: 50,
    backgroundColor: "#174162",
    marginTop: 10,
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
    marginLeft: 10,
  },

  telemovelView: {
    width: "80%",
    height: 50,
    backgroundColor: "#174162",
    marginTop: 10,
    alignSelf: "center",
    flexDirection: "row",
  },

  telemovelIcon: {
    color: "white",
    fontSize: 24,
    width: 50,
    paddingTop: 13,
    paddingLeft: 18,
  },

  telemovelInput: {
    fontSize: 18,
    width: "100%",
    color: "white",
    marginLeft: 10,
  },

  passwordView: {
    width: "80%",
    height: 50,
    backgroundColor: "#174162",
    marginTop: 10,
    alignSelf: "center",
    flexDirection: "row",
  },

  passwordIcon: {
    color: "white",
    fontSize: 24,
    width: 50,
    paddingTop: 12,
    paddingLeft: 15,
  },

  passwordInput: {
    fontSize: 18,
    width: "100%",
    color: "white",
    marginLeft: 10,
  },

  checkpassView: {
    width: "80%",
    height: 50,
    backgroundColor: "#174162",
    marginTop: 10,
    alignSelf: "center",
    flexDirection: "row",
  },

  checkpassIcon: {
    color: "white",
    fontSize: 24,
    width: 50,
    paddingTop: 12,
    paddingLeft: 15,
  },

  checkpassInput: {
    fontSize: 18,
    width: "100%",
    color: "white",
    marginLeft: 10,
  },

  anoescolaView: {
    width: "80%",
    height: 50,
    backgroundColor: "#174162",
    marginTop: 10,
    alignSelf: "center",
    flexDirection: "row",
  },

  anoescolaIcon: {
    color: "white",
    fontSize: 24,
    width: "15%",
    paddingTop: 13,
    paddingLeft: 12,
  },

  anoescolaInput: {
    fontSize: 18,
    width: "100%",
    color: "white",
  },

  escolaView: {
    width: "80%",
    height: 50,
    backgroundColor: "#174162",
    marginTop: 10,
    alignSelf: "center",
    flexDirection: "row",
  },

  escolaIcon: {
    color: "white",
    fontSize: 22,
    width: 50,
    paddingTop: 12,
    paddingLeft: 12,
  },

  escolaInput: {
    fontSize: 18,
    width: "100%",
    color: "white",
    marginLeft: 10,
  },

  registarBtn: {
    width: "50%",
    height: 50,
    backgroundColor: "#174162",
    marginTop: 40,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },

  registarText: {
    fontSize: 22,
    fontWeight: "400",
    color: "white",
    letterSpacing: 1,
  },

  returnLoginBtn: {
    marginTop: 30,
    marginBottom: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  returnLoginText: {
    fontSize: 22,
    fontWeight: "600",
  },

  dataView: {
    width: "60%",
    alignItems: "center",
    justifyContent: "center",
  },

  iconView: {
    justifyContent: "center",
    alignItems: "center",
    width: "15%",
  },

  icon: {
    color: "white",
    fontSize: 30,
    alignSelf: "center",
  },

  registarBtnDisable: {
    width: "50%",
    height: 50,
    backgroundColor: "#174162",
    marginTop: 40,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.75,
  },

  verPassBtn: {
    width: "10%",
    zIndex: 100,
    alignSelf: "center",
    position: "absolute",
    right: 0,
  },

  registarView: {
    width: "100%",
    height: 50,
    // backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },

  registarButton: {
    width: "50%",
    height: "100%",
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#174162",
  },

  registarText: {
    fontSize: 22,
    fontWeight: "600",
    color: "white",
    textAlign: "center",
  },

  codigoInput: {
    width: 300,
    height: 50,
    alignSelf: "center",
    padding: 5,
    borderBottomColor: "black",
    borderBottomWidth: 1.5,
    fontSize: 22,
    textAlign: "center",
  },

  returnLoginBtnCodigo: {
    marginTop: 60,
    marginBottom: 40,
    justifyContent: "center",
    alignItems: "center",
  },
})

export default styles
