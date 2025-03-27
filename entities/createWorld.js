import Matter from "matter-js";
import { createPlayer } from "./createPlayer";
import Player from "./Player";
import Floor from "./Floor";
import GoalArea from "./GoalArea";
import Enemy from "./Enemy";
import Hole from "./Hole";
import DraggableCube from "./DraggableCube";
import { createDraggableCube } from './createDraggableCube';

const createWorld = (level = 1) => {
    // Check if window is defined (for SSR and React Native)
    const WINDOW_WIDTH = typeof window !== 'undefined' ? window.innerWidth : 800;
    const WINDOW_HEIGHT = typeof window !== 'undefined' ? window.innerHeight : 600;
    

    // No need for header offset since the level indicator is now on the left side

   

    
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

    if (level === 1) {
        // Level 1 setup
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

        // Update position - no need for extra y offset since header is on the left now
        const draggableCube = createDraggableCube({ position: { x: 100, y: 100 } });

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
            draggableCube,
            windowWidth: WINDOW_WIDTH,
            windowHeight: WINDOW_HEIGHT
        };
    } else if (level === 2) {
        // Level 2 setup - similar to level 1 with some variations
        // For now we'll keep it similar, but you can modify it later as needed
        
        // Create a platform layout that's different from level 1
        let platformTop = Matter.Bodies.rectangle(WINDOW_WIDTH / 2, 200, WINDOW_WIDTH / 2, 40, {
            isStatic: true,
            label: "Floor",
            friction: 0.1,
        });
        
        let leftFloor = Matter.Bodies.rectangle(WINDOW_WIDTH / 5, 550, WINDOW_WIDTH / 3, 40, {
            isStatic: true,
            label: "Floor",
            friction: 0.1,
        });

        let rightFloor = Matter.Bodies.rectangle(WINDOW_WIDTH * 4 / 5, 550, WINDOW_WIDTH / 3, 40, {
            isStatic: true,
            label: "Floor",
            friction: 0.1,
        });

        // Create player at a different position
        let player = createPlayer(WINDOW_WIDTH - 150, 200);
        Matter.Body.set(player, {
            friction: 0.1,
            restitution: 0.1,
            frictionAir: 0.01
        });

        // Create two enemies
        let enemy1 = Matter.Bodies.rectangle(WINDOW_WIDTH / 3, 300, 40, 40, {
            isStatic: true,

            label: "Enemy",
        });
        
        let enemy2 = Matter.Bodies.rectangle(WINDOW_WIDTH * 2 / 3, 400, 40, 40, {
            isStatic: true,
            label: "Enemy",
        });

        // Create goal area at a different position
        const goalPosition = { x: 80, y: 500 };
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

        // Add hole in a different position
        const holePosition = { x: WINDOW_WIDTH / 2, y: 440 };
        const holeSize = { width: 60, height: 20 };

        Matter.World.add(world, [
            platformTop,
            leftFloor,
            rightFloor,
            player,
            enemy1,
            enemy2,
            leftBorder,
            rightBorder,
            goalBody
        ]);

        // Create draggable cube at a different position
        const draggableCube = createDraggableCube({ position: { x: WINDOW_WIDTH - 100, y: 450 } });

        return {
            physics: { engine, world },
            platformTop: { body: platformTop, renderer: Floor },
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
            enemy1: { 
                body: enemy1, 
                renderer: Enemy, 
                direction: 1
            },
            enemy2: { 
                body: enemy2, 
                renderer: Enemy, 
                direction: -1
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
            draggableCube,
            windowWidth: WINDOW_WIDTH,
            windowHeight: WINDOW_HEIGHT
        };
    }

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

    // Update position to account for header (y value increased by 100)
    const draggableCube = createDraggableCube({ position: { x: 100, y: 150 } });

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
        draggableCube,
        windowWidth: WINDOW_WIDTH,
        windowHeight: WINDOW_HEIGHT
    };

};

export default createWorld;
