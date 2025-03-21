import Matter from 'matter-js';
import DraggableCube from './DraggableCube';

export const createDraggableCube = (position) => {
    let body = Matter.Bodies.rectangle(position.x, position.y, 40, 40, {
        label: 'draggableCube',
        friction: 0.05,
        restitution: 0.8
    });

    return {
        body,
        position,
        renderer: <DraggableCube /> // Use the new DraggableCube component
    };
};

document.addEventListener('mousedown', handleMouseEvent); 