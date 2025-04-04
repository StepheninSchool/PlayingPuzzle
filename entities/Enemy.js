import React from "react";
import { View } from "react-native";
import styles from "../styles/EnemyStyles";

const Enemy = (props) => {
  const { body } = props;
  if (!body) return null;

  const width = 40;
  const height = 40;
  const x = body.position.x - width / 2;
  const y = body.position.y - height / 2;

  return (
    <View style={[styles.enemy, { left: x, top: y }]} />
  );
};

export default Enemy;
