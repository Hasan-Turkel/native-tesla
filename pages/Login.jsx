import React from "react";
import {  StyleSheet, Text, View } from "react-native";
import LoginForm from "../components/auth/loginForm";

export const Login = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <LoginForm navigation = {navigation}/>
      <Text style={styles.text}>Don't you have an account? <Text style={styles.inlineText} onPress={()=>navigation.navigate("Register")}>Sign Up</Text></Text>
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
