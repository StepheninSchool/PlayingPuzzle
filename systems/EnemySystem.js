import Matter from "matter-js";

const ENEMY_SPEED = 2;
const MOVEMENT_RANGE = 150; // How far the enemy moves left/right
const CENTER_X = 200; // Center position

const EnemySystem = (entities) => {
    const enemy = entities.enemy;
    
    if (!enemy || !enemy.body) return entities;

    const currentX = enemy.body.position.x;

    // Change direction when reaching bounds
    if (currentX >= CENTER_X + MOVEMENT_RANGE) {
        enemy.direction = -1;
    } else if (currentX <= CENTER_X - MOVEMENT_RANGE) {
        enemy.direction = 1;
    }

    // Move enemy
    Matter.Body.setPosition(enemy.body, {
        x: currentX + (ENEMY_SPEED * enemy.direction),
        y: enemy.body.position.y
    });

    return entities;
};

export default EnemySystem; 