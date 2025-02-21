import Matter from "matter-js";
import { createPlayer } from "./createPlayer";
import Player from "./Player";
import Floor from "./Floor";
import GoalArea from "./GoalArea";
import Enemy from "./Enemy";

const createWorld = () => {
    // Get window width
    const WINDOW_WIDTH = window.innerWidth;
    const WINDOW_HEIGHT = window.innerHeight; // Get window height
    
    let engine = Matter.Engine.create({ 
        enableSleeping: false,
        gravity: { x: 0, y: 0.5 }
    });
    let world = engine.world;

    // Create borders at browser edges
    let leftBorder = Matter.Bodies.rectangle(0, 300, 20, 600, {
        isStatic: true,
        label: "Border",
        friction: 0.3,
    });

    let rightBorder = Matter.Bodies.rectangle(WINDOW_WIDTH, 300, 20, 600, {
        isStatic: true,
        label: "Border",
        friction: 0.3,
    });

    let floor = Matter.Bodies.rectangle(WINDOW_WIDTH / 2, 600, WINDOW_WIDTH, 40, {
        isStatic: true,
        label: "Floor",
        friction: 0.3,
    });

    let player = createPlayer(100, 550, world);

    let enemy = Matter.Bodies.rectangle(WINDOW_WIDTH / 2, 300, 40, 40, {
        isStatic: true,
        label: "Enemy",
        friction: 0,
        restitution: 0,
    });

    Matter.World.add(world, [floor, player.body, enemy, leftBorder, rightBorder]);

    // Set the goal area to be static and positioned at the right corner
    const goalPosition = { x: WINDOW_WIDTH - 130, y: WINDOW_HEIGHT - 200 }; // Position it at the right corner
    const goalSize = { width: 60, height: 60 }; // Keep the size of the goal area

    // Create a static goal area
    const goalBody = Matter.Bodies.rectangle(goalPosition.x, goalPosition.y, goalSize.width, goalSize.height, {
        isStatic: true, // Make it static
        label: "GoalArea",
        friction: 0.3,
    });

    Matter.World.add(world, [goalBody]); // Add the goal area to the world

    return {
        physics: { engine, world },
        floor: { body: floor, renderer: Floor },
        leftBorder: { body: leftBorder, renderer: Floor },
        rightBorder: { body: rightBorder, renderer: Floor },
        player: { 
            body: player.body, 
            renderer: Player, 
            size: [40, 40],
            direction: 1
        },
        enemy: { 
            body: enemy, 
            renderer: Enemy, 
            direction: 1,
            centerX: WINDOW_WIDTH / 2  // Add center position for enemy
        },
        goalArea: { 
            position: goalPosition, 
            size: goalSize,
            renderer: GoalArea 
        },
        windowWidth: WINDOW_WIDTH,  // Add window width to entities
        windowHeight: WINDOW_HEIGHT  // Add window height to entities
    };
};

export default createWorld;
