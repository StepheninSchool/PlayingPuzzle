import React from "react";
import { View, Image } from "react-native";
import styles from "../styles/EnemyStyles"; // Adjust the path as needed

const Enemy = (props) => {
  const { body } = props;
  if (!body) return null;

  const width = 40;
  const height = 40;
  const x = body.position.x - width / 2;
  const y = body.position.y - height / 2;

  return (
    <View style={[styles.enemy, { left: x, top: y, width: width, height: height }]}> 
      <Image 
        source={require("../assets/Blocker.png")} 
        style={{ width: "100%", height: "100%", resizeMode: "contain" }} 
      />
    </View>
  );
};

export default Enemy;
