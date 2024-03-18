import { StyleSheet } from "react-native";


export default styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "grey",
    padding: 10,
    textAlignVertical: 'top'
  },
  text: {
    fontWeight: "bold",
  },
  container: {
    backgroundColor: "rgba(256, 256, 256, 0.9)",
    padding:10,
    borderRadius:10,
    gap:5,
    
  },
  option:{
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "grey",
    padding: 10,
    margin:5
  },
  topContainer:{
    flexDirection:"row",
    justifyContent:"space-between",
    borderBottomWidth:0.5,
    padding:5

  },
  update:{
    color:"#0d6efd",
    fontWeight:"bold",
    fontSize:20
  }
});
