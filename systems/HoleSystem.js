const HoleSystem = (entities, { touches, events }) => {
    const draggableCube = entities.draggableCube;
    const hole = entities.hole;

    // Handle mouse events
    if (events && events.length > 0) {
        for (let event of events) {
            if (event.type === "mousedown") {
                const mouseX = event.pageX;
                const mouseY = event.pageY;
                const cubeX = draggableCube.position?.x || draggableCube.initialPosition.x;
                const cubeY = draggableCube.position?.y || draggableCube.initialPosition.y;

                if (Math.abs(mouseX - cubeX) < 40 && Math.abs(mouseY - cubeY) < 40) {
                    draggableCube.isDragging = true;
                }
            } else if (event.type === "mousemove" && draggableCube.isDragging) {
                draggableCube.position = {
                    x: event.pageX,
                    y: event.pageY
                };
            } else if (event.type === "mouseup") {
                if (draggableCube.isDragging) {
                    checkAndSnapToHole(draggableCube, hole);
                }
                draggableCube.isDragging = false;
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
            const cubeY = draggableCube.position?.y || draggableCube.initialPosition.y;

            if (Math.abs(touchX - cubeX) < 40 && Math.abs(touchY - cubeY) < 40) {
                draggableCube.isDragging = true;
            }
        } else if (touch.type === "move" && draggableCube.isDragging) {
            draggableCube.position = {
                x: touch.event.pageX,
                y: touch.event.pageY
            };
        } else if (touch.type === "end") {
            if (draggableCube.isDragging) {
                checkAndSnapToHole(draggableCube, hole);
            }
            draggableCube.isDragging = false;
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