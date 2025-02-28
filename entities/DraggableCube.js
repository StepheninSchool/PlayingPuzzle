import React from 'react';
import { View } from 'react-native';

const DraggableCube = (props) => {
    const width = props.size.width;
    const height = props.size.height;
    const x = props.position?.x || props.initialPosition.x;
    const y = props.position?.y || props.initialPosition.y;
    const isDragging = props.isDragging;

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
                cursor: 'grab',
                boxShadow: isDragging ? '0px 0px 10px rgba(0,0,0,0.5)' : '0px 0px 5px rgba(0,0,0,0.3)',
                transform: isDragging ? 'scale(1.05)' : 'scale(1)',
                transition: 'transform 0.1s, box-shadow 0.1s',
                zIndex: isDragging ? 1000 : 1
            }}
        />
    );
};

export default DraggableCube; 