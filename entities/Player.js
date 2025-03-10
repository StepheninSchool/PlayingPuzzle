import React from "react";
import { View } from "react-native";

const Player = (props) => {
    const width = 40;
    const height = 40;
    const x = props.body.position.x - width / 2;
    const y = props.body.position.y - height / 2;

    return (
        <View
            style={{
                position: "absolute",
                left: x,
                top: y,
                width: width,
                height: height,
                backgroundColor: "blue",
            }}
        />
    );
};

export default Player;
