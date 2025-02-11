import Matter from 'matter-js';
import Player from './Player';

export const createPlayer = (playerData) => {
  let body = Matter.Bodies.rectangle(playerData.position.x, playerData.position.y, 40, 40, {
    label: 'player',
    friction: 0.05,
    restitution: 0.8
  });

  return {
    body,
    position: playerData.position,
    renderer: <Player />
  };
};
