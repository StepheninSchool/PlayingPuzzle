const HoleSystem = (entities, { touches, events }) => {
    const draggableCube = entities.draggableCube;
    const hole = entities.hole;
    
    // Get the header height to adjust coordinates (accounting for the "Level 1" header)
    // Approximate header height based on the styles (padding + text size)
    const HEADER_OFFSET = 45; // This accounts for the header container's height

    // Handle mouse events
    if (events && events.length > 0) {
        for (let event of events) {
            if (event.type === "mousedown") {
                const mouseX = event.pageX;
                const mouseY = event.pageY;
                const cubeX = draggableCube.position?.x || draggableCube.initialPosition.x;
                const cubeY = (draggableCube.position?.y || draggableCube.initialPosition.y);
                
                // Check if mouse is within the cube bounds (increase detection area slightly)
                if (Math.abs(mouseX - cubeX) < 40 && Math.abs(mouseY - cubeY) < 40) {
                    draggableCube.isDragging = true;
                    // Store the initial click offset to make dragging smoother
                    draggableCube.dragOffset = {
                        x: mouseX - cubeX,
                        y: mouseY - cubeY
                    };
                }
            } else if (event.type === "mousemove" && draggableCube.isDragging) {
                // Apply the drag offset for smoother movement
                draggableCube.position = {
                    x: event.pageX - (draggableCube.dragOffset?.x || 0),
                    y: event.pageY - (draggableCube.dragOffset?.y || 0)
                };
            } else if (event.type === "mouseup") {
                if (draggableCube.isDragging) {
                    checkAndSnapToHole(draggableCube, hole);
                }
                draggableCube.isDragging = false;
                // Clear the drag offset
                draggableCube.dragOffset = null;
            }
        }
    }

    // Handle touch events
    if (touches.length > 0) {
        const touch = touches[0];
        if (touch.type === "start") {
            const touchX = touch.event.pageX;
            const touchY = touch.event.pageY;
            const cubeX = draggableCube.position?.x || draggableCube.initialPosition.x;
            const cubeY = (draggableCube.position?.y || draggableCube.initialPosition.y);

            // Check if touch is within the cube bounds (increase detection area slightly)
            if (Math.abs(touchX - cubeX) < 40 && Math.abs(touchY - cubeY) < 40) {
                draggableCube.isDragging = true;
                // Store the initial touch offset
                draggableCube.dragOffset = {
                    x: touchX - cubeX,
                    y: touchY - cubeY
                };
            }
        } else if (touch.type === "move" && draggableCube.isDragging) {
            // Apply the drag offset for smoother movement
            draggableCube.position = {
                x: touch.event.pageX - (draggableCube.dragOffset?.x || 0),
                y: touch.event.pageY - (draggableCube.dragOffset?.y || 0)
            };
        } else if (touch.type === "end") {
            if (draggableCube.isDragging) {
                checkAndSnapToHole(draggableCube, hole);
            }
            draggableCube.isDragging = false;
            // Clear the drag offset
            draggableCube.dragOffset = null;
        }
    }

    return entities;
};

// Helper function to check if cube should snap to hole
const checkAndSnapToHole = (draggableCube, hole) => {
    const cubeX = draggableCube.position.x;
    const cubeY = draggableCube.position.y;
    const holeX = hole.position.x;
    const holeY = hole.position.y;

    const distance = Math.sqrt(
        Math.pow(cubeX - holeX, 2) + 
        Math.pow(cubeY - holeY, 2)
    );

    if (distance < 50) {
        draggableCube.position = {
            x: holeX,
            y: holeY
        };
        hole.isFilled = true;
    }
};

export default HoleSystem; 