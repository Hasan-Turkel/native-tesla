import React from 'react'
import { Text, View } from 'react-native'
import { useSelector } from 'react-redux'



export const Profile = () => {
  const {user} = useSelector((state)=>state.auth)
  return (
    <View style ={{padding:10}}>
  <Text style ={{fontWeight:"bold"}}>Username: {user?.username}</Text>
    <Text style ={{fontWeight:"bold"}}>Email: {user?.email}</Text>
    </View>
  )
}
