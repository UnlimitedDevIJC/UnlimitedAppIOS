import { Platform, StyleSheet } from "react-native"

const styles = StyleSheet.create({
  eventoLogo: {
    width: "100%",
    height: "100%",
    // transform: [{ rotateZ: "-15deg" }],
    // position:'absolute',
    top: -140,
    zIndex: -1,
  },

  detalhesEvento: {
    width: "100%",
    height: "100%",
    backgroundColor: "black",
  },

  eventoTituloBox: {
    width: "100%",
  },

  eventoTitulo: {
    alignSelf: "center",
    color: "#174162",
    fontSize: 35,
    fontWeight: "600",
    padding: "3%",
    fontFamily:'Oswald-Regular'
  },

  descricaoEventoBox: {
    width: "100%",
    height: "55%",
  },

  descricao: {
    fontSize: 16,
    lineHeight: 25,
    padding: "2%",
    fontFamily:'Oswald-Regular'
  },

  descricaoEvento: {
    fontSize: 20,
    fontWeight: "700",
  },

  inscreverBotaoBox: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "20%",
    flexDirection: "row",
    top: 350,
    position:'absolute'
  },

  inscreverBotao: {
    width: "35%",
    height: "50%",
    backgroundColor: "#174162",
    padding: "2%",
    marginRight: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  inscreverText: {
    fontSize: 22,
    fontWeight: "600",
    color: "white",
    textAlign: "center",
    fontFamily:'Oswald-Regular'
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
