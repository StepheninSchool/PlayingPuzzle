import { StyleSheet, Platform } from "react-native";

// Define base web styles for non-dynamic properties.
// These values serve as defaults for web, and can be overridden dynamically if needed.
const webStyles = Platform.OS === "web" ? {
    cursor: "grab",
    boxShadow: "0px 0px 5px rgba(0,0,0,0.3)",
    transform: "scale(1)",
    transition: "transform 0.1s, box-shadow 0.1s",
    zIndex: 1,
} : {};

export default StyleSheet.create({
    cube: {
        // Static style definitions for the draggable cube.
        position: "absolute",
        width: 40,
        height: 40,
        backgroundColor: "green", // Set the color here
        borderRadius: 5, // Optional: add some rounding
        borderWidth: 2,
        borderColor: "#006400",
        // Merge the default web styles here
        ...webStyles,
    },
});
