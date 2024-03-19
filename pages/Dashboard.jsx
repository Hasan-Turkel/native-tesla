import { useCallback } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import useTeslaCalls from "../hooks/useTeslaCalls";
import Card from "../components/blog/card";
import { useAtomValue } from 'jotai'
import { useFocusEffect } from "@react-navigation/native";
import {username} from "../store/store"


export const Dashboard = ({ navigation }) => {
  const currentuser = useAtomValue(username)

  const { loading, err, data: cars, getCars } = useTeslaCalls();
  renderItem = ({ item }) => <Card car={item} navigation={navigation} />;

  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      getCars();
    }, [])
  );

  // console.log(blogs);
  return (
    <View style={styles.container}>
      <FlatList style={styles.list} data={cars} renderItem={renderItem} />
      {!currentuser && (
        <Button
          title="Sign In"
          color="black"
          onPress={() => navigation.navigate("Login")}
        />
        
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  list: {
    flex: 1,
  },
});
