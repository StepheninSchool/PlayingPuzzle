import Matter from "matter-js";

const MoveSystem = (entities, { touches }) => {
    let player = entities.player.body;

    if (!player) return entities;

    touches.forEach((t) => {
        if (t.type === "start") {
            // 🟢 Single Tap - Jump
            Matter.Body.setVelocity(player, { x: player.velocity.x, y: -10 });
        }

        if (t.type === "move") {
            // 🔵 Drag Left/Right to change direction
            if (t.delta.pageX > 10) {
                Matter.Body.setVelocity(player, { x: 3, y: player.velocity.y });
            } else if (t.delta.pageX < -10) {
                Matter.Body.setVelocity(player, { x: -3, y: player.velocity.y });
            }
        }
    });

    return entities;
};

export default MoveSystem;
