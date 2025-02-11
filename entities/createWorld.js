import Matter from "matter-js";
import { createPlayer } from "./createPlayer";
import Player from "./Player";
import Floor from "./Floor";

const createWorld = () => {
    let engine = Matter.Engine.create({ enableSleeping: false });
    let world = engine.world;

    let floor = Matter.Bodies.rectangle(200, 600, 400, 40, {
        isStatic: true,
        label: "Floor",
        friction: 0.3,
    });

    let player = createPlayer(200, 500, world);

    Matter.World.add(world, [floor, player.body]);

    return {
        physics: { engine, world },
        player: { body: player.body, renderer: Player },
        floor: { body: floor, renderer: Floor },
    };
};

export default createWorld;
