import React from 'react'
import { Button, Text, View } from 'react-native'
import styles from "./Order.style";
import {username} from "../../store/store"
import { useAtomValue } from 'jotai';
import useTeslaCalls from '../../hooks/useTeslaCalls';


const Order = ({ route, navigation }) => {

    const {order} = route.params
    const {sendOrder} = useTeslaCalls(navigation)
    const currentuser = useAtomValue(username)
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

{currentuser?    <Button
  onPress={() =>sendOrder({order:{...order, total:total, orderDate: new Date().toISOString().slice(0,10)}})}
  title="Order"
  color="#0d6efd"
  
/>:        <Button
  onPress={() => navigation.navigate("Login")}
  title="Login for Order"
  color="#0d6efd"
  
/>}

<Button
  onPress={() => navigation.navigate("Compare", { order: {...order, total }})}
  title="Compare"
  color="#0d6efd"/>
    

    </View>
  )
}

export default Order