import React from "react";
import { View } from "react-native";
import styles from "../styles/PlayerStyles"; // Adjust the path as needed

const Player = (props) => {
  const width = 40;
  const height = 40;
  const x = props.body.position.x - width / 2;
  const y = props.body.position.y - height / 2;

  return <View style={[styles.player, { left: x, top: y }]} />;
};

export default Player;
