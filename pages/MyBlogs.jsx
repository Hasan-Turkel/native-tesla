import { useCallback } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import useTeslaCalls from "../hooks/useTeslaCalls";
import Card from "../components/blog/card";
import { useFocusEffect } from "@react-navigation/native";

export const MyBlogs = ({ navigation }) => {
  const { loading, err, data: blogs, getMyBlogs } = useTeslaCalls();
  renderItem = ({ item }) => <Card blog={item} navigation={navigation} />;

  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      getMyBlogs();
    }, [])
  );

  // console.log(blogs);
  return (
    <View style={styles.container}>
      <FlatList style={styles.list} data={blogs} renderItem={renderItem} />
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
