import React from "react";
import { View, Platform } from "react-native";
import styles from "../styles/DraggableCubeStyles"; // Adjust the path as needed

const DraggableCube = (props) => {
    // Handle cases where props or body might be undefined
    const width = 40; // Width of the cube
    const height = 40; // Height of the cube

    // Safely handle body position
    const position = props.body?.position || props.position || { x: 100, y: 100 };
    const x = position.x - width / 2; // Center the cube
    const y = position.y - height / 2; // Center the cube

    // Handle cases where props might be undefined
    const isDragging = props.isDragging || false;

    // For web-specific styles that change dynamically when dragging,
    // compute an additional style object and merge it with the static styles.
    const webDynamicStyles = Platform.OS === "web" ? {
        cursor: "grab",
        boxShadow: isDragging ? "0px 0px 10px rgba(0, 0, 0, 0.5)" : "0px 0px 5px rgba(0, 0, 0, 0.3)",
        transform: isDragging ? "scale(1.05)" : "scale(1)",
        transition: "transform 0.1s, box-shadow 0.1s",
        zIndex: isDragging ? 1000 : 1,
    } : {};

    // Return the cube with the combined styles.
    return (
        <View
            style={[
                styles.cube,
                { left: x, top: y }, // dynamic positioning
                webDynamicStyles // dynamic web-specific styles
            ]}
        />
    );
};

export default DraggableCube;
