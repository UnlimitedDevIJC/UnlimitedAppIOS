import { Platform, StyleSheet } from "react-native"

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    opacity: 0.65,
  },

  imageLogo: {
    width: 200,
    height: 200,
  },

  emailInput: {
    width: 300,
    height: 50,
    position: "absolute",
    top: "45%",
    alignSelf: "center",
    // backgroundColor: "blue",
    padding: 5,
    borderBottomColor: "black",
    borderBottomWidth: 1.5,
    fontSize: 22,
    textAlign: "left",
  },

  passwordInput: {
    width: 300,
    height: 50,
    position: "absolute",
    top: "54%",
    alignSelf: "center",
    // backgroundColor: "blue",
    padding: 5,
    borderBottomColor: "#174162",
    borderBottomWidth: 1.5,
    fontSize: 22,
    textAlign: "left",
  },

  recuperarPasswordView: {
    width: "100%",
    height: 35,
    position: "absolute",
    top: "62%",
  },

  recuperarPasswordButton: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },

  recuperarPasswordText: {
    fontSize: 18,
    fontWeight: "700",
    textDecorationLine: "underline",
    letterSpacing: 0.5,
    color: "#174162",
  },

  loginView: {
    width: "100%",
    height: 50,
    position: "absolute",
    top: "70%",
    // backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
  },

  loginButton: {
    width: "50%",
    height: "100%",
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#174162",
  },

  loginText: {
    fontSize: 22,
    fontWeight: "600",
    color: "white",
    textAlign: "center",
  },

  registarView: {
    width: "100%",
    height: 50,
    position: "absolute",
    top: "78%",
    // backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
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

  loginButtonDisable: {
    width: "50%",
    height: "100%",
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#174162",
    opacity: 0.75,
  },

  verPassBtn: {
    width: "10%",
    zIndex: 1,
    alignSelf: "center",
    top: '40%',
    left: '30%'
  },

  passwordView: {
    width: "80%",
    height: 50,
    marginTop: 10,
    alignSelf: "center",
    flexDirection: "row",
  },
})

export default styles
