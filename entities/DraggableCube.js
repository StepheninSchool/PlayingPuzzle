import React from "react";
import { View, Platform } from "react-native";

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

    // return the cube with a default color and optional styles for web
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
                borderWidth: 2,
                borderColor: '#006400',
                // Web-specific styles that have fallbacks
                ...(Platform.OS === 'web' ? {
                    cursor: 'grab',
                    boxShadow: isDragging ? '0px 0px 10px rgba(0,0,0,0.5)' : '0px 0px 5px rgba(0,0,0,0.3)',
                    transform: isDragging ? 'scale(1.05)' : 'scale(1)',
                    transition: 'transform 0.1s, box-shadow 0.1s',
                    zIndex: isDragging ? 1000 : 1
                } : {})
            }}
        />
    );
};

export default DraggableCube; 