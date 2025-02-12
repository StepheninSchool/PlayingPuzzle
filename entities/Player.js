import React from "react";
import { View } from "react-native";

const Player = (props) => {
    const { body } = props;
    
    if (!body) return null;

    const width = 40;  // Fixed width
    const height = 40; // Fixed height
    const x = body.position.x - width / 2;
    const y = body.position.y - height / 2;

    return (
        <View
            style={{
                position: "absolute",
                left: x,
                top: y,
                width: width,
                height: height,
                backgroundColor: "blue",
                borderRadius: 5, // Optional: makes the box slightly rounded
            }}
        />
    );
};

export default Player;
