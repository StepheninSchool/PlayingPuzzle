import Matter from 'matter-js';
import Platform from './Platform';

export const createPlatform = (platformData) => {
  let body = Matter.Bodies.rectangle(
    platformData.position.x,
    platformData.position.y,
    platformData.width,
    platformData.height,
    { isStatic: true, label: 'platform' }
  );

  return {
    body,
    position: platformData.position,
    renderer: <Platform />
  };
};
