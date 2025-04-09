import React from "react";
import { View, Image } from "react-native";
import styles from "../styles/GoalAreaStyles"; // Adjust the path as needed

const GoalArea = (props) => {
  const { position, size } = props;
  return (
    <View
      style={[
        styles.goalArea,
        { left: position.x, top: position.y, width: size.width, height: size.height }
      ]}
    >
      <Image 
        source={require("../assets/Goal.png")} 
        style={{ width: "100%", height: "100%", resizeMode: "contain" }} 
      />
    </View>
  );
};

export default GoalArea;
