import Matter from "matter-js";

let score = 0; // Initialize score
let isScoring = false; // Flag to check if scoring condition is met
let scoreTimeout; // Timeout for scoring
let keyPressed = {};

const PLAYER_SPEED = 2;
const MOVEMENT_RANGE = 150;
const CENTER_X = 200; // Match enemy's center position
const LEFT_BOUNDARY = CENTER_X - MOVEMENT_RANGE;
const RIGHT_BOUNDARY = CENTER_X + MOVEMENT_RANGE;

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

    // Handle keyboard events for jumping only
    if (events.length) {
        events.forEach((e) => {
            if (e.type === "keydown") {
                if (e.key === " " || e.key === "Spacebar") {
                    Matter.Body.setVelocity(player, { x: player.velocity.x, y: -10 });
                }
            }
        });
    }

    // Automatic horizontal movement
    const currentX = player.position.x;

    // Make sure direction is initialized
    if (!entities.player.direction) {
        entities.player.direction = 1;
    }

    // Change direction at boundaries
    if (currentX >= RIGHT_BOUNDARY && entities.player.direction > 0) {
        entities.player.direction = -1;
    } else if (currentX <= LEFT_BOUNDARY && entities.player.direction < 0) {
        entities.player.direction = 1;
    }

    // Move player
    const newX = currentX + (PLAYER_SPEED * entities.player.direction);
    Matter.Body.setPosition(player, {
        x: newX,
        y: player.position.y
    });

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
