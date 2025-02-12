import Matter from "matter-js";

let score = 0; // Initialize score
let isScoring = false; // Flag to check if scoring condition is met
let scoreTimeout; // Timeout for scoring

const MoveSystem = (entities, { touches, dispatch }) => {
    let player = entities.player.body;
    let goalArea = entities.goalArea;

    if (!player) return entities;

    // Handle touch/mouse events
    touches.forEach((t) => {
        if (t.type === "start") {
            // Jump on any touch/click
            Matter.Body.setVelocity(player, { x: player.velocity.x, y: -10 });
        }

        if (t.type === "move") {
            // 🔵 Drag Left/Right to change direction
            if (t.delta.pageX > 10) {
                Matter.Body.setVelocity(player, { x: 3, y: player.velocity.y });
            } else if (t.delta.pageX < -10) {
                Matter.Body.setVelocity(player, { x: -3, y: player.velocity.y });
            }
        }
    });

    // Check if player is in goal area
    const playerX = player.position.x;
    const playerY = player.position.y;
    
    if (playerX >= goalArea.position.x && 
        playerX <= goalArea.position.x + goalArea.size.width &&
        playerY >= goalArea.position.y && 
        playerY <= goalArea.position.y + goalArea.size.height) {
        dispatch({ type: "victory" });
    }

    return entities;
};

export default MoveSystem;
