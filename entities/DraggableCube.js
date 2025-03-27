import React from 'react';
import { View, Platform } from 'react-native';

const DraggableCube = (props) => {
    // Handle cases where props or size might be undefined
    const size = props.size || { width: 40, height: 40 };
    const width = size.width;
    const height = size.height;

    // Handle position safely
    const position = props.position || props.initialPosition || { x: 100, y: 100 };
    const x = position.x;
    const y = position.y;

    const isDragging = props.isDragging || false;

    return (
        <View
            style={{
                position: 'absolute',
                left: x - width / 2,
                top: y - height / 2,
                width: width,
                height: height,
                backgroundColor: 'brown',
                borderWidth: 2,
                borderColor: '#654321',
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