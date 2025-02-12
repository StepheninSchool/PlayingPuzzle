import React from "react";
import { View } from "react-native";

const GoalArea = (props) => {
    const { position, size } = props;
    
    return (
        <View
            style={{
                position: "absolute",
                left: position.x,
                top: position.y,
                width: size.width,
                height: size.height,
                backgroundColor: "yellow",
                opacity: 0.5,
            }}
        />
    );
};

export default GoalArea; 