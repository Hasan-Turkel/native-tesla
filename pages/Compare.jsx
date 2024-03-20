import React from 'react'
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import useTeslaCalls from "../hooks/useTeslaCalls";
import { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";


const Compare = ({route}) => {
    const {order} = route.params
    const { loading, err, data: cars, getCars } = useTeslaCalls();
  renderItem = ({ item }) =>  <View style={styles.orderContainer}> 
  <Text>
    Base Model: {item?.model[0]?.modelname}
  </Text>
  <Text>
    Base Price: {item?.model[0]?.price} $
  </Text>
  <Text>
   Base Range: {item?.model[0]?.range} mi
  </Text>
  <Text>
   Base TopSpeed: {item?.model[0]?.topspeed} mph
  </Text>
    </View>;
  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      getCars();
    }, [])
  );
  return (
    <View style={styles.container}>
        <View>
         <Text >Your {order.model.modelname}</Text>
         <Text >Range: {order.model.range} mi</Text>
         <Text >TopSpeed {order.model.topspeed} mph</Text>
         <Text >Total Amount {order.total} $</Text>
        </View>
        <FlatList style={styles.list} data={cars} renderItem={renderItem} />
    </View>
  )
}

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

export default Compare