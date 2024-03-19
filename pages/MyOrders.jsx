import { useCallback } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import useTeslaCalls from "../hooks/useTeslaCalls";
import { useFocusEffect } from "@react-navigation/native";
import { useAtomValue } from "jotai";
import { username } from "../store/store";

export const MyOrders = ({ navigation }) => {
  const currentuser = useAtomValue(username)
  const { loading, err, data: myOrders, getMyOrders } = useTeslaCalls();
  renderItem = ({ item }) => <View style={styles.orderContainer}> 
<Text>
  Order Model: {item.model.modelname}
</Text>
<Text>
  Total Amount: {item.total}
</Text>
<Text>
 Order Date: {item.orderDate}
</Text>
  </View>;

  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      getMyOrders();
    }, [])
  );

  // console.log(blogs);
  return (
    <View style={styles.container}>
      <Text>
  Hi  {currentuser}. Here is your orders.
</Text>
      <FlatList style={styles.list} data={myOrders.reverse()} renderItem={renderItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  orderContainer: {
 
    padding: 10,
    borderWidth:1,
    margin:10
  },
  list: {
    flex: 1,
  },
});
