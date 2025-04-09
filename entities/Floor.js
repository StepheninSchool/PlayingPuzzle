import React from "react";
import { View, Image } from "react-native";
import styles from "../styles/FloorStyles"; // Adjust the path as needed

const Floor = (props) => {
  const { body } = props;
  const width = body.bounds.max.x - body.bounds.min.x;
  const height = body.bounds.max.y - body.bounds.min.y;
  const x = body.position.x - width / 2;
  const y = body.position.y - height / 2;

  return (
    <View
      style={[
        styles.floor,
        {
          left: x,
          top: y,
          width: width,
          height: height,
        },
      ]}
    >
      <Image
        source={require("../assets/Platform.png")}
        style={{ width: "100%", height: "100%", resizeMode: "repeat" }}
      />
    </View>
  );
};

export default Floor;