import Matter from "matter-js";
import { createPlayer } from "./createPlayer";
import Player from "../entities/Player";
import Floor from "../entities/Floor";
import GoalArea from "../entities/GoalArea";
import Enemy from "../entities/Enemy";
import { createDraggableCube } from "./createDraggableCube";

// createWorld builds the game world based on the level parameter.
const createWorld = (level = 1,sounds) => {
  // Get window dimensions (use defaults if not available, e.g. in SSR)
  const WINDOW_WIDTH =
    typeof window !== "undefined" ? window.innerWidth : 800;
  const WINDOW_HEIGHT =
    typeof window !== "undefined" ? window.innerHeight : 600;

  // Create the Matter.js physics engine with gravity.
  let engine = Matter.Engine.create({
    enableSleeping: false,
    gravity: { x: 0, y: 0.8 }
  });
  let world = engine.world;

  // ---------------------------
// Collision Event Handler
// ---------------------------
Matter.Events.on(engine, "collisionStart", (event) => {
    event.pairs.forEach((pair) => {
      const { bodyA, bodyB } = pair;
  
      // Enemy collision: When the player collides with an enemy.
      if (
        (bodyA.label === "Player" && bodyB.label === "Enemy") ||
        (bodyB.label === "Player" && bodyA.label === "Enemy")
      ) {
        const playerBody = bodyA.label === "Player" ? bodyA : bodyB;
        const enemyBody = bodyA.label === "Enemy" ? bodyA : bodyB;
        
        // Calculate player's bottom and enemy's top assuming player's height is 40.
        const playerBottom = playerBody.position.y + 20;
        const enemyTop = enemyBody.position.y - 20;
        
        // If player's bottom is within 5 units of enemy's top, assume a top collision.
        if (Math.abs(playerBottom - enemyTop) < 5) {
          // Apply a slight upward bounce.
          Matter.Body.setVelocity(playerBody, {
            x: playerBody.velocity.x, // Keep horizontal velocity unchanged
            y: -4 // Small upward impulse
          });
        } else {
          // Otherwise, it's more of a side collision: reverse horizontal direction.
          const newDirection = playerBody.direction ? -playerBody.direction : -1;
          playerBody.direction = newDirection;
          Matter.Body.setVelocity(playerBody, {
            x: newDirection * 3,
            y: playerBody.velocity.y
          });
          // Play the sound effect for enemy collision.
          // Play collision sound
          if (sounds && sounds.collisionSound) {
            sounds.collisionSound.playAsync();
        }
        }
      }
      // Draggable cube collision: Bounce effect.
      else if (
        (bodyA.label === "Player" && bodyB.label === "DraggableCube") ||
        (bodyB.label === "Player" && bodyA.label === "DraggableCube")
      ) {
        const playerBody = bodyA.label === "Player" ? bodyA : bodyB;
        const bounceFactor = 0.5; // Adjust for a smaller bounce.
        const newVx =
          playerBody.velocity.x !== 0
            ? -playerBody.velocity.x * bounceFactor
            : (playerBody.direction === 1 ? -3 : 3) * bounceFactor;
        Matter.Body.setVelocity(playerBody, {
          x: newVx,
          y: playerBody.velocity.y
        });
      }
    });
  });
  

  // ---------------------------
  // Create Game Boundaries
  // ---------------------------
  // Left and right borders to keep entities within the visible area.
  let leftBorder = Matter.Bodies.rectangle(0, 300, 20, 600, {
    isStatic: true,
    label: "Border"
  });
  let rightBorder = Matter.Bodies.rectangle(WINDOW_WIDTH, 300, 20, 600, {
    isStatic: true,
    label: "Border"
  });

  // ---------------------------
  // Level-Specific Setups
  // ---------------------------
  if (level === 1) {
    // --- Level 1 Setup ---
    // Create two floors (left and right) with a split in the middle.
    let leftFloor = Matter.Bodies.rectangle(
      WINDOW_WIDTH / 4,
      550,
      WINDOW_WIDTH / 2 - 100,
      40,
      {
        isStatic: true,
        label: "Floor",
        friction: 0.1
      }
    );
    let rightFloor = Matter.Bodies.rectangle(
      WINDOW_WIDTH * 3 / 4,
      550,
      WINDOW_WIDTH / 2 - 100,
      40,
      {
        isStatic: true,
        label: "Floor",
        friction: 0.1
      }
    );

    // Create the player and position it on top of the left floor.
    // The floor top edge is roughly 550 - (40/2)=530, so the player's center is ~510.
    let player = createPlayer(100, 510);
    Matter.Body.set(player, {
      friction: 0.1,
      restitution: 0.1,
      frictionAir: 0.01
    });

    // Create a single enemy in the middle.
    let enemy = Matter.Bodies.rectangle(WINDOW_WIDTH / 2, 300, 40, 40, {
      isStatic: true,
      label: "Enemy"
    });

    // Create the goal area as a sensor.
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

    // Add all created bodies to the physics world.
    Matter.World.add(world, [
      leftFloor,
      rightFloor,
      player,
      enemy,
      leftBorder,
      rightBorder,
      goalBody
    ]);

    // Create a draggable cube obstacle.
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
        velocity: 3,
        sounds
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
      draggableCube,
      windowWidth: WINDOW_WIDTH,
      windowHeight: WINDOW_HEIGHT
    };
  } else if (level === 2) {
    // --- Level 2 Setup ---
    // Create a top platform and two floors.
    let platformTop = Matter.Bodies.rectangle(
      WINDOW_WIDTH / 2,
      200,
      WINDOW_WIDTH / 2,
      40,
      {
        isStatic: true,
        label: "Floor",
        friction: 0.1
      }
    );
    let leftFloor = Matter.Bodies.rectangle(
      WINDOW_WIDTH / 5,
      550,
      WINDOW_WIDTH / 3,
      40,
      {
        isStatic: true,
        label: "Floor",
        friction: 0.1
      }
    );
    let rightFloor = Matter.Bodies.rectangle(
      WINDOW_WIDTH * 4 / 5,
      550,
      WINDOW_WIDTH / 3,
      40,
      {
        isStatic: true,
        label: "Floor",
        friction: 0.1
      }
    );

    // Position the player on the top platform.
    let player = createPlayer(WINDOW_WIDTH - 150, 200);
    Matter.Body.set(player, {
      friction: 0.1,
      restitution: 0.1,
      frictionAir: 0.01
    });

    // Create two enemies.
    let enemy1 = Matter.Bodies.rectangle(WINDOW_WIDTH / 3, 300, 40, 40, {
      isStatic: true,
      label: "Enemy"
    });
    let enemy2 = Matter.Bodies.rectangle(WINDOW_WIDTH * 2 / 3, 400, 40, 40, {
      isStatic: true,
      label: "Enemy"
    });

    // Create the goal area.
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

    const draggableCube = createDraggableCube({
      position: { x: WINDOW_WIDTH - 100, y: 450 }
    });

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
        velocity: 3,
        sounds
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
      draggableCube,
      windowWidth: WINDOW_WIDTH,
      windowHeight: WINDOW_HEIGHT
    };
  } else if (level === 3) {
    // --- Level 3 Setup ---
    // Similar to level 2: Create a top platform and two floors.
    let platformTop = Matter.Bodies.rectangle(
      WINDOW_WIDTH / 2,
      200,
      WINDOW_WIDTH / 2,
      40,
      {
        isStatic: true,
        label: "Floor",
        friction: 0.1
      }
    );
    let leftFloor = Matter.Bodies.rectangle(
      WINDOW_WIDTH / 5,
      550,
      WINDOW_WIDTH / 3,
      40,
      {
        isStatic: true,
        label: "Floor",
        friction: 0.1
      }
    );
    let rightFloor = Matter.Bodies.rectangle(
      WINDOW_WIDTH * 4 / 5,
      550,
      WINDOW_WIDTH / 3,
      40,
      {
        isStatic: true,
        label: "Floor",
        friction: 0.1
      }
    );

    // Create the player on the top platform.
    let player = createPlayer(WINDOW_WIDTH - 150, 200);
    Matter.Body.set(player, {
      friction: 0.1,
      restitution: 0.1,
      frictionAir: 0.01
    });

    // Create two enemies.
    let enemy1 = Matter.Bodies.rectangle(WINDOW_WIDTH / 3, 300, 40, 40, {
      isStatic: true,
      label: "Enemy"
    });
    let enemy2 = Matter.Bodies.rectangle(WINDOW_WIDTH * 2 / 3, 400, 40, 40, {
      isStatic: true,
      label: "Enemy"
    });

    // Create the goal area.
    const goalPosition = { x: 40, y: 40 };
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

    const draggableCube = createDraggableCube({
      position: { x: WINDOW_WIDTH - 100, y: 450 }
    });

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
        velocity: 3,
        sounds
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
      draggableCube,
      windowWidth: WINDOW_WIDTH,
      windowHeight: WINDOW_HEIGHT
    };
  } else if (level === 4) {
    // --- Level 4 Setup: A Very Challenging Level ---
    // Create multiple platforms to force precise movement.
    let platformTop = Matter.Bodies.rectangle(
      WINDOW_WIDTH / 2,
      150,
      WINDOW_WIDTH * 0.7,
      40,
      {
        isStatic: true,
        label: "Floor",
        friction: 0.1
      }
    );
    let platformMiddle = Matter.Bodies.rectangle(
      WINDOW_WIDTH / 2,
      350,
      WINDOW_WIDTH * 0.5,
      40,
      {
        isStatic: true,
        label: "Floor",
        friction: 0.0
      }
    );
    let platformBottom = Matter.Bodies.rectangle(
      WINDOW_WIDTH / 2,
      550,
      WINDOW_WIDTH * 0.8,
      40,
      {
        isStatic: true,
        label: "Floor",
        friction: 0.0
      }
    );

    // Create two vertical walls to form a narrow passage.
    let wallLeft = Matter.Bodies.rectangle(
      WINDOW_WIDTH * 0.25,
      350,
      20,
      200,
      {
        isStatic: true,
        label: "Wall"
      }
    );
    let wallRight = Matter.Bodies.rectangle(
      WINDOW_WIDTH * 0.75,
      350,
      20,
      200,
      {
        isStatic: true,
        label: "Wall"
      }
    );

    // Position the player on the bottom platform.
    // Bottom platform center is 550; its top edge is ~530, so the player's center should be ~510.
    let player = createPlayer(200, 510);
    Matter.Body.set(player, {
      friction: 0.1,
      restitution: 0.0,
      frictionAir: 0.01
    });

    // Create three enemies placed in challenging positions.
    let enemy1 = Matter.Bodies.rectangle(WINDOW_WIDTH / 2, 100, 40, 40, {
      isStatic: true,
      label: "Enemy"
    });
    let enemy2 = Matter.Bodies.rectangle(WINDOW_WIDTH * 0.2, 350, 40, 40, {
      isStatic: true,
      label: "Enemy"
    });
    let enemy3 = Matter.Bodies.rectangle(WINDOW_WIDTH * 0.8, 350, 40, 40, {
      isStatic: true,
      label: "Enemy"
    });

    // Create the goal area in the top right corner.
    const goalPosition = { x: WINDOW_WIDTH - 80, y: 80 };
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

    // Create a draggable cube placed in the middle as an additional obstacle.
    const draggableCube = createDraggableCube({
      position: { x: WINDOW_WIDTH / 2, y: 400 }
    });

    // Add all level 4 bodies to the world.
    Matter.World.add(world, [
      platformTop,
      platformMiddle,
      platformBottom,
      wallLeft,
      wallRight,
      player,
      enemy1,
      enemy2,
      enemy3,
      leftBorder,
      rightBorder,
      goalBody,
      draggableCube
    ]);

    return {
      physics: { engine, world },
      platformTop: { body: platformTop, renderer: Floor },
      platformMiddle: { body: platformMiddle, renderer: Floor },
      platformBottom: { body: platformBottom, renderer: Floor },
      leftBorder: { body: leftBorder, renderer: Floor },
      rightBorder: { body: rightBorder, renderer: Floor },
      player: {
        body: player,
        renderer: Player,
        size: [40, 40],
        direction: 1,
        velocity: 3,
        sounds
      },
      enemy1: {
        body: enemy1,
        renderer: Enemy,
        direction: 1
      },
      enemy2: {
        body: enemy2,
        renderer: Enemy,
        direction: 1
      },
      enemy3: {
        body: enemy3,
        renderer: Enemy,
        direction: 1
      },
      goalArea: {
        body: goalBody,
        position: goalPosition,
        size: goalSize,
        renderer: GoalArea
      },
      draggableCube,
      windowWidth: WINDOW_WIDTH,
      windowHeight: WINDOW_HEIGHT
    };
  }
};

export default createWorld;
