import DraggableCube from '../entities/DraggableCube';

export const createDraggableCube = (props) => {
    return {
        position: props.position || { x: 100, y: 100 },
        initialPosition: props.position || { x: 100, y: 100 },
        size: { width: 40, height: 40 },
        isDragging: false,
        renderer: DraggableCube  // This is the component that will be rendered
    };
};