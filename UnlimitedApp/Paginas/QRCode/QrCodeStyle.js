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

  headerContainer: {
    width: "100%",
    padding: 10,
    marginBottom: 20,
    height: 125,
  },

  headerRetangulo: {
    width: "120%",
    transform: [{ rotateZ: "-15deg" }],
    height: "120%",
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

  headerLogoContainer: {
    width: "100%",
    position: "absolute",
    top: "24%",
  },

  headerLogo: {
    width: 85,
    height: 85,
    alignSelf: "center",
  },

  container: {
    alignItems: "center",
    justifyContent: "center",
    height: "80%",
    width: "100%",
  },

  barCodeBox: {
    alignItems: "center",
    justifyContent: "center",
    height: 350,
    width: 350,
  },

  barCode: {
    height: "100%",
    width: "100%",
  },

  buttonsBox: {
    height: "100%",
    width: "100%",
  },

  textButtonLogin: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 18,
    alignSelf: "center",
  },

  buttonLogin: {
    width: "80%",
    height: "10%",
    justifyContent: "center",
    backgroundColor: "#174162",
    marginTop: "3%",
    alignSelf: "center",
  },

  codeContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    top: "10%",
  },

  codeInput: {
    width: "80%",
    height: "30%",
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "#16508D",
    borderBottomWidth: 2,
  },

  input: {
    fontSize: 24,
  },

  btnBox: {
    height: "40%",
    width: "100%",
    top: "50%",
    alignItems: "center",
    justifyContent: "center",
  },

  btnSubmeter: {
    width: "80%",
    height: "50%",
    justifyContent: "center",
    backgroundColor: "#174162",
    alignSelf: "center",
    marginTop: "5%",
  },

  btnSubmeterText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 20,
    alignSelf: "center",
  },

  goBackBtn: {
    position: "absolute",
    left: 30,
    top: 30,
    zIndex: 100,
  },

  goBackIcon: {
    color: "white",
    fontSize: 30,
  },
})

export default styles
