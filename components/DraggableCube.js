import React from "react";
import { View } from "react-native";

const DraggableCube = (props) => {
    const width = 40; // Width of the cube
    const height = 40; // Height of the cube
    const x = props.body.position.x - width / 2; // Center the cube
    const y = props.body.position.y - height / 2; // Center the cube

    return (
        <View
            style={{
                position: "absolute",
                left: x,
                top: y,
                width: width,
                height: height,
                backgroundColor: "green", // Set the color here
                borderRadius: 5, // Optional: add some rounding
            }}
        />
    );
};

export default DraggableCube; 