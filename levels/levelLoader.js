import Matter from 'matter-js';
import { LevelData } from './LevelData';


// loadLevel function to load the level data and create the game entities
export const loadLevel = (levelId) => {
  const level = LevelData.find(l => l.id === levelId);
  if (!level) return {};

  // Create the Matter.js engine and world
  let engine = Matter.Engine.create({ gravity: { x: level.gravity[0], y: level.gravity[1] } });
  let world = engine.world;
  
  // Create the game entities based on the level data
  let entities = {
    physics: { engine, world },
    player: createPlayer(level.entities.find(e => e.type === "player")),
    goal: createGoal(level.entities.find(e => e.type === "goal")),
    platforms: level.entities
      .filter(e => e.type === "platform")
      .map(platform => createPlatform(platform))
  };

  return entities;
};
