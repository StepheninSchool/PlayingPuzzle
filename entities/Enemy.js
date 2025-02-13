import React from "react";
import { View } from "react-native";

const Enemy = (props) => {
    const { body } = props;
    
    if (!body) return null;

    const width = 40;
    const height = 40;
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
                backgroundColor: "red",
                borderRadius: 5,
            }}
        />
    );
};

export default Enemy; 