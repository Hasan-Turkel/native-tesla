import React from "react";
import { Button, Image, Text, View } from "react-native";

import styles from "./Card.style";

const Card = ({ car, navigation }) => {


  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: car?.carimg,
        }}
      />
      <Text style={styles.title}>{car?.carname}</Text>
        <Button
          onPress={() => navigation.navigate("Detail", { id: car._id })}
          title="Detail"
        />
    </View>
  );
};

export default Card;
