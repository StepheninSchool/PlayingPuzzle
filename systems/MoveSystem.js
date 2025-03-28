import Matter from "matter-js";

let score = 0; // Initialize score
let isScoring = false; // Flag to check if scoring condition is met
let scoreTimeout; // Timeout for scoring
let keyPressed = {};

const PLAYER_SPEED = 3; // Increased speed for visibility
const PLAYER_WIDTH = 40;
const JUMP_FORCE = -12; // Stronger jump force for getting over the cube

const MoveSystem = (entities, { time, dispatch }) => {
    const player = entities.player;
    const goalArea = entities.goalArea;
    const draggableCube = entities.draggableCube;
    
    if (!player?.body) return entities;

    const LEFT_BOUNDARY = 50;
    const RIGHT_BOUNDARY = entities.windowWidth - 50;

    // Update player position
    const currentX = player.body.position.x;

    // Change direction at boundaries
    if (currentX >= RIGHT_BOUNDARY && player.direction === 1) {
        player.direction = -1;
    } else if (currentX <= LEFT_BOUNDARY && player.direction === -1) {
        player.direction = 1;
    }

    // Move player
    Matter.Body.setVelocity(player.body, {
        x: PLAYER_SPEED * player.direction,
        y: player.body.velocity.y
    });

    // Check for collision with draggable cube
    const cubeX = draggableCube.position?.x || draggableCube.initialPosition.x;
    const cubeY = draggableCube.position?.y || draggableCube.initialPosition.y;
    const playerX = player.body.position.x;
    const playerY = player.body.position.y;

    // Calculate distance between player and cube
    const distance = Math.sqrt(
        Math.pow(playerX - cubeX, 2) + 
        Math.pow(playerY - cubeY, 2)
    );

    // If player is close to the cube and not already jumping
    if (distance < 60 && player.body.velocity.y >= 0) {
        Matter.Body.setVelocity(player.body, {
            x: player.body.velocity.x,
            y: JUMP_FORCE
        });
    }

    // Check victory condition
    if (Matter.Bounds.overlaps(player.body.bounds, goalArea.body.bounds)) {
        dispatch({ type: "victory" });
    }

    return entities;
};

export default MoveSystem;
