import React from "react";
import { View } from "react-native";

const Hole = (props) => {
    const { position, size } = props;
    
    return (
        <View
            style={{
                position: "absolute",
                left: position.x,
                top: position.y,
                width: size.width,
                height: size.height,
                backgroundColor: "black",
                borderWidth: 2,
                borderColor: "brown",
            }}
        />
    );
};

export default Hole; 