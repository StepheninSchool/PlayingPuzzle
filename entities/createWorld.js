import Matter from "matter-js";
import { createPlayer } from "./createPlayer";
import Player from "./Player";
import Floor from "./Floor";
import GoalArea from "./GoalArea";
import Enemy from "./Enemy";
import Hole from "./Hole";
import DraggableCube from "./DraggableCube";

const createWorld = () => {
    const WINDOW_WIDTH = window.innerWidth;
    const WINDOW_HEIGHT = window.innerHeight;
    
    let engine = Matter.Engine.create({ 
        enableSleeping: false,
        gravity: { x: 0, y: 0.8 }
    });
    let world = engine.world;

    // Create borders
    let leftBorder = Matter.Bodies.rectangle(0, 300, 20, 600, {
        isStatic: true,
        label: "Border",
    });

    let rightBorder = Matter.Bodies.rectangle(WINDOW_WIDTH, 300, 20, 600, {
        isStatic: true,
        label: "Border",
    });

    // Create split floors with hole in middle
    let leftFloor = Matter.Bodies.rectangle(WINDOW_WIDTH / 4, 550, WINDOW_WIDTH / 2 - 100, 40, {
        isStatic: true,
        label: "Floor",
        friction: 0.1,
    });

    let rightFloor = Matter.Bodies.rectangle(WINDOW_WIDTH * 3 / 4, 550, WINDOW_WIDTH / 2 - 100, 40, {
        isStatic: true,
        label: "Floor",
        friction: 0.1,
    });

    // Create player with adjusted properties
    let player = createPlayer(100, 500);
    Matter.Body.set(player, {
        friction: 0.1,
        restitution: 0.1,
        frictionAir: 0.01
    });

    // Create enemy
    let enemy = Matter.Bodies.rectangle(WINDOW_WIDTH / 2, 300, 40, 40, {
        isStatic: true,
        label: "Enemy",
    });

    // Create goal area with Matter.js body
    const goalPosition = { x: WINDOW_WIDTH - 130, y: 500 };
    const goalSize = { width: 40, height: 40 };
    const goalBody = Matter.Bodies.rectangle(
        goalPosition.x,
        goalPosition.y,
        goalSize.width,
        goalSize.height,
        {
            isStatic: true,
            label: "Goal",
            isSensor: true
        }
    );

    // Add hole in the middle of the floor
    const holePosition = { x: WINDOW_WIDTH / 2, y: 530 };
    const holeSize = { width: 60, height: 20 };

    Matter.World.add(world, [
        leftFloor,
        rightFloor,
        player,
        enemy,
        leftBorder,
        rightBorder,
        goalBody
    ]);

    return {
        physics: { engine, world },
        leftFloor: { body: leftFloor, renderer: Floor },
        rightFloor: { body: rightFloor, renderer: Floor },
        leftBorder: { body: leftBorder, renderer: Floor },
        rightBorder: { body: rightBorder, renderer: Floor },
        player: { 
            body: player, 
            renderer: Player, 
            size: [40, 40],
            direction: 1,
            velocity: 3
        },
        enemy: { 
            body: enemy, 
            renderer: Enemy, 
            direction: 1
        },
        goalArea: { 
            body: goalBody,
            position: goalPosition, 
            size: goalSize,
            renderer: GoalArea 
        },
        hole: {
            position: holePosition,
            size: holeSize,
            renderer: Hole,
            isFilled: false
        },
        draggableCube: {
            position: null,
            initialPosition: { x: 150, y: 450 },
            size: { width: 40, height: 40 },
            renderer: DraggableCube,
            isDragging: false
        },
        windowWidth: WINDOW_WIDTH,
        windowHeight: WINDOW_HEIGHT
    };
};

export default createWorld;
