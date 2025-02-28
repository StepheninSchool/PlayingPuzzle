import Matter from "matter-js";

const Physics = (entities, { time }) => {
    const { engine } = entities.physics;
    
    // Update physics engine
    Matter.Engine.update(engine, time.delta);
    
    return entities;
};

export default Physics;
