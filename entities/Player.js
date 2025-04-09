import React from "react";
import { View, Image } from "react-native";
import styles from "../styles/PlayerStyles"; // Adjust the path as needed

const Player = (props) => {
  const width = 40;
  const height = 40;
  const x = props.body.position.x - width / 2;
  const y = props.body.position.y - height / 2;

  return (
    <View style={[styles.player, { left: x, top: y, width, height }]}> 
      <Image 
        source={require("../assets/Player.png")} 
        style={{ width: "100%", height: "100%", resizeMode: "contain" }} 
      />
    </View>
  );
};

export default Player;
