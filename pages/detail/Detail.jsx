import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import useTeslaCalls from "../../hooks/useTeslaCalls";
import { Button, FlatList, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import styles from "./Detail.style";

const Detail = ({ route, navigation }) => {
  const { user } = useSelector((state) => state.auth);

  const { loading, err, data: car, getDetailCar, chosen, setChosen, getExtras, extras } = useTeslaCalls();

  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      getDetailCar(route.params.id);
      getExtras()
    }, [route.params.id])
  );

  // console.log(chosen);

  return (

    // carheader view
    <View style={styles.container}>
      <ScrollView >
      <Image
        style={styles.image}
        source={{
          uri: car.carimg,
        }}
      />
      <Text style={styles.title}>{car?.carname}</Text>

      <View style={styles.propertyContainer}>
        <Text>{chosen.model?.range} mi</Text>
        <Text>{chosen.model?.topspeed} mph</Text>
        <Text>{chosen.model?.mph} sec</Text>
      </View>

       {/* carmodel view   */}
      {car?.model?.map((item, i) => (
        <View key={i} style={styles.topModelContainer}>
          <Text>{item?.property}</Text>
          <TouchableOpacity onPress={()=>setChosen({...chosen, model:item})}>
          <View style={[styles.modelContainer, item.modelname==chosen.model.modelname&&{borderBlockColor:"blue"}]}>
          <Text >{item?.modelname}</Text>
          <Text>{item?.price} $</Text>
          </View>
      </TouchableOpacity>
          </View>
      ))}

      {/* carpaint view   */}
      <Text style={styles.title}>Paint</Text>
          {car?.paint?.map((item, i) => (
        <View key={i} style={styles.topModelContainer}>
          <TouchableOpacity onPress={()=>setChosen({...chosen, paint:item})}>
          <View style={[styles.modelContainer, item.paintname==chosen.paint.paintname&&{borderBlockColor:"blue"}]}>
          <Text >{item?.paintname}</Text>
          <Text>{item?.price} $</Text>
          </View>
      </TouchableOpacity>
          </View>
      ))}

      {/* carwheels view   */}
      <Text style={styles.title}>Wheels</Text>
          {car?.wheels?.map((item, i) => (
        <View key={i} style={styles.topModelContainer}>
          <TouchableOpacity onPress={()=>setChosen({...chosen, wheel:item})}>
          <View style={[styles.modelContainer, item.wheelname==chosen.wheel.wheelname&&{borderBlockColor:"blue"}]}>
          <Text >{item?.wheelname}</Text>
          <Text>{item?.price} $</Text>
          </View>
      </TouchableOpacity>
          </View>
      ))}

      {/* carwheels view   */}
      <Text style={styles.title}>Interior</Text>
          {car?.interior?.map((item, i) => (
        <View key={i} style={styles.topModelContainer}>
          <TouchableOpacity onPress={()=>setChosen({...chosen, interior:item})}>
          <View style={[styles.modelContainer, item.interiorname==chosen.interior.interiorname&&{borderBlockColor:"blue"}]}>
          <Text >{item?.interiorname}</Text>
          <Text>{item?.price} $</Text>
          </View>
      </TouchableOpacity>
          </View>
      ))}
      {/* steeringwheel view   */}

      {car?.steering?.length ? <Text style={styles.title}>Steering Wheel</Text>: <Text ></Text> }
     
          {car?.steering?.map((item, i) => (
        <View key={i} style={styles.topModelContainer}>
          <TouchableOpacity onPress={()=>setChosen({...chosen, steering:item})}>
          <View style={[styles.modelContainer, item.steeringname==chosen.steering.steeringname&&{borderBlockColor:"blue"}]}>
          <Text >{item?.steeringname}</Text>
          <Text>{item?.price} $</Text>
          </View>
      </TouchableOpacity>
          </View>
      ))}


      {/* extras view   */}
          {extras?.map((item, i) => (
            <View key={i} >
          <Text style={styles.title}>{item?.extraname}</Text>
          
          <View style={[styles.modelContainer]}>

          {item.choice.map((item, i)=> <View key={i}>

          <Text>{item?.choicename}</Text>
          <Text>{item?.price} $</Text>

          {chosen.extras.filter((item1, i)=>item1.choicename==item.choicename).length?
          <TouchableOpacity onPress={()=>setChosen({...chosen, extras:chosen.extras.filter((item2, i)=>item2.choicename!=item.choicename)})}>
          <Text style={styles.addButton}>Remove</Text>
          </TouchableOpacity>
          :<TouchableOpacity onPress={()=>setChosen({...chosen, extras:[...chosen.extras, item]})}><Text style={styles.addButton}>Add</Text>
          </TouchableOpacity>}
          </View>)}
          </View>
 
          </View>
      ))}
               <Button
  onPress={() => navigation.navigate("Order", { order: chosen })}
  title="See Details of Your Car and Order"
  color="#0d6efd"
  
/>

</ScrollView>
    </View>
  );
};

export default Detail;
