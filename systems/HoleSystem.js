const HoleSystem = (entities, { touches, events, dispatch }) => {
    const draggableCube = entities.draggableCube;
    const hole = entities.hole;
    
    // No need for header offset since level is displayed on the left now

    // Handle mouse events
    if (events && events.length > 0) {
        for (let event of events) {
            if (event.type === "mousedown") {
                const mouseX = event.pageX;
                const mouseY = event.pageY;
                const cubeX = draggableCube.position?.x || draggableCube.initialPosition.x;
                const cubeY = (draggableCube.position?.y || draggableCube.initialPosition.y);
                
                // Further increase hit detection area to make it very easy to grab the cube
                const hitBoxWidth = 70;  // Increased hit box width
                const hitBoxHeight = 90; // Increased hit box height
                
                // Debug to help diagnose (remove in production)
                console.log(`Mouse: ${mouseX},${mouseY} - Cube: ${cubeX},${cubeY}`);
                
                // Check if mouse is within the cube's hitbox with improved detection
                if (Math.abs(mouseX - cubeX) < hitBoxWidth/2 && 
                    Math.abs(mouseY - cubeY) < hitBoxHeight/2) {
                    draggableCube.isDragging = true;
                    console.log("Cube grabbed"); // Debug
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
                    const filled = checkAndSnapToHole(draggableCube, hole);
                    
                    // If the hole is filled, dispatch a victory event
                    if (filled && !hole.isFilled) {
                        hole.isFilled = true;
                        // Allow a small delay for the cube to snap into place visually
                        setTimeout(() => {
                            if (dispatch) {
                                dispatch({ type: "victory" });
                            }
                        }, 500);
                    }
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

            // Use same improved hit detection for touch events
            const hitBoxWidth = 70;  // Increased hit box width
            const hitBoxHeight = 90; // Increased hit box height
            
            // Check if touch is within the cube's hitbox
            if (Math.abs(touchX - cubeX) < hitBoxWidth/2 && 
                Math.abs(touchY - cubeY) < hitBoxHeight/2) {
                draggableCube.isDragging = true;
                console.log("Cube touch-grabbed"); // Debug
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
                const filled = checkAndSnapToHole(draggableCube, hole);
                
                // If the hole is filled, dispatch a victory event
                if (filled && !hole.isFilled) {
                    hole.isFilled = true;
                    // Allow a small delay for the cube to snap into place visually
                    setTimeout(() => {
                        if (dispatch) {
                            dispatch({ type: "victory" });
                        }
                    }, 500);
                }
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
        return true;
    }
    
    return false;
};

export default HoleSystem; 