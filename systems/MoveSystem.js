import Matter from "matter-js";

let score = 0; // Initialize score
let isScoring = false; // Flag to check if scoring condition is met
let scoreTimeout; // Timeout for scoring
let keyPressed = {};

const MoveSystem = (entities, { touches, events = [], dispatch }) => {
    let player = entities.player.body;
    let enemy = entities.enemy.body;
    let goalArea = entities.goalArea;

    if (!player) return entities;

    // Check collision with enemy
    const playerBounds = player.bounds;
    const enemyBounds = enemy.bounds;

    if (Matter.Bounds.overlaps(playerBounds, enemyBounds)) {
        dispatch({ type: "game-over" });
    }

    // Handle keyboard events
    if (events.length) {
        events.forEach((e) => {
            if (e.type === "keydown") {
                keyPressed[e.key] = true;
                
                // Jump with spacebar
                if (e.key === " " || e.key === "Spacebar") {
                    Matter.Body.setVelocity(player, { x: player.velocity.x, y: -10 });
                }
                
                // Move left with left arrow
                if (e.key === "ArrowLeft") {
                    Matter.Body.setVelocity(player, { x: -3, y: player.velocity.y });
                }
                
                // Move right with right arrow
                if (e.key === "ArrowRight") {
                    Matter.Body.setVelocity(player, { x: 3, y: player.velocity.y });
                }
            }
            if (e.type === "keyup") {
                keyPressed[e.key] = false;
                
                // Stop horizontal movement when arrow keys are released
                if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
                    Matter.Body.setVelocity(player, { x: 0, y: player.velocity.y });
                }
            }
        });
    }

    // Check victory condition
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
