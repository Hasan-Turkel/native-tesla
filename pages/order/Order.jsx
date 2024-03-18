import React from 'react'
import { Button, Text, View } from 'react-native'
import styles from "./Order.style";


const Order = ({ route, navigation }) => {

    const {order} = route.params
    const total = Object.values(order).filter((item)=>item.price&&item).reduce((t, {price}) => t + price, 0) + order.extras.reduce((t, {price}) => t + price, 0)
    
    //   console.log(total);
  return (
    <View style ={styles.container}>

        <Text style ={styles.title}>Your {order.model.modelname}</Text>
        <Text>{order.model.modelname} {order.model.property} {order.model.price}$</Text>
        <Text>{order.paint.paintname} {order.paint.price}$</Text>
        <Text>{order.wheel.wheelname} {order.wheel.price}$</Text>
        <Text>{order.interior.interiorname} Interior {order.interior.price}$</Text>
        {order.steering.steeringname&&<Text>{order.steering.steeringname} {order.steering.price}$</Text>}
        {order.extras.map((item, i)=><Text key={i}>{item.choicename} {item.price}$</Text>)}
        <Text>Total Amount {total}$</Text>
        <Button
  onPress={() => navigation.navigate("Order", { order: chosen })}
  title="Order"
  color="#0d6efd"
  
/>
    </View>
  )
}

export default Order