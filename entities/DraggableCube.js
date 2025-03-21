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
                backgroundColor: 'orange',
                borderWidth: 3,
                borderColor: '#654321',
                borderRadius: 5,
                ...(Platform.OS === 'web' ? {
                    cursor: 'grab',
                    boxShadow: isDragging 
                        ? '0px 0px 15px rgba(255,165,0,0.7)' 
                        : '0px 0px 8px rgba(255,165,0,0.4)',
                    transform: isDragging ? 'scale(1.1)' : 'scale(1)',
                    transition: 'transform 0.1s, box-shadow 0.1s',
                    zIndex: isDragging ? 1000 : 100
                } : {})
            }}
        />
    );
};

export default DraggableCube; 