import React from "react";
import { View } from "react-native";

const Player = (props) => {
    const { body } = props;
    const width = body.bounds.max.x - body.bounds.min.x;
    const height = body.bounds.max.y - body.bounds.min.y;
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
                backgroundColor: "blue", // Color for visibility
            }}
        />
    );
};

export default Player;
