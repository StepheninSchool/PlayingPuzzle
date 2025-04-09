import Matter from "matter-js";

export const createPlayer = (x, y, world) => {
    const player = Matter.Bodies.rectangle(x, y, 40, 40, {
        restitution: 0.4,
        friction: 0.1,
        frictionAir: 0.01,
        label: "Player"
    });

    return player;
};
