import { Platform, StyleSheet } from "react-native"

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#1A649F",
  },

  scrollView: {
    backgroundColor: "#F2F3F5",
    flexGrow: 1,
  },

  retanguloFundo: {
    width: "120%",
    transform: [{ rotateZ: "-15deg" }],
    height: "100%",
    left: "-10%",
    top: "-55%",
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
    top: "15%",
  },

  logo: {
    width: 85,
    height: 85,
    alignSelf: "center",
  },
  notificationContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 24,
    marginBottom: 16,
    marginLeft: 20,
    marginRight: 20,
    flexDirection: "row",
  },

  expandedContainer: {
    height: 150,
    maxHeight: 300,
  },

  // notificationTitle: {
  //   backgroundColor:'black',
  //   fontSize: 18,
  //   fontWeight: "bold",
  //   flex: 1,
  //   width: '80%'
  // },

  trashIcon: {
    color: "#FF0000",
    fontSize: 18,
  },

  container: {
    width: "100%",
    marginTop: 30,
  },

  deleteIconContainer: {
    marginLeft: "35%",
  },

  notificationTitle: {
    fontSize: 18,
    fontWeight: "bold",
    width: '60%',
  },

  notificationContent: {
    marginTop: 8,
    fontSize: 16,
    left: 20,
    top: 70,
    position: "absolute",
  },

  goBackBtn: {
    position: "absolute",
    left: 30,
    top: 30,
    zIndex: 100
  },

  goBackIcon: {
    color:'white',
    fontSize: 30
  }
})

export default styles
