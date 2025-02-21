import Matter from "matter-js";
import { createPlayer } from "./createPlayer";
import Player from "./Player";
import Floor from "./Floor";
import GoalArea from "./GoalArea";
import Enemy from "./Enemy";

const createWorld = () => {
    let engine = Matter.Engine.create({ 
        enableSleeping: false,
        gravity: { x: 0, y: 0.5 }
    });
    let world = engine.world;

    // Create borders
    let leftBorder = Matter.Bodies.rectangle(0, 300, 20, 600, {
        isStatic: true,
        label: "Border",
        friction: 0.3,
    });

    let rightBorder = Matter.Bodies.rectangle(400, 300, 20, 600, {
        isStatic: true,
        label: "Border",
        friction: 0.3,
    });

    let floor = Matter.Bodies.rectangle(200, 600, 400, 40, {
        isStatic: true,
        label: "Floor",
        friction: 0.3,
    });

    let player = createPlayer(100, 550, world);

    // Create enemy in the middle of the screen, higher up
    let enemy = Matter.Bodies.rectangle(200, 300, 40, 40, {
        isStatic: true,
        label: "Enemy",
        friction: 0,
        restitution: 0,
    });

    Matter.World.add(world, [floor, player.body, enemy, leftBorder, rightBorder]);

    // Goal area dimensions
    const goalPosition = { x: 300, y: 100 }; // Right upper area
    const goalSize = { width: 60, height: 60 };

    return {
        physics: { engine, world },
        floor: { body: floor, renderer: Floor },
        leftBorder: { body: leftBorder, renderer: Floor },
        rightBorder: { body: rightBorder, renderer: Floor },
        player: { 
            body: player.body, 
            renderer: Player, 
            size: [40, 40],
            direction: 1  // Add initial direction for player
        },
        enemy: { body: enemy, renderer: Enemy, direction: 1 },
        goalArea: { 
            position: goalPosition, 
            size: goalSize,
            renderer: GoalArea 
        }
    };
};

export default createWorld;
