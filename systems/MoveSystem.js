import Matter from "matter-js";

const PLAYER_SPEED = 3; // Define player speed
const JUMP_FORCE = -12; // Define jump force

const MoveSystem = (entities, { time, dispatch }) => {
    const player = entities.player;
    const goalArea = entities.goalArea;
    const draggableCube = entities.draggableCube;

    if (!player?.body) return entities;

    const LEFT_BOUNDARY = 50;
    const RIGHT_BOUNDARY = entities.windowWidth - 50;
    const DEATH_Y = 1000; // Y position where player dies

    // Update player position
    const currentX = player.body.position.x;

    // Switch direction at boundaries
    if (currentX >= RIGHT_BOUNDARY && player.direction === 1) {
        player.direction = -1;
    } else if (currentX <= LEFT_BOUNDARY && player.direction === -1) {
        player.direction = 1;
    }

    // Check for enemy collision(s)
    if (entities.enemy && Matter.Bounds.overlaps(player.body.bounds, entities.enemy.body.bounds)) {
        player.direction = -player.direction;
        if (player.sounds && player.sounds.collisionSound) {
            player.sounds.collisionSound.playAsync(); // Play collision sound
        }
    }
    if (entities.enemy1 && Matter.Bounds.overlaps(player.body.bounds, entities.enemy1.body.bounds)) {
        player.direction = -player.direction;
        if (player.sounds && player.sounds.collisionSound) {
            player.sounds.collisionSound.playAsync(); // Play collision sound
        }
    }
    if (entities.enemy2 && Matter.Bounds.overlaps(player.body.bounds, entities.enemy2.body.bounds)) {
        player.direction = -player.direction;
        if (player.sounds && player.sounds.collisionSound) {
            player.sounds.collisionSound.playAsync(); // Play collision sound
        }
    }

    // Move player horizontally with the updated direction
    Matter.Body.setVelocity(player.body, {
        x: PLAYER_SPEED * player.direction,
        y: player.body.velocity.y
    });

    // Check for collision with the draggable cube (for jumping)
    const cubeX = draggableCube.position?.x || draggableCube.initialPosition.x;
    const cubeY = draggableCube.position?.y || draggableCube.initialPosition.y;
    const playerX = player.body.position.x;
    const playerY = player.body.position.y;

    // Calculate distance between player and cube
    const distance = Math.sqrt(
        Math.pow(playerX - cubeX, 2) + Math.pow(playerY - cubeY, 2)
    );

    // If player is close to the cube and not already jumping, apply a jump force.
    if (distance < 60 && player.body.velocity.y >= 0) {
        Matter.Body.setVelocity(player.body, {
            x: player.body.velocity.x,
            y: JUMP_FORCE
        });
        if (player.sounds && player.sounds.jumpSound) {
            player.sounds.jumpSound.playAsync(); // Play jump sound
        }
    }

    // Check death condition (player fell too low)
    if (player.body.position.y > DEATH_Y) {
        dispatch({ type: "death" });
    }

    // Check victory condition
    if (Matter.Bounds.overlaps(player.body.bounds, goalArea.body.bounds)) {
        dispatch({ type: "victory" });
    }

    return entities;
};

export default MoveSystem;