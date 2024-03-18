import React from "react";
import {  StyleSheet, Text, View } from "react-native";
import RegisterForm from "../components/auth/registerForm";

export const Register = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <RegisterForm navigation = {navigation}/>
      <Text style={styles.text}>Do you have an account? <Text style={styles.inlineText} onPress={()=>navigation.navigate("Login")}>Sign In</Text></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
  text:{
    alignSelf:"center",
    margin:10,
    fontSize:20
  },
  inlineText:{
    color:"red"
  }
});
