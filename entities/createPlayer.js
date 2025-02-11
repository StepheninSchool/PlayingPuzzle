import Matter from "matter-js";

export const createPlayer = (x, y, world) => {
    let player = Matter.Bodies.rectangle(x, y, 40, 40, {
        restitution: 0,      // Remove bounciness
        friction: 0.05,      // Add slight friction
        frictionAir: 0.02,   // Slow down motion in air
        density: 0.01,       // Lower density helps stability
        collisionFilter: { group: -1 } // Ensures proper collision
    });

    Matter.World.add(world, player);
    return { body: player };
};
