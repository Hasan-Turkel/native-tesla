import { StyleSheet } from "react-native";


export default styles = StyleSheet.create({
  container: {
    padding: 10,
    gap:10,
    flex:1,
    backgroundColor:"white"
  },
  image:{
    width:200,
    height:100,
    alignSelf:"center"
  },
  title:{
    fontSize:20,
    fontWeight:"bold",
    textAlign:"center"
  },
  propertyContainer:{
    flexDirection: "row",
    gap:5,
    justifyContent:"space-around",
    marginTop:10
  },
  topModelContainer:{
    alignSelf:"center",
    width:300,
    marginTop:10
  },
  modelContainer:{
  flexDirection:"row",
  justifyContent:"space-between",
   marginVertical:10,
   borderWidth:3,
   padding:10,

  },
  addButton:{
    borderWidth:1,
    textAlign:"center",
    backgroundColor:"#0d6efd"
  }

});
